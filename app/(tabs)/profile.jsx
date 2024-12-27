import React from "react";
import { Text, View, Image, Pressable, Switch } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { Wallet } from 'lucide-react-native';
import { HelpCircle } from 'lucide-react-native';
import { Bell } from 'lucide-react-native';
import { Settings } from 'lucide-react-native';
import { DoorClosed } from 'lucide-react-native';
import { ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router'; // Usamos useRouter desde expo-router

const StyledPressable = styled(Pressable);

const Profile = () => {
  const router = useRouter(); // Usamos useRouter para navegar en expo-router
  const [isPushEnabled, setIsPushEnabled] = React.useState(false);

  const toggleSwitch = () => setIsPushEnabled((previousState) => !previousState);

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
          <StyledPressable className="bg-[#79C72B] py-2 px-8 rounded-lg">
            <Text className="text-white text-sm font-semibold">
              Editar perfil
            </Text>
          </StyledPressable>
        </View>

        {/* Account Section */}
        <View className="mt-6">
          <Text className="text-white/60 text-sm font-semibold mb-2">
            Mi cuenta
          </Text>
          <View className="bg-[#006B7A] p-4 rounded-2xl mb-6">
            <StyledPressable 
              className="flex-row items-center justify-between mb-6"
              onPress={() => router.push('../components/LoansScreen')}  // Ruta relativa al archivo de LoansScreen
            >
              <Wallet size={24} color="white"/>
              <Text className="text-white text-sm ml-[-150px]">Mis préstamos</Text>
              <ArrowRight size={24} color="white" />
            </StyledPressable>

            <View className="h-[1px] bg-white/30 mb-6"></View>
            <View className="flex-row items-center justify-between">
              <HelpCircle size={24} color="white" />
              <Text className="text-white text-sm ml-[-190px]">Soporte</Text>
              <ArrowRight size={24} color="white" />
            </View>
          </View>
        </View>

        {/* Preferences Section */}
        <View>
          <Text className="text-white/60 text-sm font-semibold mb-2">
            Preferencias
          </Text>
          <View className="bg-[#006B7A] p-4 rounded-2xl">
            <View className="flex-row items-center justify-between mb-2">
              <Bell size={24} color="white" />
              <Text className="text-white text-sm ml-[-70px]">Notificaciones push</Text>
              <Switch
                value={isPushEnabled}
                onValueChange={toggleSwitch}
                trackColor={{ false: "#767577", true: "#79C72B" }}
                thumbColor={isPushEnabled ? "#ffffff" : "#f4f3f4"}
              />
            </View>
            <View className="h-[1px] bg-white/30 mb-4"></View>
            <View className="flex-row items-center justify-between mb-3">
              <Settings size={24} color="white" />
              <Text className="text-white text-sm ml-[-130px]">Configuración</Text>
              <ArrowRight size={24} color="white" />
            </View>
            <View className="h-[1px] bg-white/30 mt-2"></View>
            <Text className="text-white text-sm ml-[55px] top-[20px]">
              Cerrar sesión
            </Text>
            <DoorClosed size={24} color="salmon" style={{marginTop: "20px"}}/>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Profile;
