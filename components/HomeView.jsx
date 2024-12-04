import { StyleSheet, Text, View, Image, Button, FlatList, TextInput, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { Stack } from 'expo-router';
import { styled } from 'nativewind';

const StyledPressable = styled(Pressable);

const HomeView = () => {

    return(
    
     <View className="flex-1 pt-16 px-4 bg-[#055B72]">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-row items-center gap-2">
        <View className="w-10 h-10 bg-[#044454] rounded-full">
        </View>
        <Text className="text-xl text-white">Hola, Felix</Text>
      </View>
      <View className="flex-1 mt-8 px-4 justify-between max-h-[312px] py-4 boder border-white rounded-lg">
        <View>
        <Text className="text-xs text-white">Pedi tu prestamo de hasta</Text>
        <Text className="text-5xl text-white mt-4">$300.000</Text>
        </View>
        <StyledPressable className={`p-4 rounded-lg active:opacity-60 bg-[#79C72B]`}>
          <Text className="text-center font-semibold text-sm text-[#055B72]">Pedi un prestamo</Text>
        </StyledPressable>

      </View>
     </View>    
    )
}



export default HomeView