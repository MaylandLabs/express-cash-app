import React, { useState } from "react";
import { Text, View, Image, Pressable, TextInput, Animated, StyleSheet, Alert } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import * as ImagePicker from 'expo-image-picker';


const StyledPressable = styled(Pressable);

const EditProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("Félix Bilbao");
  const [email, setEmail] = useState("felixbilbao01@gmail.com");
  const [phone, setPhone] = useState("123-456-789");
  const [address, setAddress] = useState("Calle Ficticia 123");
  const [image, setImage] = useState(require("../assets/favicon.png"));
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);

  const editProfileAnimatedScale = React.useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

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

  const onLayoutRootView = async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  };

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient 
      colors={["#006B7A", "#004C5E"]} 
      style={styles.container} 
      onLayout={onLayoutRootView}
    >
      <View style={styles.content}>
        <Text style={[styles.header, { fontFamily: 'Poppins_600SemiBold' }]}>
          Editar perfil
        </Text>  
        
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImageWrapper}>
            <Image
                source={image}
                style={styles.profileImage}
                resizeMode="cover"
                defaultSource={require("../assets/favicon.png")}
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
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
              placeholder="Correo electrónico"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
              placeholder="Teléfono"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
              placeholder="Dirección"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={address}
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
              style={styles.actionButton}
              onPressIn={() => handlePressIn(editProfileAnimatedScale)}
              onPressOut={() => handlePressOut(editProfileAnimatedScale)}
              onPress={() => setEmailModalVisible(true)}
            >
              <Text style={[styles.actionButtonText, { fontFamily: 'Poppins_400Regular' }]}>
                Cambiar correo electrónico
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
