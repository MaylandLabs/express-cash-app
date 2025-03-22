import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  Animated,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FONTS } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch } from "../store";
import { getUserAsync, updateUserDataAsync } from "../store/actions/auth";
import Toast from "./Toast";
import { useSelector } from "react-redux";
const StyledPressable = styled(Pressable);

const EditProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [cuil, setCuil] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [userId, setUserId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const user = useSelector((state) => state.auth.user);
  const insets = useSafeAreaInsets();
  const editProfileAnimatedScale = useRef(new Animated.Value(1)).current;
  const handlePressIn = (animatedValue) => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = (animatedValue) => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };
  useEffect(() => {
    // Si ya hay un usuario lo setea en el local
    if (user) {
      setName(user.first_name);
      setLastName(user.last_name);
      setBirthday(user.birthday);
      setCuil(user.cuil);
      setPhone(user.phone);
      setZipcode(user.zipcode);
      setUserId(user.id);
    }
    // Si no hay usuario va intentar con el get
    else {
      dispatch(getUserAsync())
        .unwrap()
        .then((response) => {
          setName(response.user.first_name);
          setLastName(response.user.last_name);
          setBirthday(response.user.birthday);
          setCuil(response.user.cuil);
          setPhone(response.user.phone);
          setZipcode(response.user.zipcode);
          setUserId(response.user.id);
        })
        .catch((error) => {
          console.error("Error al obtener el usuario:", error);
        });
    }
  }, [user, dispatch]);

  const validateInput = () => {
    if (!name || !lastName || !phone) {
      setToastMessage("Todos los campos son obligatorios");
      setToastType("error");
      setShowToast(true);
      return false;
    }

    const phoneRegex = /^(?:\+?54\s?)?(?:[-\s]?\d){10,}$/;
    const cleanPhone = phone.replace(/[-+\s]/g, "");
    if (!phoneRegex.test(phone) || cleanPhone.length < 10) {
      setToastMessage("El teléfono debe tener al menos 10 dígitos");
      setToastType("error");
      setShowToast(true);
      return false;
    }

    const cuilRegex = /^(\d{2}[-\s.]?\d{8}[-\s.]?\d{1})$/;
    if (cuil && !cuilRegex.test(cuil.replace(/[-.\s]/g, ""))) {
      setToastMessage("El CUIL debe tener el formato XX-XXXXXXXX-X");
      setToastType("error");
      setShowToast(true);
      return false;
    }

    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    if (birthday && !dateRegex.test(birthday)) {
      setToastMessage("La fecha de nacimiento debe ser en formato yyyy/mm/dd");
      setToastType("error");
      setShowToast(true);
      return false;
    }
    if (birthday) {
      const date = birthday.split("/");
      const year = parseInt(date[0], 10);
      const month = parseInt(date[1], 10);
      const day = parseInt(date[2], 10);
      if (
        year > new Date().getFullYear() ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
      ) {
        setToastMessage("La fecha de nacimiento no es válida");
        setToastType("error");
        setShowToast(true);
        return false;
      }
      if (
        (month === 4 || month === 6 || month === 9 || month === 11) &&
        day > 30
      ) {
        setToastMessage("El mes seleccionado no tiene 31 días");
        setToastType("error");
        setShowToast(true);
        return false;
      }
      if (month === 2) {
        const isLeapYear =
          (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        if (day > 29 || (day === 29 && !isLeapYear)) {
          setToastMessage("Febrero no tiene 29 días en este año");
          setToastType("error");
          setShowToast(true);
          return false;
        }
      }
    }
    if (zipcode && zipcode.length < 4) {
      setToastMessage("El código postal debe tener al menos 4 dígitos");
      setToastType("error");
      setShowToast(true);
      return false;
    }

    return true;
  };

  const handleSaveChanges = () => {
    console.log("validateInput", validateInput());
    if (!validateInput()) return;
    dispatch(
      updateUserDataAsync({
        data: {
          id: userId,
          first_name: name,
          last_name: lastName,
          phone: phone,
          birthday: birthday,
          cuil: cuil,
          zipcode: zipcode,
        },
        setActive: setIsLoading,
        setError: setToastMessage,
        dispatch,
      })
    ).then((response) => {
      console.log("response", response);
      setToastMessage("Cambios guardados exitosamente.");
      setToastType("success");
      setShowToast(true);
    });
  };

  return (
    <LinearGradient
      colors={["#055B72", "#004C5E"]}
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1"
    >
      <View className="flex-1 flex-col px-5 pt-8">
        <View className="flex-row items-center justify-between mb-12">
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => router.back()}
          />

          <Text
            className="text-white text-xl"
            style={{ fontFamily: FONTS.SEMIBOLD }}
          >
            Editar perfil
          </Text>
          <View className="w-8"></View>
        </View>

        <View className="flex-1 items-center justify-between">
          <ScrollView className="w-full mb-8">
            <TextInput
              className="w-full bg-white/10 rounded-[12px] p-4 mb-4 text-white text-base"
              style={{ fontFamily: "Poppins_400Regular" }}
              placeholder="Nombre"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              className="w-full bg-white/10 rounded-[12px] p-4 mb-4 text-white text-base"
              style={{ fontFamily: "Poppins_400Regular" }}
              placeholder="Apellido"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={lastName}
              onChangeText={setLastName}
            />

            <TextInput
              className="w-full bg-white/10 rounded-[12px] p-4 mb-4 text-white text-base"
              style={{ fontFamily: "Poppins_400Regular" }}
              placeholder="Fecha de nacimiento"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={birthday}
              onChangeText={setBirthday}
            />
            <TextInput
              className="w-full bg-white/10 rounded-[12px] p-4 mb-4 text-white text-base"
              style={{ fontFamily: "Poppins_400Regular" }}
              placeholder="CUIL"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={cuil}
              onChangeText={setCuil}
            />
            <TextInput
              className="w-full bg-white/10 rounded-[12px] p-4 mb-4 text-white text-base"
              style={{ fontFamily: "Poppins_400Regular" }}
              placeholder="Teléfono"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              className="w-full bg-white/10 rounded-[12px] p-4 mb-4 text-white text-base"
              style={{ fontFamily: "Poppins_400Regular" }}
              placeholder="Código postal"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={zipcode}
              onChangeText={setZipcode}
            />
          </ScrollView>

          <View className="w-full mb-8">
            <View className="w-full ">
              <Toast
                message={toastMessage}
                visible={showToast}
                onHide={() => setShowToast(false)}
                type={toastType}
              />
            </View>
            <StyledPressable
              className="py-3 rounded-[12px] w-full"
              onPressIn={() => handlePressIn(editProfileAnimatedScale)}
              onPressOut={() => handlePressOut(editProfileAnimatedScale)}
              onPress={() => router.push("/(auth)/passwordRecovery")}
            >
              <Text
                className="text-[#79C72B] text-base text-center"
                style={{ fontFamily: "Poppins_400Regular" }}
              >
                Cambiar contraseña
              </Text>
            </StyledPressable>
            <StyledPressable
              className="py-3 bg-[#79C72B] rounded-[12px] mt-5 w-full"
              onPressIn={() => handlePressIn(editProfileAnimatedScale)}
              onPressOut={() => handlePressOut(editProfileAnimatedScale)}
              onPress={handleSaveChanges}
            >
              <Text
                className="text-white text-base text-center"
                style={{ fontFamily: "Poppins_600SemiBold" }}
              >
                Guardar
              </Text>
            </StyledPressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default EditProfile;
