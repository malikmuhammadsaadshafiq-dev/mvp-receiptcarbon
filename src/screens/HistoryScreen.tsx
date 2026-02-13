import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MeshBackground } from '../components/MeshBackground';
import { ReceiptItemCard } from '../components/ReceiptItem';
import { EmptyState } from '../components/EmptyState';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { Storage } from '../utils/storage';
import { ReceiptItem, RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HistoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [receipts, setReceipts] = useState<ReceiptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const data = await Storage.getReceipts();
      setReceipts(data);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleDelete = async (id: string) => {
    try {
      await Storage.deleteReceipt(id);
      const updated = await Storage.getReceipts();
      setReceipts(updated);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All History',
      'Are you sure you want to delete all receipts? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: async () => {
            try {
              await Storage.clearAllReceipts();
              setReceipts([]);
            } catch (error) {
              Alert.alert('Error', 'Failed to clear history');
            }
          }
        }
      ]
    );
  };

  const totalCarbon = receipts.reduce((sum, item) => sum + item.totalCarbon, 0);

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <MeshBackground>
      <View style={styles.container}>
        <Animated.View entering={FadeInUp.duration(500)} style={styles.header}>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{receipts.length}</Text>
              <Text style={styles.statLabel}>Total Items</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{totalCarbon.toFixed(1)}kg</Text>
              <Text style={styles.statLabel}>Total CO₂</Text>
            </View>
          </View>
          {receipts.length > 0 && (
            <Text style={styles.clearText} onPress={handleClearAll}>
              Clear History
            </Text>
          )}
        </Animated.View>

        <ScrollView 
          style={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f472b6" />}
        >
          {receipts.length === 0 ? (
            <EmptyState 
              icon="document-text-outline"
              title="No history yet"
              message="Your scanned receipts will appear here"
              buttonText="Scan First Receipt"
              onButtonPress={() => navigation.navigate('Scan')}
            />
          ) : (
            receipts.map((item, index) => (
              <ReceiptItemCard 
                key={item.id}
                item={item}
                index={index}
                onPress={() => navigation.navigate('ItemDetail', { item })}
                onDelete={() => handleDelete(item.id)}
              />
            ))
          )}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </MeshBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    color: '#f472b6',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  clearText: {
    color: '#f87171',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
  },
  list: {
    flex: 1,
    paddingTop: 8,
  },
  bottomPadding: {
    height: 40,
  },
});