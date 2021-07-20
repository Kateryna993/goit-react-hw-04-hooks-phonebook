import { useState, useEffect } from 'react';

const useLocalStorage = (contact, initialState) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(contact)) ?? initialState;
  });

  useEffect(() => {
    window.localStorage.setItem(contact, JSON.stringify(state));
  }, [contact, state]);

  return [state, setState];
};

export default useLocalStorage;
