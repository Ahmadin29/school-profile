import { StatusBar } from 'expo-status-bar';
import useCachedResources from './hooks/useCachedResources';
import Navigators from './navigations';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  const loadingResources = useCachedResources();
  
  return (
    <SafeAreaProvider>
      <StatusBar translucent={false} backgroundColor="white" />
      <Navigators/>
    </SafeAreaProvider>
  );
}