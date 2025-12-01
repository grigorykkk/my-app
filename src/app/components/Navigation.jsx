// components/Navigation.jsx
'use client';

import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ColorModeContext } from '../mui/ThemeProviderWithToggle';

function Navigation() {
  const location = useLocation();
  const { mode, toggleMode } = useContext(ColorModeContext);

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/">
          <h2>🚀 Трекер технологий</h2>
        </Link>
      </div>
      <ul className="nav-menu">
        <li>
          <Link to="/" className={isActive('/')}>
            Главная
          </Link>
        </li>
        <li>
          <Link to="/technologies" className={isActive('/technologies')}>
            Все технологии
          </Link>
        </li>
        <li>
          <Link to="/add-technology" className={isActive('/add-technology')}>
            Добавить технологию
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={isActive('/statistics')}>
            Статистика
          </Link>
        </li>
        <li>
          <Link to="/settings" className={isActive('/settings')}>
            Настройки
          </Link>
        </li>
      </ul>
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleMode}
        aria-pressed={mode === 'dark'}
      >
        {mode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
      </button>
    </nav>
  );
}

export default Navigation;
