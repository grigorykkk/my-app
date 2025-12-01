// components/TechnologyNotes.jsx
function TechnologyNotes({ techId, notes, onNotesChange }) {
  const length = notes?.length || 0;

  return (
    <div className="notes-section" onClick={(e) => e.stopPropagation()}>
      <h4>Мои заметки:</h4>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(techId, e.target.value)}
        placeholder="Записывайте сюда важные моменты."
        rows={3}
      />
      <div className="notes-hint">
        {length > 0 ? `Заметка сохранена (${length} символов)` : 'Добавьте заметку'}
      </div>
    </div>
  );
}

export default TechnologyNotes;