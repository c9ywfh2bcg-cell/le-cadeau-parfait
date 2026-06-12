/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FashionItem {
  id: string;
  name: string;
  category: 'bag' | 'clothing_glasses' | 'jewelry_perfume';
  price: number;
  description: string;
  rating: 'terrible' | 'average' | 'dream';
  relationshipEffect: number;
  tags: string[];
  color: string;
  iconName: string;
  originalReaction: string;
  successReaction: string;
}

export interface Clue {
  id: string;
  title: string;
  content: string;
  unlocked: boolean;
  cost?: number;
}

export interface GameState {
  screen: 'start' | 'intro' | 'clues' | 'map' | 'shop' | 'wrap' | 'unboxing' | 'ending';
  activeShopId: 'maroquinerie' | 'miroir' | 'ecrin' | null;
  budget: number;
  lovePoints: number; // 0 to 100
  selectedItems: FashionItem[];
  wrapChoice: 'cheap' | 'glam' | 'royal' | null;
  cardMessage: string;
  phoneOpen: boolean;
  readClues: string[];
  askedLea: boolean;
  hasSeenIntro: boolean;
}
