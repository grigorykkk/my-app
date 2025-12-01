// pages/TechnologyDetail.jsx
import { useParams, Link } from 'react-router-dom';

function TechnologyDetail({ technologies, updateStatus }) {
  const { id } = useParams();
  const techId = Number(id);
  const technology = technologies.find((t) => t.id === techId);

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <p>Технология с ID {id} не существует.</p>
        <Link to="/technologies" className="btn">
          ← Назад к списку
        </Link>
      </div>
    );
  }

  const setStatus = (status) => updateStatus(techId, status);

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/technologies" className="back-link">
          ← Назад к списку
        </Link>
        <h1>{technology.title}</h1>
      </div>

      <div className="technology-detail">
        <section className="detail-section">
          <h3>Описание</h3>
          <p>{technology.description}</p>
        </section>

        <section className="detail-section">
          <h3>Статус изучения</h3>
          <div className="status-buttons">
            <button
              onClick={() => setStatus('not-started')}
              className={technology.status === 'not-started' ? 'active' : ''}
            >
              Не начато
            </button>
            <button
              onClick={() => setStatus('in-progress')}
              className={technology.status === 'in-progress' ? 'active' : ''}
            >
              В процессе
            </button>
            <button
              onClick={() => setStatus('completed')}
              className={technology.status === 'completed' ? 'active' : ''}
            >
              Завершено
            </button>
          </div>
        </section>

        {technology.notes && (
          <section className="detail-section">
            <h3>Мои заметки</h3>
            <p>{technology.notes}</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default TechnologyDetail;