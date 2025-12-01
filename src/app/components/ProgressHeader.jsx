// components/ProgressHeader.jsx
import ProgressBar from './ProgressBar';

function ProgressHeader({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter((t) => t.status === 'completed').length;
  const inProgress = technologies.filter((t) => t.status === 'in-progress').length;
  const notStarted = technologies.filter((t) => t.status === 'not-started').length;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <header className="progress-header">
      <h1>Трекер изучения технологий</h1>

      <div className="stats-row">
        <div>Всего: {total}</div>
        <div>Завершено: {completed}</div>
        <div>В процессе: {inProgress}</div>
        <div>Не начато: {notStarted}</div>
      </div>

      <ProgressBar progress={progress} label="Общий прогресс" />
    </header>
  );
}

export default ProgressHeader;