import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface Props {
  message?: string;
}

export const LoadingOverlay: React.FC<Props> = ({ message = 'Loading...' }) => {
  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#f472b6" />
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  content: {
    alignItems: 'center'
  },
  text: {
    color: '#ffffff',
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500'
  }
});