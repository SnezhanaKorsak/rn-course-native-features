import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { init } from './utils/database';

import { Navigation } from './navigation/NativeStack';

SplashScreen.preventAutoHideAsync(); // показываем splash до загрузки БД

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await init();
        setDbInitialized(true);
      } catch (err) {
        console.error(err);
      } finally {
        await SplashScreen.hideAsync(); // скрываем splash когда всё готово
      }
    };

    prepare();
  }, []);

  if (!dbInitialized) {
    return null; // ничего не рендерим, пока splash не скроется
  }

  return (
    <>
      <StatusBar style="auto" />

      <Navigation />
    </>
  );
}