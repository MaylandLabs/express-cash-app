import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch } from "../../store";
import { logInAsync } from "../../store/actions/auth";
import Toast from "../../components/Toast";
import { FONTS } from "../../theme";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  // Add keyboard listeners to track keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardVisible(true);
        // Scroll to bottom when keyboard appears
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        if (!value) return "El correo electrónico es requerido";
        if (!isValidEmail(value)) return "Ingrese un correo electrónico válido";
        return "";
      case "password":
        if (!value) return "La contraseña es requerida";
        if (value.length < 6)
          return "La contraseña debe tener al menos 6 caracteres";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
    if (error) {
      setToastMessage(error);
      setShowToast(true);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
      if (error) {
        setToastMessage(error);
        setShowToast(true);
      }
    }
  };
  console.log(formData);

  const validateForm = () => {
    const emailError = validateField("email", formData.email);
    if (emailError) {
      setToastMessage(emailError);
      setShowToast(true);
      return false;
    }
    const passwordError = validateField("password", formData.password);
    if (passwordError) {
      setToastMessage(passwordError);
      setShowToast(true);
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    console.log("Iniciando login...");
    if (!validateForm()) {
      console.log("Validación fallida");
      return;
    }

    setIsLoading(true);
    console.log("Enviando petición con datos:", formData);

    try {
      await dispatch(
        logInAsync({
          data: {
            email: formData.email,
            password: formData.password,
          },
          tokenNotifications: "TOKEN_DE_NOTIFICACIONES",
          setActive: setIsLoading,
          setError: (error) => {
            console.log("Error recibido:", error);
            setToastMessage(error);
            setShowToast(true);
          },
          dispatch,
          onSuccess: () => {
            console.log("Login exitoso");
            router.push("/(tabs)/");
          },
        })
      ).unwrap();
    } catch (error) {
      console.log("Error en login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#055B72", "#004C5E"]} className="flex-1">
      {isLoading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 justify-center items-center z-[999]">
          <ActivityIndicator size="large" color="#7CBA47" />
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        pointerEvents={isLoading ? "none" : "auto"}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 pt-5 pb-5"
          contentContainerStyle={keyboardVisible && { paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View className="flex-1 flex flex-col justify-between h-screen py-20">
            <View className="flex-1">
              <View className="mt-10 mb-5 gap-2">
                <Text
                  className="text-white text-2xl text-center"
                  style={{ fontFamily: FONTS.SEMIBOLD }}
                >
                  Iniciar Sesión
                </Text>
                <Text
                  className="text-white text-sm text-center opacity-80"
                  style={{ fontFamily: FONTS.REGULAR }}
                >
                  Completa los datos para acceder a todos nuestros beneficios.
                </Text>
              </View>

              <View className="mb-5">
                <Text
                  className="text-[#7CBA47] text-sm mb-2"
                  style={{ fontFamily: FONTS.SEMIBOLD }}
                >
                  Email
                </Text>
                <TextInput
                  className={`bg-[#004D56] rounded-[10px] p-4 text-white text-sm w-full border-2 border-[#7CBA47] mb-5 ${
                    touched.email && errors.email ? "border-[#FF3B30]" : ""
                  }`}
                  style={{ fontFamily: FONTS.REGULAR }}
                  placeholder="dibu.martinez@gmail.com"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                  onBlur={() => handleBlur("email")}
                />

                <Text
                  className="text-[#7CBA47] text-sm mb-2"
                  style={{ fontFamily: FONTS.SEMIBOLD }}
                >
                  Contraseña
                </Text>
                <View
                  className={`flex-row items-center bg-[#004D56] rounded-[10px] border-2 border-[#7CBA47] mb-5 ${
                    touched.password && errors.password
                      ? "border-[#FF3B30]"
                      : ""
                  }`}
                >
                  <TextInput
                    className="flex-1 p-4 text-sm text-white"
                    style={{ fontFamily: FONTS.REGULAR }}
                    placeholder="••••••••••"
                    placeholderTextColor="#A9A9A9"
                    value={formData.password}
                    onChangeText={(text) => handleChange("password", text)}
                    onBlur={() => handleBlur("password")}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    className="p-2"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      color="#7CBA47"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => router.push("/(auth)/passwordRecovery")}
                  className="items-center mb-5"
                >
                  <Text
                    className="text-[#00C853] text-sm"
                    style={{ fontFamily: FONTS.REGULAR }}
                  >
                    ¿Has olvidado tu contraseña?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className={`mb-${Platform.OS === "ios" ? "5" : "0"}`}>
              <View className="h-fit ">
                <Toast
                  message={toastMessage}
                  visible={showToast}
                  onHide={() => setShowToast(false)}
                />
              </View>
              <TouchableOpacity
                className={`w-full bg-[#7CBA47] rounded-[10px] p-4 items-center mb-5 ${
                  isLoading ? "opacity-70" : ""
                }`}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text
                  className="text-[#055B72] text-base"
                  style={{ fontFamily: FONTS.SEMIBOLD }}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Text>
              </TouchableOpacity>

              <View className="flex-row justify-center items-center">
                <Text
                  className="text-[#B0BEC5] text-sm"
                  style={{ fontFamily: FONTS.REGULAR }}
                >
                  ¿No tienes cuenta aún?
                </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                  <Text
                    className="text-[#00C853] text-sm ml-1"
                    style={{ fontFamily: FONTS.REGULAR }}
                  >
                    Regístrate
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginForm;
