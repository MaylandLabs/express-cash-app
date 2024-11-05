import { Link } from "expo-router";
import { View, Text } from "react-native";
import { Stack } from "expo-router";

const Notifications = () => {
    return (
        <View className="flex-1 items-center justify-center bg-slate-900">
            <Stack.Screen options={{ headerStyle: { backgroundColor: '#055B72' }, headerTintColor: 'white' }} />
            <Link className="text-4xl text-white pb-6" href={'/'}>Home</Link>
            <Text className="text-4xl text-white">Notifications</Text>
        </View>
    );
};

export default Notifications;