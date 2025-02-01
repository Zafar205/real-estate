import { SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import "./global.css";
import { useEffect } from "react";


// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
    'Rubik-ExtraBold': require('../assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
    'Rubik-Light': require('../assets/fonts/Rubik-Light.ttf'),
    'Rubik-SemiBold': require('../assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
  });
  

  // This useEffect hook runs whenever the fontsLoaded state changes.If the fonts are loaded(fontsLoaded is true), 
  // it hides the splash screen using SplashScreen.hideAsync().

  // splash screen : the first screen when the app gets open
    useEffect(() => {
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded])

  if (!fontsLoaded) {
    return null;
  }
  return <Stack />;
}
