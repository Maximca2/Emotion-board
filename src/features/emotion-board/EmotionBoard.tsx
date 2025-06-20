import React from 'react';
import { observer } from 'mobx-react-lite';
import { emotionStore } from '../../store/emotionStore';
import { EmotionCard } from '../../components/EmotionCard';
import { useRef, useState } from 'react';

const isMobile = () => window.innerWidth <= 600;

export const EmotionBoard: React.FC = observer(() => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipedId, setSwipedId] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (id: string) => setDraggedId(id);
  const handleDragOver = (id: string) => {
    if (draggedId && draggedId !== id) {
      const fromIdx = emotionStore.emotions.findIndex(e => e.id === draggedId);
      const toIdx = emotionStore.emotions.findIndex(e => e.id === id);
      if (fromIdx !== -1 && toIdx !== -1) {
        const newOrder = [...emotionStore.emotions];
        const [item] = newOrder.splice(fromIdx, 1);
        newOrder.splice(toIdx, 0, item);
        emotionStore.reorderEmotions(newOrder);
      }
    }
  };
  const handleDragEnd = () => setDraggedId(null);

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    setTouchStartX(e.touches[0].clientX);
    setSwipedId(null);
  };
  const handleTouchMove = (e: React.TouchEvent, id: string) => {
    if (touchStartX !== null) {
      const deltaX = e.touches[0].clientX - touchStartX;
      if (deltaX < -60) setSwipedId(id);
      else setSwipedId(null);
    }
  };
  const handleTouchEnd = (id: string) => {
    if (swipedId === id) {
      emotionStore.removeEmotion(id);
    }
    setTouchStartX(null);
    setSwipedId(null);
  };

  if (isMobile()) {
    return (
      <div className="emotion-list" ref={boardRef}>
        {emotionStore.emotions.map(card => (
          <div
            key={card.id}
            className="emotion-list-item"
            draggable
            onDragStart={() => handleDragStart(card.id)}
            onDragOver={e => {
              e.preventDefault();
              handleDragOver(card.id);
            }}
            onDragEnd={handleDragEnd}
            onTouchStart={e => handleTouchStart(e, card.id)}
            onTouchMove={e => handleTouchMove(e, card.id)}
            onTouchEnd={() => handleTouchEnd(card.id)}
            style={{
              opacity: draggedId === card.id ? 0.5 : 1,
              transform: swipedId === card.id ? 'translateX(-80px)' : 'none',
              transition: 'transform 0.2s',
            }}
          >
            <EmotionCard card={card} />
            {swipedId === card.id && (
              <button
                className="delete-btn swipe-delete"
                onClick={() => emotionStore.removeEmotion(card.id)}
              >
                Видалити
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="emotion-grid">
      {emotionStore.emotions.map(card => (
        <EmotionCard
          key={card.id}
          card={card}
          onDelete={id => emotionStore.removeEmotion(id)}
        />
      ))}
    </div>
  );
}); 