import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const LoansScreen = () => {
   const router = useRouter();

  return (
    <LinearGradient colors={["#006B7A", "#004C5E"]} style={{ flex: 1 }}>
      <View className="flex-1 p-6">
      <Pressable onPress={() => router.push("/(tabs)/")} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
        <Text className="text-white text-xl font-semibold mb-6">Mis préstamos</Text>
        
        {/* Loan Card */}
        <View className="bg-[#006B7A] p-4 rounded-2xl mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-white text-2xl font-bold">$ 75.000</Text>
            <View className="flex-row items-center">
              <Text className="text-white/80 mr-2">Al día</Text>
              <Text className="text-yellow-400 text-2xl">😊</Text>
            </View>
          </View>
          
          <Text className="text-white/60 text-sm mb-4">19 junio 2023</Text>
          
          <Text className="text-white/80 text-sm mb-2">Cuotas pagadas</Text>
          <View className="flex-row gap-1">
                {[...Array(10)].map((_, i) => (
                  <View 
                    key={i}
                    className={`flex-1 h-1.5 rounded-full ${i < 8 ? 'bg-[#79C72B]' : 'bg-white/20'}`}
                  />
                ))}
              </View>
          <Text className="text-white/60 text-sm">9/19</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginRight: 15,
  },
}
)

export default LoansScreen;