import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { FONTS } from '../../../theme';
const notifications = [
  { id: '1', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
  { id: '2', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
  { id: '3', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
  { id: '4', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
];
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScrollViewTopMask from '../../../components/ScrollViewTopMask';

const Notifications = () => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#055B72', '#004C5E']}
      style={[style.container, { paddingTop: insets.top }]}
    >
      <View className="flex-1 px-4">
        <View className="mt-4">
          <Text style={[style.headerText, { fontFamily: FONTS.SEMIBOLD }]}>
            Notificaciones
          </Text>
        </View>
        <ScrollViewTopMask>
          <FlatList
            className="pt-8"
            data={notifications}
            keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-ex-primary rounded-2xl px-5 py-4 mt-4 flex-row items-center">
              <Text className="text-2xl text-white">{item.emoji}</Text>
              <View className="ml-4">
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
        </ScrollViewTopMask>
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
