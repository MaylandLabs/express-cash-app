import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../utils/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLandingVisible, setIsLandingVisible] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const opacity = new Animated.Value(1);

  useEffect(() => {
    const clearStorage = async () => {
      try {
        await AsyncStorage.removeItem('hasSeenLanding');
      } catch (error) {
      }
    };
    clearStorage();
  }, []);

  useEffect(() => {
    const checkLandingVisibility = async () => {
      try {
        const hasSeenLanding = await AsyncStorage.getItem('hasSeenLanding');

        if (hasSeenLanding === 'true') {
          setIsLandingVisible(false);
        } else {
          if (isImageLoaded) {
            setTimeout(async () => {
              Animated.timing(opacity, {
                toValue: 0,
                duration: 1000, 
                useNativeDriver: true,
              }).start(async () => {
                setIsLandingVisible(false);
                try {
                  await AsyncStorage.setItem('hasSeenLanding', 'true');
                  
                } catch (error) {
                  
                }
              });
            }, 3000); 
          }
        }
      } catch (error) {
        
      }
    };

    checkLandingVisibility();
  }, [isImageLoaded]); 

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


  const handleImageError = (error) => {
    console.error(error.nativeEvent.error);
  };

 
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <View style={styles.container}>
      {isLandingVisible && (
        <Animated.View style={[styles.landingContainer, { opacity }]}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoInicio}
            resizeMode="contain"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </Animated.View>
      )}
      {!isLandingVisible && (
        <>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            onError={handleImageError}
          />
          <Text style={styles.welcomeText}>¡Bienvenido! 👋</Text>
          <Text style={styles.subText}>
            Crea una cuenta personal para acceder a todos nuestros beneficios.
          </Text>

          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require('../../assets/google-icon.png')}
              style={styles.googleIcon}
              onError={handleImageError}
            />
            <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/(auth)/login-form')}
          >
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes cuenta aún? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.registerLink}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
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
  landingContainer: {
    flex: 1,
    backgroundColor: '#004D56',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 20,
    marginTop: -190
  },
  logoInicio: {
    width: 300,
    height: 150,
    marginBottom: 40,
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
    marginTop: 15
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    top: 220
  },
  registerText: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  registerLink: {
    color: '#7CBA47',
    fontWeight: 'bold',
  },
});