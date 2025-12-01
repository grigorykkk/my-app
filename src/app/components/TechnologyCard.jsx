// components/TechnologyCard.jsx
import TechnologyNotes from './TechnologyNotes';

const STATUS_ORDER = ['not-started', 'in-progress', 'completed'];

function nextStatus(current) {
  const idx = STATUS_ORDER.indexOf(current);
  if (idx === -1) return 'not-started';
  return STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
}

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  const { id, title, description, status, notes, category } = technology;

  const handleClick = () => {
    const newStatus = nextStatus(status);
    onStatusChange(id, newStatus);
  };

  return (
    <article
      className={`technology-card status-${status}`}
      onClick={handleClick}
    >
      <header className="technology-card__header">
        <h3>{title}</h3>
        {category && <span className="technology-card__category">{category}</span>}
      </header>
      <p className="technology-card__description">{description}</p>
      <div className="technology-card__status">
        Статус: <strong>{status}</strong>
      </div>

      <TechnologyNotes
        techId={id}
        notes={notes || ''}
        onNotesChange={onNotesChange}
      />
    </article>
  );
}

export default TechnologyCard;