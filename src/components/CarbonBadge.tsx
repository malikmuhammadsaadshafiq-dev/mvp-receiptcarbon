import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  value: number;
  size?: 'small' | 'medium' | 'large';
}

export default function CarbonBadge({ value, size = 'medium' }: Props) {
  let color = '#3fb950';
  if (value > 5) color = '#d29922';
  if (value > 15) color = '#f85149';

  const sizeStyles = {
    small: { padding: 4, fontSize: 10 },
    medium: { padding: 8, fontSize: 12 },
    large: { padding: 12, fontSize: 14 },
  };

  return (
    <View style={[styles.badge, { backgroundColor: `${color}20`, borderColor: color }]}>
      <Text style={[styles.text, { color, fontSize: sizeStyles[size].fontSize }]}>
        {value.toFixed(1)}kg CO₂
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'FiraCode_700Bold',
  },
});