import { createContext, useContext, useState, useEffect } from 'react';
import { getFromLocalStorage, setToLocalStorage } from '../utils/localStorageUtils';

const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState(getFromLocalStorage('ships') || []);

  useEffect(() => {
    setToLocalStorage('ships', ships);
  }, [ships]);

  const addShip = (ship) => {
    const newShips = [...ships, { ...ship, id: crypto.randomUUID() }];
    setShips(newShips);
  };

  const updateShip = (id, updated) => {
    const newShips = ships.map(s => (s.id === id ? { ...s, ...updated } : s));
    setShips(newShips);
  };

  const deleteShip = (id) => {
    const newShips = ships.filter(s => s.id !== id);
    setShips(newShips);
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

export const useShips = () => useContext(ShipsContext);
