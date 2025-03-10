import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from '../../components/Toast';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    cuil: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [backButton, setbackButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const insets = useSafeAreaInsets();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Esperamos a que las fuentes se carguen
  }

  const validateForm = () => {
    if (!formData.email || !formData.cuil || !formData.telefono || !formData.password || !formData.confirmPassword) {
      setToastMessage("Todos los campos son obligatorios");
      setShowToast(true);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToastMessage("Por favor ingresa un email válido");
      setShowToast(true);
      return false;
    }

    const cuilRegex = /^\d{2}\.\d{3}\.\d{3}$/;
    if (!cuilRegex.test(formData.cuil)) {
      setToastMessage("El CUIL/CUIT debe tener el formato XX.XXX.XXX");
      setShowToast(true);
      return false;
    }

    const phoneRegex = /^\+54\s\d{3}-\d{8}$/;
    if (!phoneRegex.test(formData.telefono)) {
      setToastMessage("El teléfono debe tener el formato +54 XXX-XXXXXXXX");
      setShowToast(true);
      return false;
    }

    if (formData.password.length < 8) {
      setToastMessage("La contraseña debe tener al menos 8 caracteres");
      setShowToast(true);
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setToastMessage("Las contraseñas no coinciden");
      setShowToast(true);
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    try {
      if (!validateForm()) return;
      
      setIsLoading(true);
      // Simular llamada a la API
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.replace("/(auth)/success");
    } catch (error) {
      console.error(error);
      setToastMessage("Ocurrió un error al registrarse");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={["#055B72", "#004C5E"]}
      style={[
        styles.gradient,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
      onLayout={onLayoutRootView}
    >
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#7CBA47" />
        </View>
      )}
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        pointerEvents={isLoading ? "none" : "auto"}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { fontFamily: "Poppins_600SemiBold" }]}>
              Registrarse
            </Text>
            <Text
              style={[styles.subtitle, { fontFamily: "Poppins_400Regular" }]}
            >
              Crea una cuenta personal para acceder a todos nuestros beneficios.
            </Text>
          </View>

          <View>
            <Text style={[styles.label]}>
              Email
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="dibu.martinez@gmail.com"
                placeholderTextColor="#A9A9A9"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Campo CUIL/CUIT */}
            <Text style={[styles.label]}>
              CUIL/CUIT
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="12.345.678"
                placeholderTextColor="#A9A9A9"
                value={formData.cuil}
                onChangeText={(text) =>
                  setFormData({ ...formData, cuil: text })
                }
                keyboardType="numeric"
              />
            </View>

            {/* Campo Teléfono */}
            <Text style={[styles.label]}>
              Teléfono
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="+54 011-12345678"
                placeholderTextColor="#A9A9A9"
                value={formData.telefono}
                onChangeText={(text) =>
                  setFormData({ ...formData, telefono: text })
                }
                keyboardType="phone-pad"
              />
            </View>

            {/* Campo Contraseña */}
            <Text style={[styles.label]}>
              Contraseña
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="••••••••••"
                placeholderTextColor="#A9A9A9"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
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
            <Text style={[styles.label]}>
              Repetir Contraseña
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="••••••••••"
                placeholderTextColor="#A9A9A9"
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  setFormData({ ...formData, confirmPassword: text })
                }
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
          </View>
        </View>
      </ScrollView>

      <Toast
        message={toastMessage} 
        visible={showToast} 
        onHide={() => setShowToast(false)} 
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={handleSignup}>
          <Text
            style={[
              styles.registerButtonText,
              { fontFamily: "Poppins_600SemiBold" },
            ]}
          >
            Registrarse
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            router.push({
              pathname: "/(auth)/login-form",
              params: { transition: "fade" },
            })
          }
        >
          <Text
            style={[
              styles.backButtonText,
              { fontFamily: "Poppins_400Regular" },
            ]}
          >
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContainer: {
    marginBottom: 30,
    marginTop:40,
  },
  title: {
    fontSize: 26,
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
    textAlign: "center",
  },
  label: {
    color: "#7CBA47",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#004D56",
    borderRadius: 10,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "#7CBA47",
    height: 60,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 17,
  },
  buttonContainer: {
    padding: 20,
  },
  registerButton: {
    backgroundColor: "#7CBA47",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    alignItems: "center",
  },
  backButtonText: {
    color: "#7CBA47",
    fontSize: 14,
    fontWeight: "bold",
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});
