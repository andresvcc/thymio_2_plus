import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FIRST_USE_KEY = 'firstUse';

export const useFirstUseState = () => {
  const [firstUse, setFirstUse] = useState<boolean>(false);

  // Cargar el estado de firstUse al iniciar el hook
  useEffect(() => {
    const loadFirstUseState = async () => {
      try {
        const value = await AsyncStorage.getItem(FIRST_USE_KEY);
        // console.log('useFirstUseState::: -> value:', value);
        setFirstUse(value === 'true' || value === null ? true : false);
      } catch (error) {
        console.error('Error al cargar el estado de firstUse:', error);
      }
    };

    loadFirstUseState();
  }, []);

  // Función para actualizar el estado de firstUse
  const updateFirstUse = async (newValue: boolean) => {
    try {
      await AsyncStorage.setItem(FIRST_USE_KEY, newValue.toString());
      setFirstUse(newValue);
    } catch (error) {
      console.error('Error al actualizar el estado de firstUse:', error);
    }
  };

  return [firstUse, updateFirstUse] as const;
};
