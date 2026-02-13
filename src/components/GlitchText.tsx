import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

interface Props {
  text: string;
  style?: any;
}

export const GlitchText: React.FC<Props> = ({ text, style }) => {
  const offset = useSharedValue(0);
  
  useEffect(() => {
    offset.value = withRepeat(
      withSequence(
        withTiming(2, { duration: 100 }),
        withTiming(-2, { duration: 100 }),
        withTiming(0, { duration: 100 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    textShadowOffset: { width: offset.value, height: 0 },
    textShadowColor: '#ff00ff',
    textShadowRadius: 2,
  }));

  return (
    <Animated.Text style={[styles.text, animatedStyle, style]}>
      {text}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#ecfeff',
    fontFamily: 'JetBrainsMono-Bold',
  }
});