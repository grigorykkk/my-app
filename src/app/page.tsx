// App.jsx
'use client';
import React from 'react';
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
  } = useTechnologies();

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

  const handleRandomPick = (tech) => {
    window.notify?.info(`Следующая технология: ${tech.title}`);
  };

  const handleAddTechnology = (data) => {
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

  const handleImportTechnologies = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result ?? '[]');
        if (!Array.isArray(parsed)) {
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
