// pages/StatisticsPage.jsx
import ProgressBar from '../components/ProgressBar';

function StatisticsPage({ stats, progress }) {
  const { total, completed, inProgress, notStarted } = stats;

  return (
    <div className="page">
      <h1>Статистика изучения</h1>
      <ProgressBar progress={progress} label="Общий прогресс" />

      <ul className="stats-list">
        <li>Всего технологий: {total}</li>
        <li>Завершено: {completed}</li>
        <li>В процессе: {inProgress}</li>
        <li>Не начато: {notStarted}</li>
      </ul>
    </div>
  );
}

export default StatisticsPage;