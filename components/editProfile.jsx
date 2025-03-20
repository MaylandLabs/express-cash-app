import { useState, useEffect, useRef } from "react";
import { Text, View, Image, Pressable, TextInput, Animated, StyleSheet, Alert } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { images } from "../theme";
import { FONTS } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch } from "../store";
import { getUserAsync } from "../store/actions/auth";
const StyledPressable = styled(Pressable);


const EditProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("Félix Bilbao");
  const [email, setEmail] = useState("felixbilbao01@gmail.com");
  const [phone, setPhone] = useState("123-456-789");
  const [address, setAddress] = useState("Calle Ficticia 123");
  const [image, setImage] = useState(images.logo);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useAppDispatch();
  const editProfileAnimatedScale = useRef(new Animated.Value(1)).current;
  const handlePressIn = (animatedValue) => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4
    }).start();
  };

  const handlePressOut = (animatedValue) => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4
    }).start();
  };

  useEffect(() => {
    dispatch(getUserAsync()).then((response) => {
      setUser(response.payload);
    });
  }, []);

  console.log("user", user)

  const handleChangeImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permiso requerido", "Se necesita permiso para acceder a la galería.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setImage({ uri: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar la imagen. Por favor, intente nuevamente.");
    }
  };

  const handleSaveChanges = () => {
    Alert.alert("Cambios guardados exitosamente.");
  };

  const handleBack = () => {
    router.back();
  };

  const insets = useSafeAreaInsets();

  return (
    <LinearGradient 
      colors={["#055B72", "#004C5E"]} 
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1"

    >

      <View style={styles.content}>
      <View className="flex-row items-center justify-between mt-4">
      <Ionicons name="arrow-back" size={24} color="white" onPress={() => router.back()} />

        <Text className="text-white text-xl" style={{ fontFamily: FONTS.SEMIBOLD }}>
          Editar perfil
        </Text>  
        <View className="w-8"></View>
        </View>
        

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImageWrapper}>
            <Image
                source={image}
                style={styles.profileImage}
                resizeMode="cover"
                defaultSource={images.logo}
              />
            </View>
            <StyledPressable
              style={styles.changeImageButton}
              onPressIn={() => handlePressIn(editProfileAnimatedScale)}
              onPressOut={() => handlePressOut(editProfileAnimatedScale)}
              onPress={handleChangeImage}
            >
              <Text style={[styles.changeImageButtonText, { fontFamily: 'Poppins_400Regular' }]}>
                Cambiar imagen
              </Text>
            </StyledPressable>
          </View>
          
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
              placeholder="Nombre y Apellido"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={user ? user.user.first_name : "Félix Bilbao"}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
              placeholder="Correo electrónico"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={user ? user.user.email : "felixbilbao01@gmail.com"}
              onChangeText={setEmail}
            />
            <TextInput
              style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
              placeholder="Teléfono"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={user ? user.user.phone : "123-456-789"}
              onChangeText={setPhone}
            />
            <TextInput
              style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
              placeholder="Dirección"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={user ? user.user.address : "Calle Ficticia 123"}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.actionsContainer}>
            <StyledPressable
              style={styles.actionButton}
              onPressIn={() => handlePressIn(editProfileAnimatedScale)}
              onPressOut={() => handlePressOut(editProfileAnimatedScale)}
              onPress={() => setPasswordModalVisible(true)}
            >
              <Text style={[styles.actionButtonText, { fontFamily: 'Poppins_400Regular' }]}>
                Cambiar contraseña
              </Text>
            </StyledPressable>

            <StyledPressable
              style={styles.saveButton}
              onPressIn={() => handlePressIn(editProfileAnimatedScale)}
              onPressOut={() => handlePressOut(editProfileAnimatedScale)}
              onPress={handleSaveChanges}
            >
              <Text style={[styles.saveButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>
                Guardar
              </Text>
            </StyledPressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  profileSection: {
    flex: 1,
    alignItems: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  changeImageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changeImageButtonText: {
    color: '#79C72B',
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    color: 'white',
    fontSize: 16,
  },
  actionsContainer: {
    width: '100%',
    gap: 12,
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#79C72B',
    fontSize: 16,
    textAlign: 'center',
  },
  saveButton: {
    paddingVertical: 12,
    backgroundColor: '#79C72B',
    borderRadius: 12,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EditProfile;
