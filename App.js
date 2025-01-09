// App.js
import React from 'react';
import { ActivityIndicator, View, StatusBar as RNStatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { checkAuth } from '../express-cash-app/utils/auth';
import { StatusBar } from 'expo-status-bar';
import Login from './app/(auth)/login';
import Signup from './app/(auth)/signup';
import TabsLayout from './app/(tabs)/_layout';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    checkInitialAuth();
  }, []);

  const checkInitialAuth = async () => {
    try {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
    } catch (error) {
      console.error('Error checking initial auth:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
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
          {!isAuthenticated ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          ) : (
            <Stack.Screen name="Tabs" component={TabsLayout} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}