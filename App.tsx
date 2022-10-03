import { StatusBar } from 'expo-status-bar';
import useCachedResources from './hooks/useCachedResources';
import Navigators from './navigations';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import axios from 'axios';
import { setDefaultURL } from './constants/config';

export default function App() {

  const loadingResources = useCachedResources();

  useEffect(()=>{
    setDefaultURL();
  },[])
  
  if (loadingResources) {
    return (
      <SafeAreaProvider>
        <StatusBar translucent={false} backgroundColor="white" />
        <Navigators/>
      </SafeAreaProvider>
    );
  }else{
    return null
  }
}