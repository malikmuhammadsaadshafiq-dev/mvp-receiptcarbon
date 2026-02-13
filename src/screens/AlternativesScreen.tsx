import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MeshBackground } from '../components/MeshBackground';
import { ALTERNATIVES } from '../constants/carbonData';
import { Alternative } from '../types';

export const AlternativesScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { itemId } = route.params as { itemId: string };
  
  const alternatives = ALTERNATIVES[itemId] || [];

  const getSavingsColor = (percent: number) => {
    if (percent >= 80) return '#4ade80';
    if (percent >= 50) return '#fbbf24';
    return '#f472b6';
  };

  return (
    <MeshBackground>
      <View style={styles.container}>
        <Animated.View entering={FadeInUp.duration(500)} style={styles.header}>
          <Text style={styles.title}>Eco-Friendly Swaps</Text>
          <Text style={styles.subtitle}>Reduce your carbon footprint with these alternatives</Text>
        </Animated.View>

        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {alternatives.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="leaf-outline" size={64} color="#f472b6" />
              <Text style={styles.emptyTitle}>No alternatives found</Text>
              <Text style={styles.emptyText}>This item is already eco-friendly!</Text>
            </View>
          ) : (
            alternatives.map((alt: Alternative, index: number) => (
              <Animated.View 
                key={alt.id} 
                entering={FadeInUp.delay(index * 100).duration(500)}
                style={styles.card}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.03)']}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="leaf" size={24} color={getSavingsColor(alt.savingsPercent)} />
                    </View>
                    <View style={styles.savingsBadge}>
                      <Text style={[styles.savingsText, { color: getSavingsColor(alt.savingsPercent) }]}>
                        Save {alt.savingsPercent}%
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.alternativeName}>{alt.name}</Text>
                  <Text style={styles.description}>{alt.description}</Text>

                  <View style={styles.statsRow}>
                    <View style={styles.stat}>
                      <Text style={styles.statLabel}>Carbon</Text>
                      <Text style={styles.statValue}>{alt.carbonPerUnit} kg</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                      <Text style={styles.statLabel}>vs Original</Text>
                      <Text style={[styles.statValue, { color: getSavingsColor(alt.savingsPercent) }]}>
                        -{alt.savingsPercent}%
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Find in Stores</Text>
                    <Ionicons name="arrow-forward" size={16} color="#ffffff" />
                  </TouchableOpacity>
                </LinearGradient>
              </Animated.View>
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
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    lineHeight: 24,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(74,222,128,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  savingsBadge: {
    backgroundColor: 'rgba(74,222,128,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  savingsText: {
    fontSize: 14,
    fontWeight: '600',
  },
  alternativeName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  actionButton: {
    backgroundColor: 'rgba(244,114,182,0.2)',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.3)',
  },
  actionButtonText: {
    color: '#f472b6',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 40,
  },
});