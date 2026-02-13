import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReceiptItem, WeeklyStats } from '../types';
import { DEMO_ITEMS } from '../constants/carbonData';

const STORAGE_KEYS = {
  RECEIPTS: '@receiptcarbon_receipts',
  STATS: '@receiptcarbon_stats',
  FIRST_LAUNCH: '@receiptcarbon_first_launch'
};

export const Storage = {
  async initializeDemoData(): Promise<void> {
    try {
      const isFirstLaunch = await AsyncStorage.getItem(STORAGE_KEYS.FIRST_LAUNCH);
      if (!isFirstLaunch) {
        await AsyncStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(DEMO_ITEMS));
        await AsyncStorage.setItem(STORAGE_KEYS.FIRST_LAUNCH, 'false');
      }
    } catch (error) {
      console.error('Error initializing demo data:', error);
    }
  },

  async getReceipts(): Promise<ReceiptItem[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.RECEIPTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting receipts:', error);
      return [];
    }
  },

  async addReceipt(item: ReceiptItem): Promise<void> {
    try {
      const receipts = await this.getReceipts();
      receipts.unshift(item);
      await AsyncStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts));
    } catch (error) {
      console.error('Error adding receipt:', error);
      throw error;
    }
  },

  async deleteReceipt(id: string): Promise<void> {
    try {
      const receipts = await this.getReceipts();
      const filtered = receipts.filter(r => r.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting receipt:', error);
      throw error;
    }
  },

  async clearAllReceipts(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.RECEIPTS);
    } catch (error) {
      console.error('Error clearing receipts:', error);
      throw error;
    }
  },

  calculateWeeklyStats(receipts: ReceiptItem[]): WeeklyStats {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentReceipts = receipts.filter(r => new Date(r.date).getTime() > oneWeekAgo);
    
    const totalCarbon = recentReceipts.reduce((sum, item) => sum + item.totalCarbon, 0);
    const itemCount = recentReceipts.length;
    
    const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
    const previousWeekReceipts = receipts.filter(r => {
      const date = new Date(r.date).getTime();
      return date > twoWeeksAgo && date <= oneWeekAgo;
    });
    const previousCarbon = previousWeekReceipts.reduce((sum, item) => sum + item.totalCarbon, 0);
    
    const percentChange = previousCarbon > 0 ? ((totalCarbon - previousCarbon) / previousCarbon) * 100 : 0;
    const trend = percentChange > 5 ? 'up' : percentChange < -5 ? 'down' : 'neutral';
    
    const savingsPotential = totalCarbon * 0.3;

    return {
      totalCarbon: Math.round(totalCarbon * 100) / 100,
      itemCount,
      savingsPotential: Math.round(savingsPotential * 100) / 100,
      trend,
      percentChange: Math.round(percentChange * 10) / 10
    };
  }
};