// components/QuickActions.jsx
import { useState } from 'react';

function QuickActions({ technologies, onMarkAllCompleted, onResetAll, onRandomPick }) {
  const [lastRandom, setLastRandom] = useState(null);

  const handleRandom = () => {
    if (!technologies.length) return;
    const available = technologies.filter((t) => t.status !== 'completed');
    const pool = available.length ? available : technologies;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setLastRandom(random);
    onRandomPick(random);
  };

  return (
    <section className="quick-actions">
      <h2>Быстрые действия</h2>
      <div className="quick-actions__buttons">
        <button type="button" onClick={onMarkAllCompleted}>
          Отметить все как выполненные
        </button>
        <button type="button" onClick={onResetAll}>
          Сбросить все статусы
        </button>
        <button type="button" onClick={handleRandom}>
          Случайная следующая технология
        </button>
      </div>

      {lastRandom && (
        <p className="quick-actions__hint">
          Следующей изучите: <strong>{lastRandom.title}</strong>
        </p>
      )}
    </section>
  );
}

export default QuickActions;