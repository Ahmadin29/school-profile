import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'Poppins-Thin': require('../assets/fonts/Poppins/Poppins-Thin.ttf'),
          'Poppins-Light': require('../assets/fonts/Poppins/Poppins-Light.ttf'),
          'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
          'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
          'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
          'Poppins-Black': require('../assets/fonts/Poppins/Poppins-Black.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
