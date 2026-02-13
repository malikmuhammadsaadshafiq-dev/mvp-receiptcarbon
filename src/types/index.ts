export interface ReceiptItem {
  id: string;
  name: string;
  category: 'meat' | 'dairy' | 'produce' | 'grains' | 'other';
  quantity: number;
  unit: string;
  carbonPerUnit: number;
  totalCarbon: number;
  date: string;
  imageUrl?: string;
}

export interface Alternative {
  id: string;
  name: string;
  category: string;
  carbonPerUnit: number;
  savingsPercent: number;
  description: string;
}

export interface WeeklyStats {
  totalCarbon: number;
  itemCount: number;
  savingsPotential: number;
  trend: 'up' | 'down' | 'neutral';
  percentChange: number;
}

export type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  History: undefined;
  Alternatives: { itemId: string };
  ItemDetail: { item: ReceiptItem };
};