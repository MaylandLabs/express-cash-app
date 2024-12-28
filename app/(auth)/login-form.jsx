import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();

  // Simulación del login con usuario "Admin" y contraseña "Admin"
  const handleLogin = () => {
    // Validación de credenciales
    if (formData.email === 'Admin' && formData.password === 'Admin') {
      // Redirigir al usuario a la página principal
      router.push('/(tabs)/'); // Redirige a la página principal
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
      {/* Contenedor principal dividido en dos partes */}
      <View style={styles.mainContainer}>
        {/* Parte superior fija con el formulario */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>
            Completa los datos para acceder a todos nuestros beneficios.
          </Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="dibu.martinez@gmail.com"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.passwordInput}
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
            <Text style={styles.forgotPassword}>¿Has olvidado tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        {/* Parte inferior con los botones que se ajustan al teclado */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <Text style={styles.registerText}>
            ¿No tienes cuenta aún?{' '}
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.registerLink}>Regístrate</Text>
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
    backgroundColor: '#00C853',
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
