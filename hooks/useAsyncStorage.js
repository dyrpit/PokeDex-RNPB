// import AsyncStorage from '@react-native-community/async-storage';
// import {useState, useEffect} from 'react';

// export const useAsyncStorage = key => {
//   const [storedValue, setValue] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const stringifyValue = await AsyncStorage.getItem(key);
//         const value =
//           stringifyValue != null ? JSON.parse(stringifyValue) : null;
//         setValue(value);
//       } catch (e) {
//         console.error('Load error', e);
//       }
//     })();
//   }, [key]);

//   const setStoredValue = async value => {
//     try {
//       // setValue(value);
//       const stringifyValue = JSON.stringify(value);
//       await AsyncStorage.setItem(key, stringifyValue);
//     } catch (e) {
//       console.error('Store Value Error', e);
//     }
//   };

//   return [storedValue, setStoredValue];
// };
import AsyncStorage from '@react-native-community/async-storage';
import {useState, useEffect} from 'react';

export const useAsyncStorage = key => {
  const [storedValue, setStoredValue] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        const value = jsonValue != null ? JSON.parse(jsonValue) : null;
        setStoredValue(value);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [key]);

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, storeData];
};
