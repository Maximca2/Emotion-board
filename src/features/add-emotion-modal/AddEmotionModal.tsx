import React, { useState } from 'react';
import type { EmotionType } from '../../store/emotionStore';

const emotions: { type: EmotionType; icon: string; color: string }[] = [
  { type: 'Радість', icon: '😊', color: '#ffe066' },
  { type: 'Смуток', icon: '😢', color: '#a0c4ff' },
  { type: 'Злість', icon: '😠', color: '#ff8787' },
  { type: 'Подив', icon: '😮', color: '#ffd6a5' },
  { type: 'Спокій', icon: '😌', color: '#b7f7b7' },
  { type: 'Страх', icon: '😱', color: '#bdb2ff' },
  { type: 'Відраза', icon: '🤢', color: '#caffbf' },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (type: EmotionType, comment: string) => void;
}

export const AddEmotionModal: React.FC<Props> = ({ open, onClose, onAdd }) => {
  const [selected, setSelected] = useState<EmotionType>('Радість');
  const [comment, setComment] = useState('');

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Додати емоцію</h2>
        <div className="emotion-options">
          {emotions.map(e => (
            <button
              key={e.type}
              className={`emotion-option${selected === e.type ? ' selected' : ''}`}
              style={{ background: e.color }}
              onClick={() => setSelected(e.type)}
              type="button"
            >
              <span style={{ fontSize: '2rem' }}>{e.icon}</span>
              <span>{e.type}</span>
            </button>
          ))}
        </div>
        <textarea
          placeholder="Короткий коментар..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          maxLength={100}
        />
        <div className="modal-actions">
          <button onClick={onClose} type="button">Скасувати</button>
          <button
            onClick={() => {
              onAdd(selected, comment);
              setComment('');
            }}
            type="button"
            disabled={!comment.trim()}
          >Додати</button>
        </div>
      </div>
    </div>
  );
}; 