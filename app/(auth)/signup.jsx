import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Pressable, Image,} from "react-native";
import { useRouter } from "expo-router";
import { useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "../../components/Toast";
import { FONTS } from '../../theme';
import google_icon from "../../assets/images/google_icon.png";
import { registerInAsync } from "../../store/actions/auth";
import { useAppDispatch } from "../../store";

export default function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    cuil: "",
    phone: "",
    birthDate: "",
    zipcode: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [backButton, setbackButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [fontsLoaded] = useState(true);

  const insets = useSafeAreaInsets();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.cuil ||
      !formData.telefono ||
      !formData.password ||
      !formData.confirmPassword
    ) {
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
    const cuilRegex = /^(\d{2}[-\s.]?\d{3}[-\s.]?\d{3})$/;
    if (!cuilRegex.test(formData.cuil.replace(/[-.\s]/g, ''))) {
      setToastMessage("El CUIL/CUIT debe tener 8 dígitos");
      setShowToast(true);
      return false;
    }
    const phoneRegex = /^(?:\+?54\s?)?(?:[-\s]?\d){10,}$/;
    const cleanPhone = formData.telefono.replace(/[-+\s]/g, '');
    if (!phoneRegex.test(formData.telefono) || cleanPhone.length < 10) {
      setToastMessage("El teléfono debe tener al menos 10 dígitos");
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
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    dispatch(
      registerInAsync({
        data: {
          email: formData.email,
          password: formData.password,
          first_name: formData.name,
          last_name: formData.lastName,
          cuil: formData.cuil,
          phone: formData.telefono,
          birthday: formData.birthDate,
          zipcode: formData.zipcode,
        },
        tokenNotifications: "TOKEN_DE_NOTIFICACIONES",
        setActive: setIsLoading,
        setError: setToastMessage,
        dispatch,
      })
    )
      .unwrap()
      .then(() => {
        console.log("Registro exitoso");
        router.push("/(auth)/codeSecurity");
      })
      .catch(() => {
        setShowToast(true);
      });
  };

  return (
    <LinearGradient
      colors={["#055B72", "#004C5E"]}
      className="flex-1"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      onLayout={onLayoutRootView}
    >
      {isLoading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/50 z-[999]">
          <ActivityIndicator size="large" color="#7CBA47" />
        </View>
      )}

      <ScrollView
         contentContainerStyle={styles.scrollContent}
         showsVerticalScrollIndicator={false}
         pointerEvents={isLoading ? "none" : "auto"}
      >
        <View className="flex-1 p-5">
          <View className="mb-5 mt-10">
            <Text 
              className="text-white text-2xl text-center mb-2"
              style={{ fontFamily: FONTS.SEMIBOLD }}
            >
              Registrarse
            </Text>
            <Text 
              className="text-white text-sm text-center"
              style={{ fontFamily: FONTS.REGULAR }}
            >
              Crea una cuenta personal para acceder a todos nuestros beneficios.
            </Text>
            <Pressable className="border-[#7CBA47] border-2  bg-transparent mt-4 font-poppins_regular p-4 rounded-[10px] items-center flex-row justify-center">
              <Image source={google_icon} className="w-6 h-6 mr-2" />
              <Text className="text-[#F5F5F5]">Registrarse con Google</Text>
            </Pressable>
            <View className="flex-row items-center w-full mt-8">
              <View className="flex-1 h-[3px] bg-[#79C72B] opacity-50" />
              <Text className="text-[#79C72B] opacity-80 px-2">o</Text>
              <View className="flex-1 h-[3px] bg-[#79C72B] opacity-50" />
            </View>
          </View>

          <View>
            <Text className="text-[#7CBA47] text-sm font-poppins_semibold mb-2">
              Nombre
            </Text>
            <View className="relative mb-6">
              <TextInput 
                className="bg-[#004D56] text-white text-sm p-4 rounded-[10px] border-[#7CBA47] border-2"
                style={{ fontFamily: FONTS.REGULAR }}
                placeholder="Juan"
                placeholderTextColor="#A9A9A9"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
            </View>
            <Text className="text-[#7CBA47] text-sm font-poppins_semibold mb-2">
              Apellido
            </Text>
            <View className="relative mb-6">
              <TextInput 
                className="bg-[#004D56] text-white text-sm p-4 rounded-[10px] border-[#7CBA47] border-2"
                style={{ fontFamily: FONTS.REGULAR }}
                placeholder="Martinez"
                placeholderTextColor="#A9A9A9"
                value={formData.lastName}
                onChangeText={(text) =>
                  setFormData({ ...formData, lastName: text })
                }
              />
            </View>

            <Text className="text-[#7CBA47] text-sm font-poppins_semibold mb-2">
              Email
            </Text>
            <View className="relative mb-6">
              <TextInput
                className="bg-[#004D56] text-white text-sm p-4 rounded-[10px] border-[#7CBA47] border-2"
                style={{ fontFamily: FONTS.REGULAR }}
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
            <Text className="text-[#7CBA47] text-sm font-poppins_semibold mb-2">
              CUIL/CUIT
            </Text>
            <View className="relative mb-6">
              <TextInput
                className="bg-[#004D56] text-white text-sm p-4 rounded-[10px] border-[#7CBA47] border-2"
                style={{ fontFamily: FONTS.REGULAR }}
                placeholder="12.345.678"
                placeholderTextColor="#A9A9A9"
                value={formData.cuil}
                onChangeText={(text) =>
                  setFormData({ ...formData, cuil: text })
                }
                keyboardType="numeric"
              />
            </View>

            <Text className="text-[#7CBA47] text-sm font-poppins_semibold mb-2">
              Fecha de nacimiento
            </Text>
            <View className="relative mb-6">
              <TextInput 
                className="bg-[#004D56] text-white text-sm p-4 rounded-[10px] border-[#7CBA47] border-2"
                style={{ fontFamily: FONTS.REGULAR }}
                placeholder="12/01/1990"
                placeholderTextColor="#A9A9A9"
                value={formData.birthDate}
                onChangeText={(text) =>
                  setFormData({ ...formData, birthDate: text })
                }
              />
            </View>
            <Text className="text-[#7CBA47] text-sm font-poppins_semibold mb-2">
              Teléfono
            </Text>
            <View className="relative mb-6">
              <TextInput
                className="bg-[#004D56] text-white text-sm p-4 rounded-[10px] border-[#7CBA47] border-2"
                style={{ fontFamily: FONTS.REGULAR }}
                placeholder="+54 011-12345678"
                placeholderTextColor="#A9A9A9"
                value={formData.telefono}
                onChangeText={(text) =>
                  setFormData({ ...formData, telefono: text })
                }
                keyboardType="phone-pad"
              />
            </View>
            <Text className="text-[#7CBA47] text-sm font-poppins_semibold mb-2">
              Código Postal
            </Text>
            <View className="relative mb-6">
              <TextInput
                className="bg-[#004D56] text-white text-sm p-4 rounded-[10px] border-[#7CBA47] border-2"
                style={{ fontFamily: FONTS.REGULAR }}
                placeholder="4001"
                placeholderTextColor="#A9A9A9"
                value={formData.zipcode}
                onChangeText={(text) =>
                  setFormData({ ...formData, zipcode: text })
                }
              />
            </View>
            <Text className="text-[#7CBA47] text-sm font-poppins_semibold mb-2">
              Contraseña
            </Text>
            <View className="relative mb-6">
              <TextInput
                className="bg-[#004D56] text-white text-sm p-4 rounded-[10px] border-[#7CBA47] border-2"
                style={{ fontFamily: FONTS.REGULAR }}
                placeholder="••••••••••"
                placeholderTextColor="#A9A9A9"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="absolute top-4 right-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="#7CBA47"
                />
              </TouchableOpacity>
            </View>
            <Text className="text-[#7CBA47] text-sm font-poppins_semibold mb-2">
              Repetir Contraseña
            </Text>
            <View className="relative mb-6">
              <TextInput
                className="bg-[#004D56] text-white text-sm p-4 rounded-[10px] border-[#7CBA47] border-2"
                style={{ fontFamily: FONTS.REGULAR }}
                placeholder="••••••••••"
                placeholderTextColor="#A9A9A9"
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  setFormData({ ...formData, confirmPassword: text })
                }
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                className="absolute top-4 right-4"
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

      <View className="h-fit mx-5">
        <Toast
          message={toastMessage}
          visible={showToast}
          onHide={() => setShowToast(false)}
        />
      </View>

      <View className="p-5">
        <TouchableOpacity
          className="bg-[#7CBA47] p-4 rounded-[10px] items-center mb-5"
          onPress={handleSignup}
        >
          <Text className="text-white text-sm font-poppins_semibold">
            Registrarse
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center"
          onPress={() =>
            router.push({
              pathname: "/",
              params: { transition: "fade" },
            })
          }
        >
          <Text className="text-[#7CBA47] text-sm font-poppins_semibold">
            Volver
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
});
