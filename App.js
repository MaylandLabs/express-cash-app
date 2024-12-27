import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeView from './components/HomeView';
import Loan from './app/(tabs)/loan';
import TabsLayout from './app/(tabs)/_layout';  // Este componente maneja las tabs
import LoansScreen from './components/LoansScreen'; // Asegúrate de que este componente esté importado correctamente

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="Notifications" component={Loan} />
      <Tab.Screen name="Profile" component={TabsLayout} />
      <Tab.Screen name="Loan" component={Loan} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Tabs" component={TabNavigator} />
  <Stack.Screen name="Loans" component={LoansScreen} />
</Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f7f7f7",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});