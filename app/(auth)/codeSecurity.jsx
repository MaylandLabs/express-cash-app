import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch } from "../../store";
import { verifyCodeAsync, forgetPasswordCode } from "../../store/actions/auth";
import { getItem } from "../../utils/storage";

export default function CodeSecurityScreen({ verificationCode, setVerificationCode, type = "verification", setIsNewPasswordStep }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const inputsRef = useRef([]);
  const dispatch = useAppDispatch();
  const [verificationCodeRegister, setVerificationCodeRegister] = useState(["", "", "", "", ""]);

  // Asegúrate de que verificationCode siempre tenga un valor válido
  const code = verificationCode || verificationCodeRegister;
  const setCode = setVerificationCode || setVerificationCodeRegister;

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;

    setCode(newCode);

    if (text.length === 1 && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join("");

    console.log(fullCode)
    if (fullCode.length === 5) {
      setIsLoading(true);
      setErrorMessage("");
      setShowToast(false);

      try {
        if (type === "passwordRecovery") {
          dispatch(forgetPasswordCode({ 
            code: fullCode,
            setActive: setIsLoading,
            setError: (errorMsg) => {
              setErrorMessage(errorMsg);
              setShowToast(true);
            },
            setIsSubmitting: setIsLoading,
            routerNext: () => setIsNewPasswordStep(true)
          }))
          .unwrap()
          .then(() => {
            console.log("Código verificado exitosamente en recuperar contraseña");
            setIsNewPasswordStep(true);
          })
          .catch((error) => {
            console.log("error", error);
            setErrorMessage("Error al verificar el código en recuperar contraseña");
            setShowToast(true);
          });
        } else {
          let result = await dispatch(verifyCodeAsync({ code: fullCode })).unwrap();
          console.log("result", result);

          if (result.ok) {
            router.push("/(auth)/success");
          } else {
            setErrorMessage(result.message || "Código inválido");
            setShowToast(true);
          }
        }
      } catch (error) {
        setErrorMessage(error.message || "Error al verificar el código");
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrorMessage("El código debe tener 5 dígitos");
      setShowToast(true);
    }
  };

  return (
    <LinearGradient colors={["#055B72", "#004C5E"]} className="flex-1">
      <View className="flex-1 px-5 pt-16 justify-between">
        <View className="flex-1 gap-8">
          <View className="">
            <Text className="text-white text-2xl text-center mb-2 font-semibold">
              Código Confirmación
            </Text>
            <Text
              className="text-white text-base text-center opacity-80 mb-7"
              style={{ fontFamily: "Poppins_400Regular" }}
            >
              Ingresa el código que enviamos a tu email para verificar tu
              cuenta.
            </Text>
          </View>

          <View className="flex-row justify-between mt-5">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 border-b-2 border-[#7CBA47] text-white text-2xl text-center"
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                keyboardType="numeric"
                maxLength={1}
                autoFocus={index === 0}
              />
            ))}
          </View>
        </View>

        <View className="py-5">
          <TouchableOpacity
            className="bg-[#7CBA47] py-3 rounded-[10px] w-full items-center mt-8 mb-5"
            onPress={handleVerifyCode}
          >
            <Text className="text-[#055B72] text-base font-semibold">
              Verificar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => router.back()}
          >
            <Text className="text-[#7CBA47] text-base font-semibold">
              Volver
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}