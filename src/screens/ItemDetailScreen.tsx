import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MeshBackground } from '../components/MeshBackground';
import { ALTERNATIVES } from '../constants/carbonData';

export const ItemDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params as { item: any };

  const hasAlternatives = ALTERNATIVES[item.name] && ALTERNATIVES[item.name].length > 0;

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

  return (
    <MeshBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(500)} style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${getCategoryColor(item.category)}20` }]}>
            <Ionicons name={getCategoryIcon(item.category)} size={32} color={getCategoryColor(item.category)} />
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.impactCard}>
          <LinearGradient
            colors={['rgba(244,114,182,0.2)', 'rgba(139,92,246,0.1)']}
            style={styles.impactGradient}
          >
            <Text style={styles.impactLabel}>Carbon Impact</Text>
            <View style={styles.impactRow}>
              <Text style={styles.impactValue}>{item.totalCarbon}</Text>
              <Text style={styles.impactUnit}>kg CO₂e</Text>
            </View>
            <Text style={styles.impactSubtext}>
              {item.quantity} {item.unit} × {item.carbonPerUnit} kg CO₂e per {item.unit}
            </Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantity</Text>
            <Text style={styles.detailValue}>{item.quantity} {item.unit}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Carbon per unit</Text>
            <Text style={styles.detailValue}>{item.carbonPerUnit} kg</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date added</Text>
            <Text style={styles.detailValue}>{new Date(item.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Item ID</Text>
            <Text style={[styles.detailValue, { fontSize: 12 }]}>{item.id}</Text>
          </View>
        </Animated.View>

        {hasAlternatives && (
          <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.actionCard}>
            <Text style={styles.actionTitle}>Want to reduce this impact?</Text>
            <Text style={styles.actionText}>
              We found eco-friendly alternatives that could significantly lower your carbon footprint.
            </Text>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Alternatives', { itemId: item.name })}
            >
              <LinearGradient
                colors={['#ec4899', '#8b5cf6']}
                style={styles.gradientButton}
              >
                <Text style={styles.actionButtonText}>View Alternatives</Text>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </MeshBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  category: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  impactCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.3)',
  },
  impactGradient: {
    padding: 24,
    alignItems: 'center',
  },
  impactLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  impactValue: {
    color: '#f472b6',
    fontSize: 48,
    fontWeight: '700',
  },
  impactUnit: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 18,
    marginLeft: 8,
  },
  impactSubtext: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  detailsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 20,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 15,
  },
  detailValue: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
  actionCard: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 24,
  },
  actionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  actionText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  bottomPadding: {
    height: 40,
  },
});