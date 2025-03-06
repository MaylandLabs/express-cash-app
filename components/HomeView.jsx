import React, { useState, useCallback } from 'react';
import { Text, View, Image, Pressable, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Stack } from "expo-router";
import { styled } from "nativewind";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { ArrowRight } from 'lucide-react-native';
import { images } from '../theme';

const StyledPressable = styled(Pressable);

const HomeView = () => {
  const router = useRouter();
  const [headerScale] = useState(new Animated.Value(1));
  const [loanButtonScale] = useState(new Animated.Value(1));
  const [statusCardScale] = useState(new Animated.Value(1));

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const handlePressIn = (scale) => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = (scale) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

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
      className="flex-1"
      onLayout={onLayoutRootView}
    >
      <View className="flex-1 pt-4 px-6 mt-8">
        <Stack.Screen options={{ headerShown: false }} />

        {/* Header */}
        <Pressable
          onPress={() => router.push('/(tabs)/profile')}
          onPressIn={() => handlePressIn(headerScale)}
          onPressOut={() => handlePressOut(headerScale)}
        >
          <Animated.View
            style={{
              transform: [{ scale: headerScale }],
            }}
            className="flex-row items-center gap-3 mb-2.5 -top-5"
          >
            <Image
              source={images.userr_icon}
              className="w-8 h-8 rounded-full"
            />
            <Text className="text-lg text-white top-[3px]" style={{ fontFamily: 'Poppins_500Medium' }}>Hola, Félix</Text>
            <ArrowRight size={18} color="white" />
          </Animated.View>
        </Pressable>

        {/* Loan Section */}
        <View className="mt-6 flex-1 -top-[15px]">
          <View className="bg-[#006B7A] p-4 rounded-2xl h-[340px]">
            <Text className="text-sm text-[rgba(255,255,255,0.8)]" style={{ fontFamily: 'Poppins_400Regular' }}>Pedí tu préstamo de hasta</Text>
            <Text className="text-[48px] text-white mt-4" style={{ fontFamily: 'Poppins_600SemiBold' }}>$300.000</Text>

            <View className="flex-1 -ml-[35px]">
              <Image
                source={images.money_icon}
                className="w-[240px] h-[168px] self-start"
                style={{ resizeMode: 'contain' }}
              />
            </View>

            <View className="absolute bottom-5 left-8 right-4">
              <Pressable
                onPress={() => router.push('/loan')}
                onPressIn={() => handlePressIn(loanButtonScale)}
                onPressOut={() => handlePressOut(loanButtonScale)}
              >
                <Animated.View
                  style={{
                    transform: [{ scale: loanButtonScale }],
                  }}
                  className="bg-[#7CBA47] py-3 px-5 rounded-lg w-full items-center justify-center"
                >
                  <Text className="text-center font-poppins-bold text-[#006B7A]">
                    Pedir un préstamo
                  </Text>
                </Animated.View>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Current Loan Status */}
        <View className="mt-6 mb-40">
          <Text className="text-lg text-white mb-2 mt-2.5" style={{ fontFamily: 'Poppins_500Medium' }}>Mis préstamos</Text>
          
          <Pressable
            onPress={() => router.push('/MyLoans')}
            onPressIn={() => handlePressIn(statusCardScale)}
            onPressOut={() => handlePressOut(statusCardScale)}
          >
            <Animated.View
              style={{
                transform: [{ scale: statusCardScale }],
              }}
              className="bg-[#006B7A] p-4 rounded-2xl"
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-2xl text-white" style={{ fontFamily: 'Poppins_600SemiBold' }}>$75.000</Text>
                <Text className="ml-[380px]" style={{ fontFamily: 'Poppins_400Regular' }}>😊</Text>
                <Text className="text-[rgba(255,255,255,0.7)]" style={{ fontFamily: 'Poppins_400Regular' }}> Al día</Text>
              </View>
              <Text className="text-sm text-[rgba(255,255,255,0.6)] mt-1" style={{ fontFamily: 'Poppins_400Regular' }}>14 junio 2023</Text>

              <View className="mt-4">
                <Text className="text-sm text-[rgba(255,255,255,0.7)] mb-2" style={{ fontFamily: 'Poppins_400Regular' }}>Cuotas pagadas</Text>
                <View className="flex-row gap-1">
                  {[...Array(10)].map((_, i) => (
                    <View
                      key={i}
                      className={`flex-1 h-1.5 rounded-sm ${i < 8 ? 'bg-[#79C72B]' : 'bg-[rgba(255,255,255,0.2)]'}`}
                    />
                  ))}
                </View>
                <Text className="text-sm text-[rgba(255,255,255,0.6)] mt-1" style={{ fontFamily: 'Poppins_400Regular' }}>8/10</Text>
              </View>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HomeView;
