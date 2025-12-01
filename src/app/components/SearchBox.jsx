// components/SearchBox.jsx
function SearchBox({ value, onChange, resultsCount }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Поиск технологий…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span>Найдено: {resultsCount}</span>
    </div>
  );
}

export default SearchBox;