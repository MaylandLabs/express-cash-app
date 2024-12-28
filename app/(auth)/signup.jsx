import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    cuil: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [backButton, setbackButton] = useState(false);


  const handleSignup = async () => {
    // Aquí va tu lógica de registro
    try {
      // Validaciones y llamada a la API
      router.replace('/(auth)');
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <LinearGradient
              colors={['#006B7A', '#004C5E']}
              style={styles.gradient}
            >
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <Text style={styles.subtitle}>
        Crea una cuenta personal para acceder a todos nuestros beneficios.
      </Text>

      {/* Campo Email */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="dibu.martinez@gmail.com"
          placeholderTextColor="#A9A9A9"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Campo CUIL/CUIT */}
      <Text style={styles.label}>CUIL/CUIT</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="12.345.678"
          placeholderTextColor="#A9A9A9"
          value={formData.cuil}
          onChangeText={(text) => setFormData({...formData, cuil: text})}
          keyboardType="numeric"
        />
      </View>

      {/* Campo Teléfono */}
      <Text style={styles.label}>Teléfono</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="+54 011-12345678"
          placeholderTextColor="#A9A9A9"
          value={formData.telefono}
          onChangeText={(text) => setFormData({...formData, telefono: text})}
          keyboardType="phone-pad"
        />
      </View>

      {/* Campo Contraseña */}
      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="••••••••••"
          placeholderTextColor="#A9A9A9"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
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

      {/* Campo Repetir Contraseña */}
      <Text style={styles.label}>Repetir Contraseña</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="••••••••••"
          placeholderTextColor="#A9A9A9"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity 
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons 
            name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
            size={24} 
            color="#7CBA47"
          />
        </TouchableOpacity>
      </View>

      {/* Botón de Registro */}
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={handleSignup}
      >
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.backButton}
  onPress={() =>
    router.push({
      pathname: '/(auth)/login-form',
      params: { transition: 'fade' }, // Agregar transición
    })
  }
>
  <Text style={styles.backButtonText}>Iniciar secion</Text>
</TouchableOpacity>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    color: '#7CBA47',
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
    
  },
  input: {
    backgroundColor: '#004D56',
    borderRadius: 10,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#7CBA47',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  registerButton: {
    backgroundColor: '#7CBA47',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#7CBA47',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
