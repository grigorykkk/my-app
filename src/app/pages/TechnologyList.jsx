// pages/TechnologyList.jsx
'use client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard';
import StatusFilter from '../components/StatusFilter';
import SearchBox from '../components/SearchBox';
import QuickActions from '../components/QuickActions';

function TechnologyList({
  technologies,
  updateStatus,
  updateNotes,
  onMarkAllCompleted,
  onResetAll,
  onRandomPick,
}) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredByStatus = technologies.filter((t) =>
    filter === 'all' ? true : t.status === filter
  );

  const filtered = filteredByStatus.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn">
          + Добавить технологию
        </Link>
      </div>

      <SearchBox
        value={searchQuery}
        onChange={setSearchQuery}
        resultsCount={filtered.length}
      />

      <StatusFilter activeFilter={filter} onChange={setFilter} />

      <QuickActions
        technologies={technologies}
        onMarkAllCompleted={onMarkAllCompleted}
        onResetAll={onResetAll}
        onRandomPick={onRandomPick}
      />

      <div className="technologies-grid">
        {filtered.map((tech) => (
          <Link
            key={tech.id}
            to={`/technologies/${tech.id}`}
            className="technology-link"
          >
            <TechnologyCard
              technology={tech}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TechnologyList;
