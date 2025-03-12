import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { login } from '../../utils/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { images, FONTS } from '../../theme';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const success = await login(email, password);
      if (success) {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  return (
    <LinearGradient colors={['#055B72', '#004D56']}>
      <View className="flex justify-center items-center h-screen px-6">
        <Image source={images.logo} className="w-64 h-24 mb-5" resizeMode="contain" />
        
        <Text className="text-white text-3xl text-center" style={{ fontFamily: FONTS.BOLD }}>
          ¡Bienvenido! 👋
        </Text>
        <Text className="text-white mt-4 text-sm text-center opacity-80" style={{ fontFamily: FONTS.REGULAR }}>
          Crea una cuenta personal para acceder a todos nuestros beneficios.
        </Text>

        <TouchableOpacity className="mt-12 flex-row items-center border border-[#7CBA47] px-5 py-4 rounded-xl w-full justify-center">
          <Image source={images.google_logo} className="w-6 h-6 mr-2" />
          <Text className="text-base text-white" style={{ fontFamily: FONTS.REGULAR }}>
            Iniciar sesión con Google
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center w-full my-6">
          <View className="flex-1 h-px bg-white/30" />
          <Text className="text-white px-4 opacity-80" style={{ fontFamily: FONTS.REGULAR }}>
            o
          </Text>
          <View className="flex-1 h-px bg-white/30" />
        </View>

        <TouchableOpacity 
          className="bg-ex-secondary p-4 w-full justify-center items-center rounded-xl"
          onPress={() => router.push('/(auth)/loginForm')}
        >
          <Text className="text-ex-primary text-base" style={{ fontFamily: FONTS.SEMIBOLD }}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>

        <View className="flex flex-row items-center justify-center mt-20">
          <Text className="text-white/80" style={{ fontFamily: FONTS.REGULAR }}>
            ¿No tienes cuenta aún? 
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text className="text-[#7CBA47] ml-2" style={{ fontFamily: FONTS.SEMIBOLD }}>
              Regístrate
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
