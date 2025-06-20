import { makeAutoObservable, runInAction } from 'mobx';

export type EmotionType = 'Радість' | 'Смуток' | 'Злість' | 'Подив' | 'Спокій' | 'Страх' | 'Відраза';

export interface EmotionCard {
  id: string;
  type: EmotionType;
  comment: string;
  date: string;
}

const EMOTIONS_KEY = 'emotion_board_cards';

class EmotionStore {
  emotions: EmotionCard[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  addEmotion(card: Omit<EmotionCard, 'id' | 'date'>) {
    const newCard: EmotionCard = {
      ...card,
      id: Math.random().toString(36).slice(2),
      date: new Date().toISOString(),
    };
    this.emotions.unshift(newCard);
    this.saveToStorage();
  }

  removeEmotion(id: string) {
    this.emotions = this.emotions.filter(card => card.id !== id);
    this.saveToStorage();
  }

  reorderEmotions(newOrder: EmotionCard[]) {
    this.emotions = newOrder;
    this.saveToStorage();
  }

  saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(EMOTIONS_KEY, JSON.stringify(this.emotions));
    }
  }

  loadFromStorage() {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(EMOTIONS_KEY);
      if (data) {
        try {
          runInAction(() => {
            this.emotions = JSON.parse(data);
          });
        } catch {}
      }
    }
  }
}

export const emotionStore = new EmotionStore(); 