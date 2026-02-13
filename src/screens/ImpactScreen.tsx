import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { getReceipts, Receipt } from '../utils/storage';
import { Leaf, TrendingUp, AlertCircle } from 'lucide-react-native';

export default function ImpactScreen() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getReceipts();
      setReceipts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3fb950" />
      </View>
    );
  }

  const totalCarbon = receipts.reduce((sum, r) => sum + r.totalCarbon, 0);
  const weeklyAvg = receipts.length > 0 ? totalCarbon / receipts.length : 0;
  
  const categories: Record<string, number> = {};
  receipts.forEach(r => {
    r.items.forEach(item => {
      const cat = item.name.includes('Beef') || item.name.includes('Chicken') ? 'Meat' :
                  item.name.includes('Milk') || item.name.includes('Cheese') || item.name.includes('Egg') ? 'Dairy' :
                  item.name.includes('Banana') || item.name.includes('Tomato') || item.name.includes('Avocado') ? 'Produce' : 'Other';
      categories[cat] = (categories[cat] || 0) + item.carbonFootprint;
    });
  });

  const getEcoScore = () => {
    if (weeklyAvg < 5) return { score: 'A', color: '#3fb950', label: 'Eco Warrior' };
    if (weeklyAvg < 10) return { score: 'B', color: '#58a6ff', label: 'Climate Conscious' };
    if (weeklyAvg < 20) return { score: 'C', color: '#d29922', label: 'Room for Improvement' };
    return { score: 'D', color: '#f85149', label: 'High Impact' };
  };

  const ecoScore = getEcoScore();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Impact Dashboard</Text>
        <Text style={styles.subtitle}>Your carbon footprint analytics</Text>
      </View>

      <View style={styles.scoreCard}>
        <View style={[styles.scoreBadge, { borderColor: ecoScore.color }]}>
          <Text style={[styles.scoreLetter, { color: ecoScore.color }]}>
            {ecoScore.score}
          </Text>
        </View>
        <View style={styles.scoreInfo}>
          <Text style={styles.scoreLabel}>{ecoScore.label}</Text>
          <Text style={styles.scoreSubtext}>
            {weeklyAvg.toFixed(1)}kg avg per receipt
          </Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <TrendingUp size={24} color="#3fb950" />
          <Text style={styles.statValue}>{totalCarbon.toFixed(1)}kg</Text>
          <Text style={styles.statLabel}>Total CO₂</Text>
        </View>
        <View style={styles.statCard}>
          <Leaf size={24} color="#a371f7" />
          <Text style={styles.statValue}>{receipts.length}</Text>
          <Text style={styles.statLabel}>Receipts</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Category Breakdown</Text>
      {Object.entries(categories).length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No data available yet</Text>
        </View>
      ) : (
        Object.entries(categories).map(([category, value]) => (
          <View key={category} style={styles.categoryRow}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{category}</Text>
              <Text style={styles.categoryValue}>{value.toFixed(1)}kg</Text>
            </View>
            <View style={styles.barBackground}>
              <View 
                style={[
                  styles.barFill, 
                  { 
                    width: `${Math.min((value / totalCarbon) * 100, 100)}%`,
                    backgroundColor: category === 'Meat' ? '#f85149' : 
                                   category === 'Dairy' ? '#d29922' : '#3fb950'
                  }
                ]} 
              />
            </View>
          </View>
        ))
      )}

      <View style={styles.tipsCard}>
        <View style={styles.tipsHeader}>
          <AlertCircle size={20} color="#3fb950" />
          <Text style={styles.tipsTitle}>Eco Tips</Text>
        </View>
        <Text style={styles.tipText}>
          • Switching beef to plant-based alternatives could save 60% CO₂{'\n'}
          • Local seasonal produce reduces transport emissions{'\n'}
          • Reducing dairy by 50% cuts footprint significantly
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    padding: 16,
  },
  centered: {
    flex: 1,
    backgroundColor: '#0d1117',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 24,
    marginTop: 60,
  },
  title: {
    fontFamily: 'FiraCode_700Bold',
    fontSize: 24,
    color: '#c9d1d9',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'FiraCode_400Regular',
    fontSize: 14,
    color: '#8b949e',
  },
  scoreCard: {
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scoreLetter: {
    fontFamily: 'FiraCode_700Bold',
    fontSize: 28,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    fontFamily: 'FiraCode_700Bold',
    fontSize: 18,
    color: '#c9d1d9',
    marginBottom: 4,
  },
  scoreSubtext: {
    fontFamily: 'FiraCode_400Regular',
    fontSize: 14,
    color: '#8b949e',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'FiraCode_700Bold',
    fontSize: 20,
    color: '#c9d1d9',
    marginTop: 8,
  },
  statLabel: {
    fontFamily: 'FiraCode_400Regular',
    fontSize: 12,
    color: '#8b949e',
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: 'FiraCode_700Bold',
    fontSize: 18,
    color: '#c9d1d9',
    marginBottom: 16,
    marginTop: 8,
  },
  categoryRow: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'FiraCode_400Regular',
    color: '#c9d1d9',
    fontSize: 14,
  },
  categoryValue: {
    fontFamily: 'FiraCode_700Bold',
    color: '#8b949e',
    fontSize: 14,
  },
  barBackground: {
    height: 8,
    backgroundColor: '#30363d',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  emptyCard: {
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'FiraCode_400Regular',
    color: '#8b949e',
    fontSize: 14,
  },
  tipsCard: {
    backgroundColor: '#161b22',
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 40,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  tipsTitle: {
    fontFamily: 'FiraCode_700Bold',
    fontSize: 16,
    color: '#3fb950',
  },
  tipText: {
    fontFamily: 'FiraCode_400Regular',
    fontSize: 14,
    color: '#c9d1d9',
    lineHeight: 22,
  },
});