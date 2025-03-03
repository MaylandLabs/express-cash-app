import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

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

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <LinearGradient
      colors={['#006B7A', '#004C5E']}
      style={styles.gradient}
    >
      <View style={styles.mainContainer}>
      
        <View style={styles.formContainer}>
          <Text style={[styles.title, { fontFamily: 'Poppins_600SemiBold' }]}>Iniciar Sesión</Text>
          <Text style={[styles.subtitle, { fontFamily: 'Poppins_400Regular' }]}>
            Completa los datos para acceder a todos nuestros beneficios.
          </Text>

          <Text style={[styles.label, { fontFamily: 'Poppins_400Regular' }]}>Email</Text>
          <TextInput
            style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
            placeholder="dibu.martinez@gmail.com"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          <Text style={[styles.label, { fontFamily: 'Poppins_400Regular' }]}>Contraseña</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.passwordInput, { fontFamily: 'Poppins_400Regular' }]}
              placeholder="••••••••••"
              placeholderTextColor="#A9A9A9"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry={!showPassword}
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

        
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={[styles.loginButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>Iniciar sesión</Text>
          </TouchableOpacity>

          <Text style={[styles.registerText, { fontFamily: 'Poppins_400Regular' }]}>
            ¿No tienes cuenta aún?{' '}
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={[styles.registerLink, { fontFamily: 'Poppins_600SemiBold' }]}>Regístrate</Text>
            </TouchableOpacity>
          </Text>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    padding: 20,
    paddingTop: 60,
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#B0BEC5',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#00C853",
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
