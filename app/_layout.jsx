// app/_layout.jsx
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { redirect } from 'expo-router';
import { checkAuth } from '../utils/auth';  // Asegúrate que la ruta sea correcta

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const status = await checkAuth();
        setIsAuthenticated(status);
        if (!status) {
          redirect('/(auth)');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsAuthenticated(false);
        redirect('/(auth)');
      }
    };

    checkUserAuth();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}