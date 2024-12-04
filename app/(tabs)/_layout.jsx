import { Tabs } from "expo-router"
import { Text } from "react-native"

const TabsLayout = () => {
    return (  
        <Tabs 
        screenOptions={{
            headerTransparent: true,
            tabBarStyle: { backgroundColor :"#055B72", marginBottom: 10, borderTopWidth: 0 },
        }}
        >
            <Tabs.Screen name="index" options={{ headerShown: false }} />
            <Tabs.Screen name="loan" options={{ headerShown: false }} />
            <Tabs.Screen name="profile" options={{ headerShown: false }} />
        </Tabs>
    )
}

export default TabsLayout