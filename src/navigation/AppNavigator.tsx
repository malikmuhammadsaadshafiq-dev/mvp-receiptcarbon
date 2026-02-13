import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { HomeScreen } from '../screens/HomeScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { AlternativesScreen } from '../screens/AlternativesScreen';
import { ItemDetailScreen } from '../screens/ItemDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: '#0f172a',
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Scan" 
          component={ScanScreen}
          options={{ 
            title: 'Scan Receipt',
            headerTransparent: true,
            headerBlurEffect: 'dark'
          }}
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen}
          options={{ title: 'Receipt History' }}
        />
        <Stack.Screen 
          name="Alternatives" 
          component={AlternativesScreen}
          options={{ title: 'Eco Alternatives' }}
        />
        <Stack.Screen 
          name="ItemDetail" 
          component={ItemDetailScreen}
          options={{ title: 'Item Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};