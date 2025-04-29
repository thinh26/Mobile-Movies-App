import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { useFonts, getLoadedFonts } from "expo-font";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "DMSansRegular": require("../assets/fonts/DMSans/DMSans-Regular.ttf"),
    "DMSansBold": require("../assets/fonts/DMSans/DMSans-Bold.ttf"),
    "DMSansSemiBold": require("../assets/fonts/DMSans/DMSans-SemiBold.ttf")
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
