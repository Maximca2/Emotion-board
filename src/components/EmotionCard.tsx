'use client';
import React from 'react';
import type { EmotionCard as EmotionCardType } from '../store/emotionStore';

interface Props {
  card: EmotionCardType;
  onDelete?: (id: string) => void;
}

const emotionIcons: Record<string, string> = {
  'Радість': '😊',
  'Смуток': '😢',
  'Злість': '😠',
  'Подив': '😮',
  'Спокій': '😌',
  'Страх': '😱',
  'Відраза': '🤢',
};

const emotionColors: Record<string, string> = {
  'Радість': '#ffe066',
  'Смуток': '#a0c4ff',
  'Злість': '#ff8787',
  'Подив': '#ffd6a5',
  'Спокій': '#b7f7b7',
  'Страх': '#bdb2ff',
  'Відраза': '#caffbf',
};

export const EmotionCard: React.FC<Props> = ({ card, onDelete }) => {
  return (
    <div
      className="emotion-card"
      style={{ background: emotionColors[card.type] || '#f5f5f5' }}
    >
      <div className="emotion-icon">{emotionIcons[card.type] || '🙂'}</div>
      <div className="emotion-info">
        <div className="emotion-type">{card.type}</div>
        <div className="emotion-comment">{card.comment}</div>
      </div>
      {onDelete && (
        <button className="delete-btn" onClick={() => onDelete(card.id)}>
          Видалити
        </button>
      )}
    </div>
  );
}; 