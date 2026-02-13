import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MeshBackground } from '../components/MeshBackground';
import { CarbonCard } from '../components/CarbonCard';
import { ReceiptItemCard } from '../components/ReceiptItem';
import { EmptyState } from '../components/EmptyState';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { Storage } from '../utils/storage';
import { ReceiptItem, RootStackParamList, WeeklyStats } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [receipts, setReceipts] = useState<ReceiptItem[]>([]);
  const [stats, setStats] = useState<WeeklyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      await Storage.initializeDemoData();
      const data = await Storage.getReceipts();
      setReceipts(data);
      setStats(Storage.calculateWeeklyStats(data));
    } catch (error) {
      console.error('Error loading data:', error);
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
      setStats(Storage.calculateWeeklyStats(updated));
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const recentReceipts = receipts.slice(0, 4);

  if (loading) {
    return <LoadingOverlay message="Loading your carbon data..." />;
  }

  return (
    <MeshBackground>
      <ScrollView 
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f472b6" />}
      >
        <View style={styles.header}>
          <Animated.Text entering={FadeInUp.duration(600)} style={styles.greeting}>
            Hello, Eco Warrior
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(100).duration(600)} style={styles.title}>
            Your Weekly Impact
          </Animated.Text>
        </View>

        {stats && (
          <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.statsContainer}>
            <CarbonCard 
              title="Carbon Footprint"
              value={`${stats.totalCarbon}kg`}
              subtitle="CO₂ equivalent"
              icon="cloud-outline"
              trend={stats.trend}
              delay={300}
            />
            <CarbonCard 
              title="Items Scanned"
              value={stats.itemCount.toString()}
              subtitle="This week"
              icon="scan-outline"
              delay={400}
            />
          </Animated.View>
        )}

        <Animated.View entering={FadeInUp.delay(500).duration(600)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Scans</Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentReceipts.length === 0 ? (
            <EmptyState 
              icon="receipt-outline"
              title="No receipts yet"
              message="Scan your first receipt to start tracking your carbon footprint"
              buttonText="Scan Receipt"
              onButtonPress={() => navigation.navigate('Scan')}
            />
          ) : (
            <View style={styles.list}>
              {recentReceipts.map((item, index) => (
                <ReceiptItemCard 
                  key={item.id}
                  item={item}
                  index={index}
                  onPress={() => navigation.navigate('ItemDetail', { item })}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </View>
          )}
        </Animated.View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      <Animated.View entering={FadeIn.delay(800)} style={styles.fabContainer}>
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => navigation.navigate('Scan')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#ec4899', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.fabGradient}
          >
            <Ionicons name="camera" size={28} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </MeshBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  section: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  seeAll: {
    color: '#f472b6',
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    paddingTop: 4,
  },
  bottomPadding: {
    height: 100,
  },
  fabContainer: {
    position: 'absolute',
    right: 20,
    bottom: 30,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: '#f472b6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});