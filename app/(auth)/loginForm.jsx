import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, Alert, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get('window').height;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  // Add keyboard listeners to track keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardVisible(true);
        // Scroll to bottom when keyboard appears
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  // Simulación del login con usuario "Admin" y contraseña "Admin"
  const handleLogin = () => {
    if (formData.email === 'Admin' && formData.password === 'Admin') {
      router.push('/(tabs)/');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  return (
      <LinearGradient
        colors={["#055B72", "#004C5E"]}
        style={styles.gradient}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
        <View>
          <View style={styles.headerContainer}>
            <Text className='text-white text-2xl mt-6 text-center font-semibold'>Iniciar Sesión</Text>
            <Text className='text-white text-sm text-center font-poppins-regular opacity-80'>Completa los datos para acceder a todos nuestros beneficios.</Text>
          </View>

          <View style={styles.formContainer}>
            <Text className='text-ex-secondary text-sm font-semibold'>Email</Text>
            <TextInput
              style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
              placeholder="dibu.martinez@gmail.com"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />

            <Text className='text-ex-secondary text-sm font-semibold'>Contraseña</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.passwordInput, { fontFamily: 'Poppins_400Regular' }]}
                placeholder="••••••••••"
                placeholderTextColor="#A9A9A9"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={!showPassword}
                onFocus={() => {
                  if (scrollViewRef.current) {
                    setTimeout(() => {
                      scrollViewRef.current.scrollToEnd({ animated: true });
                    }, 100);
                  }
                }}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={24} 
                  color="#7CBA47"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.push('/(auth)/passwordRecovery')}>
              <Text style={[styles.forgotPassword, { fontFamily: 'Poppins_400Regular' }]}>¿Has olvidado tu contraseña?</Text>
            </TouchableOpacity>
          </View>
          </View>

          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={[styles.loginButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>Iniciar sesión</Text>
            </TouchableOpacity>
            <Text style={[styles.registerText, { fontFamily: 'Poppins_400Regular' }]}>
              ¿No tienes cuenta aún?{' '}
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text style={[styles.registerLink, { fontFamily: 'Poppins_600SemiBold' }]}>Regístrate</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  headerContainer: {
    marginTop: 40,
    marginBottom: 20,
    gap: 8,
  },
  formContainer: {
    marginBottom: 20,
  },
  bottomSection: {
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  input: {
    backgroundColor: '#004D56',
    borderRadius: 10,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: '#7CBA47',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004D56',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7CBA47',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 14,
    color: '#FFFFFF',
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#00C853',
    marginBottom: 20,
    textAlign: "center"
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#7CBA47',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 14,
    color: '#B0BEC5',
    textAlign: 'center',
  },
  registerLink: {
    color: '#00C853',
    fontWeight: 'bold',
    top: 5,
  },
});

export default LoginForm;
