import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MeshBackground } from '../components/MeshBackground';
import { Storage } from '../utils/storage';
import { CARBON_DATABASE } from '../constants/carbonData';
import { ReceiptItem, RootStackParamList } from '../types';
import * as Crypto from 'expo-crypto';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const COMMON_ITEMS = [
  { name: 'Beef Mince', category: 'meat', unit: 'kg' },
  { name: 'Chicken Breast', category: 'meat', unit: 'kg' },
  { name: 'Whole Milk', category: 'dairy', unit: 'L' },
  { name: 'Free Range Eggs', category: 'dairy', unit: 'units' },
  { name: 'White Rice', category: 'grains', unit: 'kg' },
  { name: 'Bananas', category: 'produce', unit: 'kg' },
];

export const ScanScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof COMMON_ITEMS[0] | null>(null);
  const [quantity, setQuantity] = useState('');
  const [saving, setSaving] = useState(false);

  if (!permission) {
    return <ActivityIndicator size="large" color="#f472b6" style={{ flex: 1, backgroundColor: '#0f172a' }} />;
  }

  if (!permission.granted) {
    return (
      <MeshBackground>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={64} color="#f472b6" />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>We need camera access to scan your receipts</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </MeshBackground>
    );
  }

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setShowForm(true);
    }, 2000);
  };

  const handleItemSelect = (item: typeof COMMON_ITEMS[0]) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!selectedItem || !quantity) {
      Alert.alert('Error', 'Please select an item and enter quantity');
      return;
    }

    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity');
      return;
    }

    setSaving(true);
    try {
      const carbonPerUnit = CARBON_DATABASE[selectedItem.name] || 1.0;
      const newItem: ReceiptItem = {
        id: Crypto.randomUUID(),
        name: selectedItem.name,
        category: selectedItem.category as any,
        quantity: qty,
        unit: selectedItem.unit,
        carbonPerUnit,
        totalCarbon: Math.round(carbonPerUnit * qty * 100) / 100,
        date: new Date().toISOString(),
      };

      await Storage.addReceipt(newItem);
      Alert.alert(
        'Success',
        `Added ${selectedItem.name} with ${newItem.totalCarbon}kg CO₂ footprint`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save item');
    } finally {
      setSaving(false);
    }
  };

  if (showForm) {
    return (
      <MeshBackground>
        <View style={styles.formContainer}>
          <Animated.View entering={FadeInUp.duration(400)} style={styles.formCard}>
            <Text style={styles.formTitle}>Add Item</Text>
            
            {!selectedItem ? (
              <View style={styles.itemsGrid}>
                {COMMON_ITEMS.map((item, index) => (
                  <TouchableOpacity 
                    key={item.name}
                    style={styles.itemButton}
                    onPress={() => handleItemSelect(item)}
                  >
                    <Text style={styles.itemButtonText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Animated.View entering={FadeIn}>
                <View style={styles.selectedItemContainer}>
                  <Text style={styles.selectedItemLabel}>Selected:</Text>
                  <Text style={styles.selectedItemName}>{selectedItem.name}</Text>
                </View>
                
                <Text style={styles.inputLabel}>Quantity ({selectedItem.unit})</Text>
                <TextInput
                  style={styles.input}
                  value={quantity}
                  onChangeText={setQuantity}
                  placeholder={`Enter quantity in ${selectedItem.unit}`}
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="decimal-pad"
                  autoFocus
                />

                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    style={[styles.button, styles.secondaryButton]} 
                    onPress={() => setSelectedItem(null)}
                  >
                    <Text style={styles.secondaryButtonText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.button, styles.primaryButton]}
                    onPress={handleSave}
                    disabled={saving}
                  >
                    <LinearGradient
                      colors={['#ec4899', '#8b5cf6']}
                      style={styles.gradientButton}
                    >
                      {saving ? (
                        <ActivityIndicator color="#ffffff" />
                      ) : (
                        <Text style={styles.primaryButtonText}>Save Item</Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}
          </Animated.View>
        </View>
      </MeshBackground>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera}>
        <View style={styles.overlay}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          
          {scanning && (
            <View style={styles.scanningIndicator}>
              <ActivityIndicator color="#f472b6" size="large" />
              <Text style={styles.scanningText}>Analyzing receipt...</Text>
            </View>
          )}
        </View>
      </CameraView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#ffffff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.captureButton} onPress={simulateScan}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.manualButton} onPress={() => setShowForm(true)}>
          <Text style={styles.manualButtonText}>Manual</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 280,
    height: 400,
    borderRadius: 20,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#f472b6',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 20,
  },
  scanningIndicator: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'rgba(15,23,42,0.9)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  scanningText: {
    color: '#ffffff',
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  closeButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
  },
  manualButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  manualButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  permissionTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#f472b6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 100,
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 24,
    backdropFilter: 'blur(20px)',
  },
  formTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  itemButton: {
    backgroundColor: 'rgba(244,114,182,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(244,114,182,0.3)',
    marginBottom: 8,
    marginRight: 8,
  },
  itemButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedItemContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  selectedItemLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    marginBottom: 4,
  },
  selectedItemName: {
    color: '#f472b6',
    fontSize: 18,
    fontWeight: '600',
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    elevation: 4,
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});