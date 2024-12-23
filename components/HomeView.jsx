import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TextInput,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import { Stack } from "expo-router";
import { styled } from "nativewind";
import { LinearGradient } from 'expo-linear-gradient';

const StyledPressable = styled(Pressable);

const HomeView = () => {
  return (
    <LinearGradient
      colors={['#006B7A', '#004C5E']}
      style={{ flex: 1 }}
    >
      <View className="flex-1 pt-16 px-6">
        <Stack.Screen options={{ headerShown: false }} />
        
        {/* Header */}
        <View className="flex-row items-center gap-3">
          <Image 
            source={require('../assets/icon.png')} 
            className="w-8 h-8 rounded-full"
          />
          <Text className="text-lg font-medium text-white">Hola, Félix</Text>
          <Text className="text-white ml-auto">{'>'}</Text>
        </View>

        {/* Loan Section */}
        <View className="mt-6">
          <Text className="text-sm text-white/80">Pedí tu préstamo de hasta</Text>
          <View className="mt-4 items-center">
            <Text className="text-5xl font-semibold text-white">$300.000</Text>
            <Image 
              source={require('../assets/image 24.png')} 
              className="w-40 h-32 mt-4"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Button */}
        <StyledPressable
          className="p-4 rounded-lg active:opacity-80 bg-[#79C72B] mt-6"
        >
          <Text className="text-center font-medium text-white">
            Pedir un préstamo
          </Text>
        </StyledPressable>

        {/* Current Loan Status */}
        <View className="mt-12">
          <Text className="text-lg text-white mb-6">Mis préstamos</Text>
          <View className="bg-[#005668] p-4 rounded-lg">
            <View className="flex-row justify-between items-center">
              <Text className="text-2xl font-semibold text-white">$75.000</Text>
              <Text className="text-white/70">Al día</Text>
            </View>
            <Text className="text-white/60 text-sm mt-1">14 junio 2023</Text>
            
            <View className="mt-4">
              <Text className="text-white/70 text-sm mb-2">Cuotas pagadas</Text>
              <View className="flex-row gap-1">
                {[...Array(10)].map((_, i) => (
                  <View 
                    key={i}
                    className={`flex-1 h-1.5 rounded-full ${i < 8 ? 'bg-[#79C72B]' : 'bg-white/20'}`}
                  />
                ))}
              </View>
              <Text className="text-white/60 text-sm mt-1">8/10</Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HomeView;

