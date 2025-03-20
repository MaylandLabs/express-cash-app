import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import Toast from "../../components/Toast";
import RenderVerificationCode from "./codeSecurity";
import { useAppDispatch } from "../../store";
import { forgetPassword } from "../../store/actions/auth";
import VerifyEmail from "./verifyEmail";
import { setItem, getItem } from "../../utils/storage"; 
import { setPassword } from "../../store/actions/auth";

export default function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [isNewPasswordStep, setIsNewPasswordStep] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
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
    if (!email) {
      Alert.alert("Error", "Por favor ingresa un email");
      return;
    }

    dispatch(forgetPassword({ 
      data: { email },
      setActive: setIsLoading,
      setError: (errorMsg) => {
        setError(errorMsg);
        Alert.alert("Error", errorMsg);
      },
      dispatch: dispatch
    }))
      .unwrap()
      .then(() => {
        Alert.alert("Éxito", "Se ha enviado el código de verificación a tu email");
        setIsVerificationStep(true);
      })
      .catch((error) => {
        console.log("Error en la petición:", error);
      });
  };

  const handleContinue = async () => {
    if (!isVerificationStep) {
      if (isValidEmail(email)) {
        await setItem('recovery_email', email);
        sendVerificationCode();
      } else {
        setToastMessage("Por favor ingresa un email válido");
        setShowToast(true);
      }
    } else if (isVerificationStep && !isNewPasswordStep) {
      const fullCode = verificationCode.join("");
      handleVerifyCode();
    } else {
      if (!isValidPassword(newPassword)) {
        setToastMessage("La contraseña debe tener al menos 6 caracteres");
        setShowToast(true);
        return;
      }
      if (newPassword !== confirmPassword) {
        setToastMessage("Las contraseñas no coinciden");
        setShowToast(true);
        return;
      }
      dispatch(setPassword({ 
        data: {
          code: verificationCode.join(''),
          password: newPassword,
          confirmPassword: confirmPassword
        },
        setActive: setIsLoading,
        setError: (errorMsg) => {
          setError(errorMsg);
          Alert.alert("Error", errorMsg);
        },
        dispatch: dispatch
      }))
      .unwrap()
      .then(() => {
        Alert.alert("Éxito", "Contraseña actualizada correctamente");
        router.push("/(auth)/loginForm");
      })
      .catch((error) => {
        console.log("Error al cambiar la contraseña:", error);
      });
    }
  };

  const renderNewPassword = () => (
    <View style={styles.formContainer}>
      <Text style={[styles.title, { fontFamily: "Poppins_600SemiBold" }]}>
        Nueva Contraseña
      </Text>
      <Text style={[styles.subtitle, { fontFamily: "Poppins_400Regular" }]}>
        Ingresa una contraseña nueva para ingresar nuevamente a su cuenta.
      </Text>

      <Text style={[styles.label, { fontFamily: "Poppins_400Regular" }]}>
        Contraseña
      </Text>
      <TextInput
        style={[styles.input, { fontFamily: "Poppins_400Regular" }]}
        placeholder="Ingresa tu nueva contraseña"
        placeholderTextColor="#A9A9A9"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <Text style={[styles.label, { fontFamily: "Poppins_400Regular" }]}>
        Repetir contraseña
      </Text>
      <TextInput
        style={[styles.input, { fontFamily: "Poppins_400Regular" }]}
        placeholder="Repite tu nueva contraseña"
        placeholderTextColor="#A9A9A9"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
    </View>
  );

  console.log('Estado actual:', {
    isNewPasswordStep,
    isVerificationStep,
    email,
    verificationCode: verificationCode.join('')
  });

  return (
    <LinearGradient colors={["#055B72", "#004C5E"]} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContainer}
      >
        {isNewPasswordStep ? (
          <>
            {renderNewPassword()}
            <View style={styles.buttonContainer}>
              <Toast
                message={toastMessage}
                visible={showToast}
                onHide={() => setShowToast(false)}
              />
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
                disabled={isLoading}
              >
                <Text style={[styles.continueButtonText]}>
                  {isLoading ? "Procesando..." : "Continuar"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setIsNewPasswordStep(false)}
              >
                <Text style={[styles.backButtonText, { fontFamily: "Poppins_600SemiBold" }]}>
                  Volver
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : isVerificationStep ? (
          <RenderVerificationCode
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            type="passwordRecovery"
            setIsNewPasswordStep={setIsNewPasswordStep}
          />
        ) : (
          <>
            <VerifyEmail email={email} setEmail={setEmail} />
            <View style={styles.buttonContainer}>
              <Toast
                message={toastMessage}
                visible={showToast}
                onHide={() => setShowToast(false)}
              />
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={[styles.continueButtonText]}>Continuar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Text
                  style={[
                    styles.backButtonText,
                    { fontFamily: "Poppins_600SemiBold" },
                  ]}
                >
                  Volver
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  formContainer: {
    padding: 20,
    paddingTop: 60,
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins_600SemiBold",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 30,
    opacity: 0.8,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#00C853",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#004D56",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 60,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
    borderColor: "#7CBA47",
    borderWidth: 1,
  },
  continueButton: {
    backgroundColor: "#7CBA47",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  continueButtonText: {
    color: "#055B72",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  backButton: {
    alignItems: "center",
  },
  backButtonText: {
    color: "#7CBA47",
    fontSize: 16,
    fontWeight: "bold",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderColor: "#7CBA47",
    color: "#FFFFFF",
    fontSize: 24,
    textAlign: "center",
  },
});

// brunodistaulo03@gmail.com