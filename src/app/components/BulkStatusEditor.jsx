// components/BulkStatusEditor.jsx
import { useState } from 'react';

function BulkStatusEditor({ technologies, onApply }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [status, setStatus] = useState('in-progress');

  const toggleId = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedIds.length) return;
    onApply(selectedIds, status);
  };

  return (
    <section className="bulk-status-editor">
      <h2>Массовое изменение статусов</h2>
      <form onSubmit={handleSubmit}>
        <div className="bulk-status-editor__list" role="list">
          {technologies.map((t) => (
            <label key={t.id} className="bulk-status-editor__item">
              <input
                type="checkbox"
                checked={selectedIds.includes(t.id)}
                onChange={() => toggleId(t.id)}
              />
              <span>{t.title}</span>
              <span className="current-status">({t.status})</span>
            </label>
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="bulk-status">Новый статус</label>
          <select
            id="bulk-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>

        <button type="submit" disabled={!selectedIds.length}>
          Применить
        </button>
      </form>
    </section>
  );
}

export default BulkStatusEditor;