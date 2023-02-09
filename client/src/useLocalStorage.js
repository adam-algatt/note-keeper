import { useState, useEffect } from 'react';

function getNoteFromLocalStorage(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initialValue = JSON.parse(saved);
  return initial || defaultValue;
}


export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getNoteFromLocalStorage(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]);
  return [value, setValue];
};