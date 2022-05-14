import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
};

export default App;
