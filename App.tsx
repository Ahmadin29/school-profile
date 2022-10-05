import { StatusBar } from 'expo-status-bar';
import useCachedResources from './hooks/useCachedResources';
import Navigators from './navigations';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import * as Updates from 'expo-updates';
import { setDefaultURL } from './constants/config';

export default function App() {

  const loadingResources = useCachedResources();

  useEffect(()=>{
    setDefaultURL();
    checkUpdates()
  },[])

  const checkUpdates = async () => {
		try {
			const update = await Updates.checkForUpdateAsync();
			if (update.isAvailable) {
				await Updates.fetchUpdateAsync();
				// ... notify user of update ...
				Updates.reloadAsync();
			}
		} catch (e) {
			// handle or log error
		}
	};
  
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