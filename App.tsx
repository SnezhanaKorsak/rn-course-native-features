import { StatusBar } from 'expo-status-bar';

import { Navigation } from './navigation/NativeStack';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <Navigation />
    </>
  );
}