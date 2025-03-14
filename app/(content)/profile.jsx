import React from "react";
import { Text, View, Image, Pressable, Switch, Animated, StyleSheet } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { Wallet, HelpCircle, Bell, Settings, DoorClosed, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { images } from "../../theme/images";
import { FONTS } from "../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "../../store";
import { logOutAsync } from "../../store/actions/auth";

const StyledPressable = styled(Pressable);

const Profile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPushEnabled, setIsPushEnabled] = React.useState(false);


  const editProfileAnimatedScale = React.useRef(new Animated.Value(1)).current;
  const loansAnimatedScale = React.useRef(new Animated.Value(1)).current;
  const supportAnimatedScale = React.useRef(new Animated.Value(1)).current;
  const settingsAnimatedScale = React.useRef(new Animated.Value(1)).current;
  const logoutAnimatedScale = React.useRef(new Animated.Value(1)).current;


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

  const handleLogout = () => {
    dispatch(logOutAsync());
    router.push('/(auth)/');
  };

  const insets = useSafeAreaInsets();

  return (
    <LinearGradient className="flex-1" colors={["#055B72", "#004C5E"]} style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={styles.content}>
        <View className="flex-row items-center justify-between mt-4">
        <Ionicons name="arrow-back" size={24} color="white" onPress={() => router.back()} />
        <Text className="text-white text-xl" style={{ fontFamily: FONTS.SEMIBOLD }}>Mi perfil</Text>
        <View className="w-8"></View>
        </View>
  
        <View style={styles.profileSection}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={images.logo}
              style={styles.profileImage}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.profileName, { fontFamily: 'Poppins_600SemiBold' }]}>Félix Bilbao</Text>
          <Text style={[styles.profileEmail, { fontFamily: 'Poppins_400Regular' }]}>felixbilbao01@gmail.com</Text>

          
          <Animated.View style={{ transform: [{ scale: editProfileAnimatedScale }] }}>
            <StyledPressable
              style={styles.editProfileButton}
              onPressIn={() => handlePressIn(editProfileAnimatedScale)}
              onPressOut={() => handlePressOut(editProfileAnimatedScale)}
              onPress={() => router.push('/editProfile')} 
            >
              <Text style={[styles.editProfileButtonText, { fontFamily: 'Poppins_400Regular' }]}>Editar perfil</Text>
            </StyledPressable>
          </Animated.View>
        </View>

        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_600SemiBold' }]}>Mi cuenta</Text>
          <View style={styles.card}>
            <Animated.View style={{ transform: [{ scale: loansAnimatedScale }] }}>
              <StyledPressable
                style={styles.cardItem}
                onPress={() => router.push('/myLoans')}
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
                onPress={() => router.push('/suport')}
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

      
        <View>
          <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_600SemiBold' }]}>Preferencias</Text>
          <View style={styles.card}>
          <View style={styles.cardItem}>
            <View style={styles.cardItemContent}>
              <Bell size={24} color="white" />
              <Text style={styles.cardItemText}>Notificaciones push</Text>
              <View style={styles.switchContainer}>
                <Switch
                  value={isPushEnabled}
                  onValueChange={toggleSwitch}
                  trackColor={{ false: "#767577", true: "#79C72B" }}
                  thumbColor={isPushEnabled ? "#ffffff" : "#f4f3f4"}
                />
              </View>
            </View>
          </View>
            <View style={styles.divider}></View>
            <Animated.View style={{ transform: [{ scale: settingsAnimatedScale }] }}>
            <StyledPressable
              style={styles.cardItem}
              onPressIn={() => handlePressIn(settingsAnimatedScale)}
              onPressOut={() => handlePressOut(settingsAnimatedScale)}
              onPress={() => router.push('/config')}
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
                onPress={() => handleLogout()}
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
    paddingHorizontal: 24,
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
    marginTop: 15,
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
    backgroundColor: '#055B72',
    padding: 12,
    borderRadius: 16,
    marginBottom: 24,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
  },
  cardItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  cardItemText: {
    color: 'white',
    fontSize: 14,
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    fontFamily: 'Poppins',
  },
  cardItemIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: 'white',
    opacity: 0.3,
    marginVertical: 5,
  },
  switchContainer: {
    minWidth: 51,
    alignItems: 'center',
    justifyContent: 'center', 
    height: '100%', 
    left: 15
  }
});

export default Profile;
