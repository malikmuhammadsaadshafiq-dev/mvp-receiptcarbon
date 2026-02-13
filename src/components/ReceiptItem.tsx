import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInRight, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { ReceiptItem as ReceiptItemType } from '../types';

interface Props {
  item: ReceiptItemType;
  onPress: () => void;
  onDelete: () => void;
  index: number;
}

const getCategoryIcon = (category: string): keyof typeof Ionicons.glyphMap => {
  switch (category) {
    case 'meat': return 'restaurant';
    case 'dairy': return 'egg';
    case 'produce': return 'leaf';
    case 'grains': return 'nutrition';
    default: return 'cube';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'meat': return '#f87171';
    case 'dairy': return '#fbbf24';
    case 'produce': return '#4ade80';
    case 'grains': return '#a78bfa';
    default: return '#94a3b8';
  }
};

export const ReceiptItemCard: React.FC<Props> = ({ item, onPress, onDelete, index }) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete ${item.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete }
      ]
    );
  };

  return (
    <Animated.View 
      entering={FadeInRight.delay(index * 100).duration(400)}
      layout={Layout.springify()}
      style={styles.container}
    >
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
        <View style={[styles.iconContainer, { backgroundColor: `${getCategoryColor(item.category)}20` }]}>
          <Ionicons name={getCategoryIcon(item.category)} size={20} color={getCategoryColor(item.category)} />
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>{item.quantity} {item.unit} • {new Date(item.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.carbonContainer}>
          <Text style={styles.carbonValue}>{item.totalCarbon.toFixed(1)}</Text>
          <Text style={styles.carbonUnit}>kg CO₂</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color="#f87171" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    marginHorizontal: 16
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    backdropFilter: 'blur(20px)'
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  content: {
    flex: 1
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  meta: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13
  },
  carbonContainer: {
    alignItems: 'flex-end',
    marginRight: 12
  },
  carbonValue: {
    color: '#f472b6',
    fontSize: 18,
    fontWeight: '700'
  },
  carbonUnit: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(248,113,113,0.1)'
  }
});