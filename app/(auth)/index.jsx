import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { login } from '../../utils/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS, images } from '../../theme';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

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
    <LinearGradient colors={['#055B72', '#004D56']} >
    <View className='flex justify-center items-center h-screen px-6'>
      <Image
        source={images.logo} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text className="text-white text-3xl font-poppins-bold text-center" style={{fontFamily: FONTS.SEMIBOLD}}>¡Bienvenido! 👋</Text>
      <Text className="text-white mt-4 text-sm font-poppins-regular text-center opacity-80">Crea una cuenta personal para acceder a todos nuestros beneficios.</Text>

      <TouchableOpacity className='mt-12' style={styles.googleButton}>
        <Image
          source={images.google_logo}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>o</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity
        className='bg-ex-secondary p-4 w-full justify-center items-center rounded-xl'
        onPress={() => router.push('/(auth)/loginForm')}
      >
        <Text className='text-ex-primary text-base' style={{fontFamily: FONTS.SEMIBOLD}}>Iniciar sesión</Text>
      </TouchableOpacity>

      <View className='flex flex-row items-center justify-center mt-20'>
        <Text style={[styles.registerText]}>¿No tienes cuenta aún? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
          <Text style={[styles.registerLink]}>Regístrate</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004D56',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 80,
    opacity: 0.8,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#7CBA47",
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins_400Regular',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
  dividerText: {
    color: '#FFFFFF',
    paddingHorizontal: 10,
    opacity: 0.8,
  },
  loginButton: {
    backgroundColor: '#7CBA47',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    top: 130,
  },
  registerText: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: 'Poppins_400Regular',
  },
  registerLink: {
    color: '#7CBA47',
    fontFamily: 'Poppins_600SemiBold',
  },
});
