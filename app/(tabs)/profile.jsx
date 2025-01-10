import React from "react";
import { Text, View, Image, Pressable, Switch, Animated, StyleSheet } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { Wallet, HelpCircle, Bell, Settings, DoorClosed, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

const StyledPressable = styled(Pressable);

const Profile = () => {
  const router = useRouter();
  const [isPushEnabled, setIsPushEnabled] = React.useState(false);

  // Definir las animaciones para cada botón
  const editProfileAnimatedScale = React.useRef(new Animated.Value(1)).current;
  const loansAnimatedScale = React.useRef(new Animated.Value(1)).current;
  const supportAnimatedScale = React.useRef(new Animated.Value(1)).current;
  const settingsAnimatedScale = React.useRef(new Animated.Value(1)).current;
  const logoutAnimatedScale = React.useRef(new Animated.Value(1)).current;

  // Cargar las fuentes
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const toggleSwitch = () => setIsPushEnabled((previousState) => !previousState);

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

  // Esperar que las fuentes se carguen antes de mostrar la interfaz
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={["#006B7A", "#004C5E"]} style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={[styles.header, { fontFamily: 'Poppins_600SemiBold' }]}>Mi perfil</Text>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={require("../../assets/favicon.png")}
              style={styles.profileImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.profileName, { fontFamily: 'Poppins_600SemiBold' }]}>Félix Bilbao</Text>
          <Text style={[styles.profileEmail, { fontFamily: 'Poppins_400Regular' }]}>felixbilbao01@gmail.com</Text>

          {/* Botón "Editar perfil" con animación de hover */}
          <Animated.View style={{ transform: [{ scale: editProfileAnimatedScale }] }}>
            <StyledPressable
              style={styles.editProfileButton}
              onPressIn={() => handlePressIn(editProfileAnimatedScale)}
              onPressOut={() => handlePressOut(editProfileAnimatedScale)}
            >
              <Text style={[styles.editProfileButtonText, { fontFamily: 'Poppins_400Regular' }]}>Editar perfil</Text>
            </StyledPressable>
          </Animated.View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_600SemiBold' }]}>Mi cuenta</Text>
          <View style={styles.card}>
            <Animated.View style={{ transform: [{ scale: loansAnimatedScale }] }}>
              <StyledPressable
                style={styles.cardItem}
                onPress={() => router.push('/MyLoans')}
                onPressIn={() => handlePressIn(loansAnimatedScale)}
                onPressOut={() => handlePressOut(loansAnimatedScale)}
              >
                <View style={styles.cardItemContent}>
                  <Wallet size={24} color="white" />
                  <Text style={[styles.cardItemText, { fontFamily: 'Poppins_400Regular' }]}>Mis préstamos</Text>
                  <ArrowRight size={24} color="white" />
                </View>
              </StyledPressable>
            </Animated.View>

            <View style={styles.divider}></View>

            <Animated.View style={{ transform: [{ scale: supportAnimatedScale }] }}>
              <StyledPressable
                style={styles.cardItem}
                onPressIn={() => handlePressIn(supportAnimatedScale)}
                onPressOut={() => handlePressOut(supportAnimatedScale)}
              >
                <View style={styles.cardItemContent}>
                  <HelpCircle size={24} color="white" />
                  <Text style={[styles.cardItemText, { fontFamily: 'Poppins_400Regular' }]}>Soporte</Text>
                  <ArrowRight size={24} color="white" />
                </View>
              </StyledPressable>
            </Animated.View>
          </View>
        </View>

        {/* Preferences Section */}
        <View>
          <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_600SemiBold' }]}>Preferencias</Text>
          <View style={styles.card}>
            <View style={styles.cardItem}>
              <Bell size={24} color="white" />
              <Text style={[styles.cardItemText, { fontFamily: 'Poppins_400Regular' }]}>Notificaciones push</Text>
              <Switch
                value={isPushEnabled}
                onValueChange={toggleSwitch}
                trackColor={{ false: "#767577", true: "#79C72B" }}
                thumbColor={isPushEnabled ? "#ffffff" : "#f4f3f4"}
              />
            </View>
            <View style={styles.divider}></View>

            <Animated.View style={{ transform: [{ scale: settingsAnimatedScale }] }}>
              <StyledPressable
                style={styles.cardItem}
                onPressIn={() => handlePressIn(settingsAnimatedScale)}
                onPressOut={() => handlePressOut(settingsAnimatedScale)}
              >
                <View style={styles.cardItemContent}>
                  <Settings size={24} color="white" />
                  <Text style={[styles.cardItemText, { fontFamily: 'Poppins_400Regular' }]}>Configuración</Text>
                  <ArrowRight size={24} color="white" />
                </View>
              </StyledPressable>
            </Animated.View>

            <View style={styles.divider}></View>

            <Animated.View style={{ transform: [{ scale: logoutAnimatedScale }] }}>
              <StyledPressable
                style={styles.cardItem}
                onPress={() => router.push('/(auth)/')}
                onPressIn={() => handlePressIn(logoutAnimatedScale)}
                onPressOut={() => handlePressOut(logoutAnimatedScale)}
              >
                <View style={styles.cardItemContent}>
                  <DoorClosed size={24} color="salmon" />
                  <Text style={[styles.cardItemText, { fontFamily: 'Poppins_400Regular' }]}>Cerrar sesión</Text>
                </View>
              </StyledPressable>
            </Animated.View>
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
    padding: 24,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 16,
  },
  profileImageWrapper: {
    backgroundColor: '#007A7C',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 64,
    height: 64,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  profileEmail: {
    color: 'white',
    opacity: 0.8,
    fontSize: 14,
    marginBottom: 16,
    fontFamily: 'Poppins',
  },
  editProfileButton: {
    backgroundColor: '#79C72B',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins', 
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    color: 'white',
    opacity: 0.6,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  card: {
    backgroundColor: '#006B7A',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderRadius: 12,
  },
  cardItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardItemText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 16,
    fontFamily: 'Poppins', 
  },
  divider: {
    height: 1,
    backgroundColor: 'white',
    opacity: 0.3,
    marginVertical: 12,
  },
});

export default Profile;
