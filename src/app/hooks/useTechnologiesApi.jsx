// hooks/useTechnologiesApi.js
import { useState, useEffect, useCallback } from 'react';

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTechnologies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // имитация API (mock). Здесь можешь дернуть реальный API.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockTechnologies = [
        {
          id: 1,
          title: 'React',
          description: 'Библиотека для UI',
          category: 'frontend',
          difficulty: 'beginner',
          resources: ['https://react.dev'],
        },
        {
          id: 2,
          title: 'Node.js',
          description: 'JS на сервере',
          category: 'backend',
          difficulty: 'intermediate',
          resources: ['https://nodejs.org'],
        },
      ];

      setTechnologies(mockTechnologies);
    } catch (err) {
      setError(err.message || 'Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  return { technologies, loading, error, refetch: fetchTechnologies };
}

export default useTechnologiesApi;