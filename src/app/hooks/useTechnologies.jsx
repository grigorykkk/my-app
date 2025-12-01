// hooks/useTechnologies.js
import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов',
    status: 'not-started',
    notes: '',
    category: 'frontend',
  },
  {
    id: 2,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    status: 'not-started',
    notes: '',
    category: 'backend',
  },
  // добавь остальные технологии по вкусу
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage(
    'technologies',
    initialTechnologies
  );

  const updateStatus = (techId, newStatus) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const addTechnology = (tech) => {
    setTechnologies((prev) => [
      ...prev,
      { ...tech, id: Date.now(), status: 'not-started', notes: '' },
    ]);
  };

  const bulkUpdateStatus = (ids, status) => {
    setTechnologies((prev) =>
      prev.map((tech) =>
        ids.includes(tech.id) ? { ...tech, status } : tech
      )
    );
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter((t) => t.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  const statsByStatus = () => {
    const total = technologies.length;
    const completed = technologies.filter((t) => t.status === 'completed').length;
    const inProgress = technologies.filter((t) => t.status === 'in-progress').length;
    const notStarted = technologies.filter((t) => t.status === 'not-started').length;

    return { total, completed, inProgress, notStarted };
  };

  return {
    technologies,
    setTechnologies,
    updateStatus,
    updateNotes,
    addTechnology,
    bulkUpdateStatus,
    progress: calculateProgress(),
    stats: statsByStatus(),
  };
}

export default useTechnologies;