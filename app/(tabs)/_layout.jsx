import { Tabs } from "expo-router";
import { View } from "react-native";
import { Home, Bell, Menu, Plus } from "lucide-react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerTransparent: true,
        tabBarStyle: {
          backgroundColor: "#3E999F",
          position: "absolute",
          bottom: 30,
          width: 380,
          left: 20,
          right: 40,
          marginHorizontal: 20,
          borderRadius: 40,
          height: 80,
          paddingBottom: 0,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          padding: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                marginTop: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Home
                size={34}
                color={focused ? "#79C72B" : "white"}
                strokeWidth={2}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                marginTop: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bell
                size={34}
                color={focused ? "#79C72B" : "white"}
                strokeWidth={2}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                marginTop: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Menu
                size={34}
                color={focused ? "#79C72B" : "white"}
                strokeWidth={2}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="loan"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" }, // Oculta la barra inferior en esta pantalla
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: "#79C72B",
                width: 66,
                height: 66,
                marginTop: 30,
                borderRadius: 43,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Plus size={24} color="white" strokeWidth={2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
