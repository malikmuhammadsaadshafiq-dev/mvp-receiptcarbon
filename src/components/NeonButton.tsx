import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const NeonButton: React.FC<Props> = ({ title, onPress, style, disabled }) => {
  const [pressed, setPressed] = useState(false);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressed ? withSpring(0.95) : withSpring(1) }],
  }));

  return (
    <AnimatedTouchable
      style={[styles.button, animatedStyle, style]}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#22d3ee',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(34, 211, 238, 0.5)',
  },
  text: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'JetBrainsMono-Bold',
  }
});