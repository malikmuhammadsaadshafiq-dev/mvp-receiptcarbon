import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  value: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  delay?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export const CarbonCard: React.FC<Props> = ({ title, value, subtitle, icon, delay = 0, trend }) => {
  return (
    <Animated.View entering={FadeInUp.delay(delay).duration(500)} style={styles.card}>
      <LinearGradient
        colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.03)']}
        style={styles.gradient}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color="#f472b6" />
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.valueRow}>
          <Text style={styles.value}>{value}</Text>
          {trend && (
            <Ionicons 
              name={trend === 'up' ? 'trending-up' : trend === 'down' ? 'trending-down' : 'remove'} 
              size={20} 
              color={trend === 'down' ? '#4ade80' : trend === 'up' ? '#f87171' : '#94a3b8'} 
              style={styles.trendIcon}
            />
          )}
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    flex: 1,
    marginHorizontal: 6
  },
  gradient: {
    padding: 16,
    height: 140,
    justifyContent: 'space-between'
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(244,114,182,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  title: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  value: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    marginRight: 8
  },
  trendIcon: {
    marginTop: 2
  },
  subtitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    marginTop: 4
  }
});