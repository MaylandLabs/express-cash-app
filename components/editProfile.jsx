import React, { useState } from "react";
import { Text, View, Image, Pressable, TextInput, Animated, StyleSheet } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={["#006B7A", "#004C5E"]} style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.content}>
        <Text style={[styles.header, { fontFamily: 'Poppins_600SemiBold' }]}>Editar perfil</Text>  
        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={image}
              style={styles.profileImage}
              resizeMode="contain"
            />
            <StyledPressable
              style={styles.changeImageButton}
              onPressIn={() => handlePressIn(editProfileAnimatedScale)}
              onPressOut={() => handlePressOut(editProfileAnimatedScale)}
            >
              <Text style={[styles.changeImageButtonText, { fontFamily: 'Poppins_400Regular' }]}>Cambiar imagen</Text>
            </StyledPressable>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Nombre y Apellido"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={address}
            onChangeText={setAddress}
          />

          <StyledPressable
            style={styles.changePasswordButton}
            onPressIn={() => handlePressIn(editProfileAnimatedScale)}
            onPressOut={() => handlePressOut(editProfileAnimatedScale)}
            onPress={() => setPasswordModalVisible(true)}
          >
            <Text style={[styles.buttonText, { fontFamily: 'Poppins_400Regular' }]}>Cambiar contraseña</Text>
          </StyledPressable>

          <StyledPressable
            style={styles.changeEmailButton}
            onPressIn={() => handlePressIn(editProfileAnimatedScale)}
            onPressOut={() => handlePressOut(editProfileAnimatedScale)}
            onPress={() => setEmailModalVisible(true)}
          >
            <Text style={[styles.buttonText, { fontFamily: 'Poppins_400Regular' }]}>Cambiar correo electrónico</Text>
          </StyledPressable>
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
    padding: 24,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 16,
  },
  profileImageWrapper: {
    backgroundColor: '#007A7C',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeImageButton: {
    backgroundColor: '#79C72B',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 8,
  },
  changeImageButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  changePasswordButton: {
    backgroundColor: '#79C72B',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 12,
  },
  changeEmailButton: {
    backgroundColor: '#79C72B',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});

export default EditProfile;
