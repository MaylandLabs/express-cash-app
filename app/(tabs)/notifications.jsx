import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from 'expo-linear-gradient';

const StyledPressable = styled(Pressable);

const notifications = [
  { id: '1', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
  { id: '2', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
  { id: '3', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
  { id: '4', title: '¡Préstamo pre-aprobado!', subtitle: 'Un asesor se comunicará contigo', date: '1 día', emoji: '😊' },
];

const Notifications = () => {
  return (
    <LinearGradient
      colors={['#006B7A', '#004C5E']}
      style={{ flex: 1 }}
    >
      <View className="flex-1 pt-4 px-6">
        <View className="mt-8">
          <Text className="text-lg font-semibold text-white mb-4 text-center">Notificaciones</Text>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="bg-[#004C5E] p-4 rounded-xl mb-4 flex-row items-center">
                <Text className="text-3xl">{item.emoji}</Text>
                <View className="ml-4">
                  <Text className="text-white font-semibold">{item.title}</Text>
                  <Text className="text-white/70 text-sm">{item.subtitle}</Text>
                  <Text className="text-white/50 text-xs">{item.date}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Notifications;
