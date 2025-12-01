// components/StatusFilter.jsx
const FILTERS = [
  { value: 'all', label: 'Все' },
  { value: 'not-started', label: 'Не начато' },
  { value: 'in-progress', label: 'В процессе' },
  { value: 'completed', label: 'Завершено' },
];

function StatusFilter({ activeFilter, onChange }) {
  return (
    <div className="status-filter">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          type="button"
          className={activeFilter === f.value ? 'active' : ''}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default StatusFilter;