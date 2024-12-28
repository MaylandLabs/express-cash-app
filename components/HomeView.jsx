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
  Animated
} from "react-native";
import { Link } from "expo-router";
import { Stack } from "expo-router";
import { styled } from "nativewind";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

const StyledPressable = styled(Pressable);

const HomeView = () => {
  const router = useRouter();
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,  // Reduce el tamaño al 95% al presionar
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,  // Efecto de rebote
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,  // Vuelve al tamaño original
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };



  return (
<LinearGradient
  colors={['#006B7A', '#004C5E']}
  style={{ flex: 1 }}
>
  <View className="flex-1 pt-4 px-6 mt-8">
    <Stack.Screen options={{ headerShown: false }} />
    
    {/* Header */}
    <Pressable
      onPress={() => router.push('/(tabs)/profile')}
      onPressIn={handlePressIn}  // Inicia la animación de escala
      onPressOut={handlePressOut}  // Termina la animación de escala
    >
      <Animated.View
        style={{
          transform: [{ scale }],  // Aplica la animación de escala
        }}
        className="flex-row items-center gap-3 mb-5"
      >
        <Image
          source={require('../assets/userr.png')}
          className="w-8 h-8 rounded-full"
        />
        <Text className="text-lg font-medium text-white">Hola, Félix</Text>
        <Text className="text-white ml-auto">{'>'}</Text>
      </Animated.View>
    </Pressable>
    {/* Loan Section */}
    <View className="mt-6 flex-1">
      <View className="bg-[#006B7A] p-4 rounded-2xl h-[340px]">
        <Text className="text-sm text-white/80">Pedí tu préstamo de hasta</Text>
        <Text className="text-5xl font-semibold text-white mt-4">$300.000</Text>
        
        {/* Button moved above the image */}
        <View className="flex-1">
  {/* Image positioned at bottom left */}
  <View className="flex-1 ml-[-35px]">
    <Image 
      source={require('../assets/image 24.png')} 
      className="w-60 h-42"
      resizeMode="contain"
      style={{ alignSelf: 'flex-start' }}
    />
  </View>

  {/* Button positioned above the image */}
  <View className="absolute bottom-5 left-8 right-4">
    <StyledPressable
      className="p-4 rounded-lg active:opacity-80 bg-[#79C72B] w-[260px]"
      onPress={() => router.push('/loan')}
    >
      <Text className="text-center font-bold text-[#006B7A]">
        Pedir un préstamo
      </Text>
    </StyledPressable>
  </View>
  </View>
  </View>
      </View>
        {/* Current Loan Status */}
        <View className="mt-6 mb-40">
          <Text className="text-lg text-white mb-2">Mis préstamos</Text>
          <View className="bg-[#006B7A] p-4 rounded-2xl">
            <View className="flex-row justify-between items-center">
              <Text className="text-2xl font-semibold text-white">$75.000</Text>
              <Text className="ml-[190px]">😊</Text>
              <Text className="text-white/70"> Al día</Text>
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

