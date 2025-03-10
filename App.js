import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View, StatusBar as RNStatusBar, Alert, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Login from './app/(auth)/login';
import Signup from './app/(auth)/signup';
import TabsLayout from './app/(content)/(tabs)/_layout';

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

// Add this outside your component to verify the file is executing
console.warn("App.js is running"); // This shows as yellow and is more visible

export default function App() {
  // Try using Alert instead of console.log for visual feedback
  Alert.alert("Debug", "App started");
  
  const [poppinsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  
  // Use Alert for visual confirmation of font loading
  useEffect(() => {
    if (poppinsLoaded) {
      Alert.alert("Fonts", "Poppins fonts loaded successfully");
    }
  }, [poppinsLoaded]);

  const [isReady, setIsReady] = useState(false);
  const [fontDebugInfo, setFontDebugInfo] = useState("Checking fonts...");

  useEffect(() => {
    async function prepare() {
      try {
        // Add your own font loading check
        const loadedFonts = await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_600SemiBold, 
          Poppins_700Bold
        });
        
        setFontDebugInfo("Fonts loaded: " + Object.keys(loadedFonts).join(", "));
      } catch (error) {
        setFontDebugInfo("Error loading fonts: " + error.message);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady && poppinsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isReady, poppinsLoaded]);

  // Add a debug screen instead of just a loading indicator
  if (!isReady || !poppinsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <ActivityIndicator size="large" color="#055B72" />
        <Text style={{ marginTop: 20, textAlign: 'center' }}>
          Loading status: isReady={isReady ? "true" : "false"}, poppinsLoaded={poppinsLoaded ? "true" : "false"}
        </Text>
        <Text style={{ marginTop: 10, textAlign: 'center' }}>
          {fontDebugInfo}
        </Text>
      </View>
    );
  }

  // Create a simple component to test font rendering
  const FontTestScreen = () => (
    <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 16, marginBottom: 10 }}>
        This should be Poppins Regular
      </Text>
      <Text style={{ fontFamily: 'Poppins_700Bold', fontSize: 16, marginBottom: 10 }}>
        This should be Poppins Bold
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        This is system font (for comparison)
      </Text>
    </View>
  );

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="FontTest" // Add this to start with the font test screen
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: 'transparent',
              height: RNStatusBar.currentHeight,
            },
            headerTitle: '',
            headerLeft: () => null,
            headerRight: () => null,
          }}
        >
          <Stack.Screen name="FontTest" component={FontTestScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Tabs" component={TabsLayout} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}