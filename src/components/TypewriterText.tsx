import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

interface Props {
  text: string;
  style?: any;
}

export default function TypewriterText({ text, style }: Props) {
  const width = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    width.value = withTiming(100, {
      duration: 3500,
      easing: Easing.steps(30),
    });
    
    opacity.value = withRepeat(
      withTiming(0, { duration: 750 }),
      -1,
      true
    );
  }, []);

  const textStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  const cursorStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, style, textStyle]} numberOfLines={1}>
        {text}
      </Animated.Text>
      <Animated.View style={[styles.cursor, cursorStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    overflow: 'hidden',
    fontFamily: 'FiraCode_400Regular',
  },
  cursor: {
    width: 3,
    height: '100%',
    backgroundColor: '#3fb950',
    marginLeft: 2,
  },
});