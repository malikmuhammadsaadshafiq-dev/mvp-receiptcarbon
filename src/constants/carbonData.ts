import { Alternative } from '../types';

export const CARBON_DATABASE: Record<string, number> = {
  'Beef Mince': 60,
  'Beef Steak': 60,
  'Lamb Chops': 24,
  'Chicken Breast': 6.9,
  'Chicken Thighs': 6.9,
  'Pork Sausages': 7.6,
  'Bacon': 7.6,
  'Whole Milk': 1.4,
  'Semi-Skimmed Milk': 1.4,
  'Cheddar Cheese': 13.5,
  'Butter': 13.5,
  'Free Range Eggs': 4.5,
  'White Rice': 4.0,
  'Brown Rice': 3.5,
  'Pasta': 3.0,
  'Potatoes': 0.3,
  'Apples': 0.4,
  'Bananas': 0.8,
  'Strawberries': 0.6,
  'Tomatoes': 2.1,
  'Onions': 0.3,
  'Carrots': 0.3,
  'Bread': 1.6,
  'Olive Oil': 6.0,
};

export const ALTERNATIVES: Record<string, Alternative[]> = {
  'Beef Mince': [
    { id: '1', name: 'Plant-Based Mince', category: 'meat', carbonPerUnit: 4.0, savingsPercent: 93, description: 'Soy or pea protein based' },
    { id: '2', name: 'Lentils', category: 'grains', carbonPerUnit: 0.9, savingsPercent: 98, description: 'High protein, locally grown' },
    { id: '3', name: 'Mushroom Mince', category: 'produce', carbonPerUnit: 0.5, savingsPercent: 99, description: 'Umami-rich, low carbon' }
  ],
  'Beef Steak': [
    { id: '4', name: 'Portobello Steak', category: 'produce', carbonPerUnit: 0.5, savingsPercent: 99, description: 'Meaty texture, grills well' },
    { id: '5', name: 'Tempeh', category: 'grains', carbonPerUnit: 2.0, savingsPercent: 97, description: 'Fermented soy, high protein' }
  ],
  'Chicken Breast': [
    { id: '6', name: 'Tofu', category: 'grains', carbonPerUnit: 2.0, savingsPercent: 71, description: 'Versatile protein source' },
    { id: '7', name: 'Chickpeas', category: 'grains', carbonPerUnit: 0.8, savingsPercent: 88, description: 'Great in curries and salads' }
  ],
  'Whole Milk': [
    { id: '8', name: 'Oat Milk', category: 'dairy', carbonPerUnit: 0.4, savingsPercent: 71, description: 'Creamy texture, sustainable' },
    { id: '9', name: 'Soy Milk', category: 'dairy', carbonPerUnit: 0.3, savingsPercent: 78, description: 'High protein alternative' }
  ],
  'Cheddar Cheese': [
    { id: '10', name: 'Nutritional Yeast', category: 'grains', carbonPerUnit: 0.5, savingsPercent: 96, description: 'Cheesy flavor, B12 fortified' },
    { id: '11', name: 'Vegan Cheese', category: 'dairy', carbonPerUnit: 3.0, savingsPercent: 78, description: 'Cashew or coconut based' }
  ],
  'Free Range Eggs': [
    { id: '12', name: 'Tofu Scramble', category: 'grains', carbonPerUnit: 2.0, savingsPercent: 56, description: 'Seasoned tofu alternative' },
    { id: '13', name: 'Chickpea Flour', category: 'grains', carbonPerUnit: 0.8, savingsPercent: 82, description: 'Great for baking and omelets' }
  ],
  'White Rice': [
    { id: '14', name: 'Potatoes', category: 'produce', carbonPerUnit: 0.3, savingsPercent: 92, description: 'Locally grown, versatile' },
    { id: '15', name: 'Quinoa', category: 'grains', carbonPerUnit: 1.5, savingsPercent: 62, description: 'Complete protein source' }
  ],
  'Bananas': [
    { id: '16', name: 'Apples', category: 'produce', carbonPerUnit: 0.4, savingsPercent: 50, description: 'Locally sourced when possible' },
    { id: '17', name: 'Seasonal Berries', category: 'produce', carbonPerUnit: 1.0, savingsPercent: 0, description: 'Support local farmers' }
  ]
};

export const DEMO_ITEMS = [
  {
    id: 'demo-1',
    name: 'Beef Mince',
    category: 'meat' as const,
    quantity: 0.5,
    unit: 'kg',
    carbonPerUnit: 60,
    totalCarbon: 30,
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'demo-2',
    name: 'Whole Milk',
    category: 'dairy' as const,
    quantity: 2,
    unit: 'L',
    carbonPerUnit: 1.4,
    totalCarbon: 2.8,
    date: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 'demo-3',
    name: 'Free Range Eggs',
    category: 'dairy' as const,
    quantity: 12,
    unit: 'units',
    carbonPerUnit: 0.3,
    totalCarbon: 3.6,
    date: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 'demo-4',
    name: 'White Rice',
    category: 'grains' as const,
    quantity: 1,
    unit: 'kg',
    carbonPerUnit: 4.0,
    totalCarbon: 4.0,
    date: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: 'demo-5',
    name: 'Chicken Breast',
    category: 'meat' as const,
    quantity: 0.5,
    unit: 'kg',
    carbonPerUnit: 6.9,
    totalCarbon: 3.45,
    date: new Date(Date.now() - 432000000).toISOString()
  },
  {
    id: 'demo-6',
    name: 'Cheddar Cheese',
    category: 'dairy' as const,
    quantity: 0.25,
    unit: 'kg',
    carbonPerUnit: 13.5,
    totalCarbon: 3.375,
    date: new Date(Date.now() - 518400000).toISOString()
  },
  {
    id: 'demo-7',
    name: 'Bananas',
    category: 'produce' as const,
    quantity: 1,
    unit: 'kg',
    carbonPerUnit: 0.8,
    totalCarbon: 0.8,
    date: new Date(Date.now() - 604800000).toISOString()
  },
  {
    id: 'demo-8',
    name: 'Bread',
    category: 'grains' as const,
    quantity: 0.8,
    unit: 'kg',
    carbonPerUnit: 1.6,
    totalCarbon: 1.28,
    date: new Date(Date.now() - 691200000).toISOString()
  }
];