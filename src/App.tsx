import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { emotionStore } from './store/emotionStore';
import { AddEmotionModal } from './features/add-emotion-modal/AddEmotionModal';
import { EmotionBoard } from './features/emotion-board/EmotionBoard';
import './styles/App.css';

const App = observer(() => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="app-container">
      <header >
        <h1>Дошка емоцій</h1>
        <button className="add-emotion-btn" onClick={() => setModalOpen(true)}>
          Додати емоцію
        </button>
      </header>
      <main>
        <div className="emotion-board">
          {emotionStore.emotions.length === 0 ? (
            <p>Почніть з додавання першої емоції!</p>
          ) : (
            <EmotionBoard />
          )}
        </div>
      </main>
      <AddEmotionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={(type, comment) => {
          emotionStore.addEmotion({ type, comment });
          setModalOpen(false);
        }}
      />
    </div>
  );
});

export default App;
