import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorageArray = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  // Cargar los datos almacenados al iniciar el hook
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadStoredData();
  }, [key]);

  // Guardar los datos en AsyncStorage cuando storedValue cambie
  useEffect(() => {
    const saveStoredData = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    };

    saveStoredData();
  }, [storedValue, key]);

  const setValue = (value: (arg0: any) => any) => {
    // Permite pasar una función para soportar lógica basada en el estado previo
    if (typeof value === 'function') {
      setStoredValue((prevState: any) => {
        const newState = value(prevState);
        AsyncStorage.setItem(key, JSON.stringify(newState)).catch(
          console.error,
        );
        return newState;
      });
    } else {
      setStoredValue(value);
      AsyncStorage.setItem(key, JSON.stringify(value)).catch(console.error);
    }
  };

  return [storedValue, setValue];
};

export default useAsyncStorageArray;
