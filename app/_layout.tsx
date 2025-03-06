import { Provider } from 'react-redux';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store, AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { loadFonts, loadImages } from '../theme/index';
import { verifySessionAsync } from '../store/actions/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const RootLayoutWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootLayout />
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
};

const RootLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [appReady, setAppReady] = useState<boolean>(false);
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const initNotificationListener = () => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      const payload = notification.request.content.data;
      if (!payload) {
        return;
      }
      const { action } = payload;
      if (action) {
        if (action === 'reload') {
          //agregar un action segun la notificacion, talves redirigir a una noticia o algo
          //dispatch();
        }
      }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      
    });
  };

  const removeNotificationListener = () => {
    if (!notificationListener.current || !responseListener.current) {
      return;
    }
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };

  useEffect(() => {
    initNotificationListener();

    return () => {
      removeNotificationListener();
    };
  }, []);

  const preloadAssets = async () => {
    try {
      await Promise.all([loadFonts(), loadImages()]);
    } finally {
      setAppReady(true);
    }
  };

  useEffect(() => {
    preloadAssets();
  }, []);

  useEffect(() => {
    const validateSessions = async () => {
      await dispatch(verifySessionAsync({ dispatch }));
    };
    validateSessions();
  }, [dispatch]);

  useEffect(() => {
    if (appReady && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [appReady, isLoading]);

  if (!appReady || isLoading) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="not_found" />
    </Stack>
  );
};

export default RootLayoutWrapper;