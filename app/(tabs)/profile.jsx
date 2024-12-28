import React from "react";
import { Text, View, Image, Pressable, Switch, Animated } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { Wallet, HelpCircle, Bell, Settings, DoorClosed, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const StyledPressable = styled(Pressable);

const Profile = () => {
  const router = useRouter();
  const [isPushEnabled, setIsPushEnabled] = React.useState(false);

  // Animaciones independientes para cada botón
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

  return (
    <LinearGradient colors={["#006B7A", "#004C5E"]} style={{ flex: 1 }}>
      <View className="flex-1 pt-4 px-6">
        {/* Header */}
        <Text className="text-white text-lg font-semibold text-center">Mi perfil</Text>

        {/* Profile Section */}
        <View className="items-center mt-4">
          <View className="bg-[#007A7C] w-20 h-20 rounded-full items-center justify-center mb-2">
            <Image
              source={require("../../assets/favicon.png")}
              className="w-16 h-16"
              resizeMode="contain"
            />
          </View>
          <Text className="text-white text-xl font-semibold">Félix Bilbao</Text>
          <Text className="text-white/80 text-sm mb-4">
            felixbilbao01@gmail.com
          </Text>

          {/* Botón "Editar perfil" con animación de hover */}
          <Animated.View style={{
            transform: [{ scale: editProfileAnimatedScale }]
          }}>
            <StyledPressable
              className="bg-[#79C72B] py-2 px-8 rounded-lg"
              onPressIn={() => handlePressIn(editProfileAnimatedScale)}
              onPressOut={() => handlePressOut(editProfileAnimatedScale)}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'rgba(121, 199, 43, 0.7)' : '#79C72B', // Cambia el color al presionar
                  padding: 12,
                  borderRadius: 12,
                }
              ]}
            >
              <Text className="text-white text-sm font-semibold">
                Editar perfil
              </Text>
            </StyledPressable>
          </Animated.View>
        </View>

        {/* Account Section */}
        <View className="mt-6">
          <Text className="text-white/60 text-sm font-semibold mb-2 mt-[-10px]">
            Mi cuenta
          </Text>
          <View className="bg-[#006B7A] p-4 rounded-2xl mb-6">
            <Animated.View style={{
              transform: [{ scale: loansAnimatedScale }]
            }}>
              <StyledPressable
                className="flex-row items-center justify-between mb-3"
                onPress={() => router.push('/MyLoans')}
                onPressIn={() => handlePressIn(loansAnimatedScale)}
                onPressOut={() => handlePressOut(loansAnimatedScale)}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'rgba(121, 199, 43, 0.1)' : 'transparent',
                    padding: 12,
                    borderRadius: 12,
                  }
                ]}
              >
                <View className="flex-row items-center flex-1">
                  <Wallet size={24} color="white" />
                  <Text className="text-white text-sm ml-4 flex-1">Mis préstamos</Text>
                  <ArrowRight size={24} color="white" />
                </View>
              </StyledPressable>
            </Animated.View>

            <View className="h-[1px] bg-white/30 my-3"></View>

            <Animated.View style={{
              transform: [{ scale: supportAnimatedScale }]
            }}>
              <StyledPressable
                className="flex-row items-center justify-between mb-3"
                onPressIn={() => handlePressIn(supportAnimatedScale)}
                onPressOut={() => handlePressOut(supportAnimatedScale)}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'rgba(121, 199, 43, 0.1)' : 'transparent',
                    padding: 12,
                    borderRadius: 12,
                  }
                ]}
              >
                <View className="flex-row items-center flex-1 mt-1 mb-[-10px]">
                  <HelpCircle size={24} color="white" />
                  <Text className="text-white text-sm ml-4 flex-1">Soporte</Text>
                  <ArrowRight size={24} color="white" />
                </View>
              </StyledPressable>
            </Animated.View>
          </View>
        </View>

        {/* Preferences Section */}
        <View>
          <Text className="text-white/60 text-sm font-semibold mb-2 mt-[-10px]">
            Preferencias
          </Text>
          <View className="bg-[#006B7A] p-4 rounded-2xl">
            <View className="flex-row items-center justify-between mb-2">
              <Bell size={24} color="white" />
              <Text className="text-white text-sm ml-[-100px]">Notificaciones push</Text>
              <Switch
                value={isPushEnabled}
                onValueChange={toggleSwitch}
                trackColor={{ false: "#767577", true: "#79C72B" }}
                thumbColor={isPushEnabled ? "#ffffff" : "#f4f3f4"}
              />
            </View>
            <View className="h-[1px] bg-white/30 mb-4"></View>
            
            <Animated.View style={{
              transform: [{ scale: settingsAnimatedScale }]
            }}>
              <StyledPressable
                className="flex-row items-center justify-between mb-3"
                onPressIn={() => handlePressIn(settingsAnimatedScale)}
                onPressOut={() => handlePressOut(settingsAnimatedScale)}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'rgba(121, 199, 43, 0.1)' : 'transparent',
                    padding: 12,
                    borderRadius: 12,
                  }
                ]}
              >
                <View className="flex-row items-center flex-1">
                  <Settings size={24} color="white" />
                  <Text className="text-white text-sm ml-4 flex-1">Configuración</Text>
                  <ArrowRight size={24} color="white" />
                </View>
              </StyledPressable>
            </Animated.View>

            <View className="h-[1px] bg-white/30 mt-2 mb-4"></View>
                       <Animated.View style={{
              transform: [{ scale: logoutAnimatedScale }]}
            }>
              <StyledPressable
                className="flex-row items-center justify-between"
                onPress={() => router.push('/(auth)/')}
                onPressIn={() => handlePressIn(logoutAnimatedScale)}
                onPressOut={() => handlePressOut(logoutAnimatedScale)}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'rgba(121, 199, 43, 0.1)' : 'transparent',
                    padding: 12,
                    borderRadius: 12,
                  }
                ]}
              >
                <View className="flex-row items-center flex-1">
                  <DoorClosed size={24} color="salmon" />
                  <Text className="text-white text-sm ml-4 flex-1 mb-2 top-1">Cerrar sesión</Text>
                </View>
              </StyledPressable>
              </Animated.View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Profile;
