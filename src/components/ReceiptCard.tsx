import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Receipt } from '../types';
import { Trash2, ChevronRight } from 'lucide-react-native';

interface Props {
  receipt: Receipt;
  onDelete: (id: string) => void;
  onPress: (receipt: Receipt) => void;
}

export default function ReceiptCard({ receipt, onDelete, onPress }: Props) {
  const date = new Date(receipt.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(receipt)}>
      <View style={styles.header}>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{receipt.storeName}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => onDelete(receipt.id)}
          style={styles.deleteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Trash2 size={20} color="#f85149" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{receipt.items.length}</Text>
          <Text style={styles.statLabel}>items</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={[styles.statValue, styles.carbonValue]}>
            {receipt.totalCarbon.toFixed(1)}kg
          </Text>
          <Text style={styles.statLabel}>CO₂</Text>
        </View>
        <ChevronRight size={20} color="#8b949e" style={styles.arrow} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontFamily: 'FiraCode_700Bold',
    fontSize: 16,
    color: '#c9d1d9',
    marginBottom: 4,
  },
  date: {
    fontFamily: 'FiraCode_400Regular',
    fontSize: 12,
    color: '#8b949e',
  },
  deleteButton: {
    padding: 4,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d1117',
    borderRadius: 8,
    padding: 12,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'FiraCode_700Bold',
    fontSize: 18,
    color: '#c9d1d9',
  },
  carbonValue: {
    color: '#3fb950',
  },
  statLabel: {
    fontFamily: 'FiraCode_400Regular',
    fontSize: 12,
    color: '#8b949e',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#30363d',
    marginHorizontal: 12,
  },
  arrow: {
    marginLeft: 8,
  },
});