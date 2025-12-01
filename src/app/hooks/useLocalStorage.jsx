// hooks/useLocalStorage.js
import { useCallback, useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    const fallback =
      typeof initialValue === 'function' ? initialValue() : initialValue;

    if (typeof window === 'undefined') {
      return fallback;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.error(`Ошибка чтения из localStorage ключа "${key}":`, error);
      return fallback;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    const syncStateWithStorage = () => {
      setStoredValue(readValue());
    };
    syncStateWithStorage();

    const handleStorage = (event) => {
      if (event.key !== key) return;
      syncStateWithStorage();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorage);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorage);
      }
    };
  }, [key, readValue]);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
