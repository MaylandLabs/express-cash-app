import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font'; 
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

export default function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [isNewPasswordStep, setIsNewPasswordStep] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();


  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;  
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 6; 
  };

  const sendVerificationCode = async () => {
    try {
      setTimeout(() => {
        setIsVerificationStep(true);
        Alert.alert('Éxito', 'Código de verificación enviado correctamente');
      }, 2000);
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al enviar el código');
    }
  };

  const handleContinue = () => {
    if (!isVerificationStep) {
      if (isValidEmail(email)) {
        sendVerificationCode();
      } else {
        Alert.alert('Error', 'Por favor ingresa un email válido');
      }
    } else if (isVerificationStep && !isNewPasswordStep) {
      const fullCode = verificationCode.join('');
      if (fullCode === '12345') {
        setIsNewPasswordStep(true);
      } else {
        Alert.alert('Error', 'Código incorrecto');
      }
    } else {
      if (!isValidPassword(newPassword)) {
        Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
        return;
      }
      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }
      
      Alert.alert('Éxito', 'Contraseña actualizada correctamente', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }
  };

  const handleCodeChange = (text, index) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);

    if (text.length === 1 && index < 4) {
    }
  };

  const renderEmailInput = () => (
    <View style={styles.formContainer}>
      <Text style={[styles.title, { fontFamily: 'Poppins_600SemiBold' }]}>Recuperar Contraseña</Text>
      <Text style={[styles.subtitle, { fontFamily: 'Poppins_400Regular' }]}>
        Resetea tu contraseña y vuelve a ingresar a tu cuenta personal.
      </Text>

      <Text style={[styles.label, { fontFamily: 'Poppins_400Regular' }]}>Email</Text>
      <TextInput
        style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
        placeholder="Escribe tu email"
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );

  const renderVerificationCode = () => (
    <View style={styles.formContainer}>
      <Text style={[styles.title, { fontFamily: 'Poppins_600SemiBold' }]}>Código Confirmación</Text>
      <Text style={[styles.subtitle, { fontFamily: 'Poppins_400Regular' }]}>
        Ingresa el código que enviamos a su email para ingresar una contraseña nueva.
      </Text>

      <View style={styles.codeContainer}>
        {verificationCode.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>
    </View>
  );

  const renderNewPassword = () => (
    <View style={styles.formContainer}>
      <Text style={[styles.title, { fontFamily: 'Poppins_600SemiBold' }]}>Nueva Contraseña</Text>
      <Text style={[styles.subtitle, { fontFamily: 'Poppins_400Regular' }]}>
        Ingresa una contraseña nueva para ingresar nuevamente a su cuenta.
      </Text>

      <Text style={[styles.label, { fontFamily: 'Poppins_400Regular' }]}>Contraseña</Text>
      <TextInput
        style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
        placeholder="Ingresa tu nueva contraseña"
        placeholderTextColor="#A9A9A9"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <Text style={[styles.label, { fontFamily: 'Poppins_400Regular' }]}>Repetir contraseña</Text>
      <TextInput
        style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
        placeholder="Repite tu nueva contraseña"
        placeholderTextColor="#A9A9A9"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
    </View>
  );

  return (
    <LinearGradient
      colors={['#006B7A', '#004C5E']}
      style={styles.gradient}
    >
      <View style={styles.mainContainer}>
        {isNewPasswordStep 
          ? renderNewPassword()
          : isVerificationStep 
            ? renderVerificationCode()
            : renderEmailInput()
        }

        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.buttonContainer}
        >
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
          >
            <Text style={[styles.continueButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>Continuar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => {
              if (isNewPasswordStep) {
                setIsNewPasswordStep(false);
              } else if (isVerificationStep) {
                setIsVerificationStep(false);
              } else {
                router.back();
              }
            }}
          >
            <Text style={[styles.backButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>Volver</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
}

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
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 30,
    opacity: 0.8,
  },
  label: {
    fontSize: 16,
    color: "#00C853",
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#004D56',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    borderColor: '#7CBA47',
    borderWidth: 1,
  },
  continueButton: {
    backgroundColor: '#7CBA47',
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    alignItems: 'center',
  },
  backButtonText: {
    color: '#7CBA47',
    fontSize: 16,
    fontWeight: 'bold',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#7CBA47',
    borderRadius: 8,
    backgroundColor: '#004D56',
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
  },
});
