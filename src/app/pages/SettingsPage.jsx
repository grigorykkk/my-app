import { useRef } from 'react';

// pages/SettingsPage.jsx
function SettingsPage({
  onResetAllData,
  onExportTechnologies,
  onImportTechnologies,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && onImportTechnologies) {
      onImportTechnologies(file);
    }
    event.target.value = null;
  };

  return (
    <div className="page">
      <h1>Настройки</h1>
      <section className="settings-section">
        <h2>Данные приложения</h2>
        <p>Вы можете очистить все сохранённые данные (localStorage).</p>
        <button type="button" onClick={onResetAllData}>
          Очистить данные трекера
        </button>
      </section>
      <section className="settings-section">
        <h2>Импорт/экспорт</h2>
        <p>
          Сохраните прогресс в JSON-файл или загрузите его обратно, чтобы
          восстановить данные.
        </p>
        <div className="settings-actions">
          <button
            type="button"
            onClick={onExportTechnologies}
            disabled={!onExportTechnologies}
          >
            Экспортировать JSON
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={!onImportTechnologies}
          >
            Импортировать JSON
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </section>
    </div>
  );
}

export default SettingsPage;
