import { Tabs } from "expo-router";
import { Text } from "react-native";

const TabsLayout = () => {
    return (  
        <Tabs 
            screenOptions={{
                headerTransparent: true,
                tabBarStyle: { backgroundColor: "#055B72", marginBottom: 10, borderTopWidth: 0 },
            }}
        >
            {/* Pantalla de inicio */}
            <Tabs.Screen name="index" options={{ headerShown: false }} />
            
            {/* Pantalla de préstamos */}
            <Tabs.Screen name="loan" options={{ headerShown: false }} />
            
            {/* Pantalla de perfil */}
            <Tabs.Screen name="profile" options={{ headerShown: false }} />
            
            {/* Pantalla de notificaciones */}
            <Tabs.Screen name="notifications" options={{ headerShown: false }} />
        </Tabs>
    );
}

export default TabsLayout;
