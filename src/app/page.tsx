// App.jsx
'use client';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useTechnologies from './hooks/useTechnologies';

import Navigation from './components/Navigation';
import ProgressHeader from './components/ProgressHeader';
import NotificationCenter from './components/NotificationCenter';
import ThemeProviderWithToggle from './mui/ThemeProviderWithToggle';

import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import StatisticsPage from './pages/StatisticsPage';
import SettingsPage from './pages/SettingsPage';
import TechnologyForm from './forms/TechnologyForm';
import BulkStatusEditor from './components/BulkStatusEditor';

type TechnologyStatus = 'not-started' | 'in-progress' | 'completed';

type Technology = {
  id: number;
  title: string;
  description: string;
  status: TechnologyStatus;
  notes?: string;
  category?: string;
  difficulty?: string;
  deadline?: string;
  resources?: string[];
};

type TechnologyInput = Omit<Technology, 'id' | 'status'> &
  Partial<Pick<Technology, 'id' | 'status' | 'notes' | 'resources'>>;

type UseTechnologiesResult = {
  technologies: Technology[];
  setTechnologies: React.Dispatch<React.SetStateAction<Technology[]>>;
  updateStatus: (techId: number, newStatus: TechnologyStatus) => void;
  updateNotes: (techId: number, newNotes: string) => void;
  addTechnology: (tech: TechnologyInput) => void;
  bulkUpdateStatus: (ids: number[], status: TechnologyStatus) => void;
  progress: number;
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
  };
};

declare global {
  interface Window {
    notify?: {
      success: (message: string) => void;
      info: (message: string) => void;
      warning: (message: string) => void;
      error: (message: string) => void;
    };
  }
}

const isTechnologyArray = (value: unknown): value is Technology[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      item &&
      typeof item === 'object' &&
      'id' in item &&
      'title' in item &&
      'description' in item &&
      'status' in item
  );

function AppContent() {
  const {
    technologies,
    setTechnologies,
    updateStatus,
    updateNotes,
    addTechnology,
    bulkUpdateStatus,
    progress,
    stats,
  } = useTechnologies() as UseTechnologiesResult;

  const markAllCompleted = () => {
    setTechnologies((prev) =>
      prev.map((t) => ({ ...t, status: 'completed' }))
    );
    window.notify?.success('Все технологии отмечены как завершённые');
  };

  const resetAllStatuses = () => {
    setTechnologies((prev) =>
      prev.map((t) => ({ ...t, status: 'not-started' }))
    );
    window.notify?.info('Все статусы сброшены');
  };

  const handleRandomPick = (tech: Technology) => {
    window.notify?.info(`Следующая технология: ${tech.title}`);
  };

  const handleAddTechnology = (data: TechnologyInput) => {
    addTechnology(data);
    window.notify?.success('Технология добавлена');
  };

  const handleResetAllData = () => {
    localStorage.removeItem('technologies');
    setTechnologies([]);
    window.notify?.warning('Данные трекера очищены');
  };

  const handleExportTechnologies = () => {
    try {
      const data = JSON.stringify(technologies, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'technologies.json';
      link.click();
      URL.revokeObjectURL(url);
      window.notify?.success('Данные экспортированы в technologies.json');
    } catch (error) {
      console.error('Ошибка экспорта технологий', error);
      window.notify?.error('Не удалось экспортировать данные');
    }
  };

  const handleImportTechnologies = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        if (typeof reader.result !== 'string') {
          throw new Error('Некорректный формат JSON');
        }
        const parsed = JSON.parse(reader.result);
        if (!isTechnologyArray(parsed)) {
          throw new Error('Ожидается массив технологий');
        }
        setTechnologies(parsed);
        window.notify?.success('Данные импортированы');
      } catch (error) {
        console.error('Ошибка импорта технологий', error);
        window.notify?.error('Некорректный формат JSON');
      }
    };
    reader.onerror = () => {
      console.error('Ошибка чтения файла', reader.error);
      window.notify?.error('Не удалось прочитать файл');
    };
    reader.readAsText(file);
  };

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <ProgressHeader technologies={technologies} />

        <Routes>
          <Route path="/" element={<Home progress={progress} />} />

          <Route
            path="/technologies"
            element={
              <>
                <TechnologyList
                  technologies={technologies}
                  updateStatus={updateStatus}
                  updateNotes={updateNotes}
                  onMarkAllCompleted={markAllCompleted}
                  onResetAll={resetAllStatuses}
                  onRandomPick={handleRandomPick}
                />
                <BulkStatusEditor
                  technologies={technologies}
                  onApply={bulkUpdateStatus}
                />
              </>
            }
          />

          <Route
            path="/technologies/:id"
            element={
              <TechnologyDetail
                technologies={technologies}
                updateStatus={updateStatus}
              />
            }
          />

          <Route
            path="/add-technology"
            element={
              <TechnologyForm
                onSave={handleAddTechnology}
                onCancel={() => window.history.back()}
              />
            }
          />

          <Route
            path="/statistics"
            element={<StatisticsPage stats={stats} progress={progress} />}
          />

          <Route
            path="/settings"
            element={
              <SettingsPage
                onResetAllData={handleResetAllData}
                onExportTechnologies={handleExportTechnologies}
                onImportTechnologies={handleImportTechnologies}
              />
            }
          />

          <Route
            path="*"
            element={
              <div className="page">
                <h1>404 — страница не найдена</h1>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ThemeProviderWithToggle>
      <Router>
        <NotificationCenter />
        <AppContent />
      </Router>
    </ThemeProviderWithToggle>
  );
}

export default App;
