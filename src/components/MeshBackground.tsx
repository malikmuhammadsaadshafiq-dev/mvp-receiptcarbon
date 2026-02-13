import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export const MeshBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#0f172a', '#0f172a']}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.gradientBlob, { top: -100, left: -100, backgroundColor: '#7c3aed', opacity: 0.4 }]} />
        <View style={[styles.gradientBlob, { top: -50, right: -100, backgroundColor: '#06b6d4', opacity: 0.3 }]} />
        <View style={[styles.gradientBlob, { bottom: -100, right: -50, backgroundColor: '#f472b6', opacity: 0.35 }]} />
        <View style={[styles.gradientBlob, { bottom: -50, left: -100, backgroundColor: '#fbbf24', opacity: 0.25 }]} />
        <LinearGradient
          colors={['transparent', '#0f172a']}
          style={[StyleSheet.absoluteFill, { opacity: 0.8 }]}
        />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a'
  },
  gradientBlob: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    filter: 'blur(80px)'
  }
});