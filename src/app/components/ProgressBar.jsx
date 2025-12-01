// components/ProgressBar.jsx
function ProgressBar({ progress = 0, label = '' }) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-bar">
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="progress-percent">{clamped}%</span>
    </div>
  );
}

export default ProgressBar;