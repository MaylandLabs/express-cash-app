import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

const notifications = [
  { id: '1', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
  { id: '2', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
  { id: '3', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
  { id: '4', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
];

const Notifications = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#006B7A', '#004C5E']}
      style={style.container}
      onLayout={onLayoutRootView}
    >
      <View style={style.content}>
        <View style={style.header}>
          <Text style={[style.headerText, { fontFamily: 'Poppins_600SemiBold' }]}>
            Notificaciones
          </Text>
        </View>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={style.notificationCard}>
              <Text style={style.emoji}>{item.emoji}</Text>
              <View style={style.notificationContent}>
                <Text style={[style.notificationTitle, { fontFamily: 'Poppins_600SemiBold' }]}>
                  {item.title}
                </Text>
                <Text style={[style.notificationSubtitle, { fontFamily: 'Poppins_400Regular' }]}>
                  {item.subtitle}
                </Text>
                <Text style={[style.notificationDate, { fontFamily: 'Poppins_400Regular' }]}>
                  {item.date}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const style = {
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  notificationCard: {
    backgroundColor: '#004C5E',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
  },
  notificationContent: {
    marginLeft: 16,
  },
  notificationTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  notificationSubtitle: {
    color: 'white',
    opacity: 0.7,
    fontSize: 12,
  },
  notificationDate: {
    color: 'white',
    opacity: 0.5,
    fontSize: 10,
  },
};

export default Notifications;
