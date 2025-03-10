import { Tabs, useRouter } from "expo-router";
import { View, Pressable } from "react-native";
import { Home, Bell, Menu, Plus } from "lucide-react-native";
import { BlurView } from 'expo-blur';
import TabBarIcon from '../../../components/TabBarIcon';

const TabsLayout = () => {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerTransparent: true,
        tabBarBackground: () => (
          <BlurView
            intensity={20}
            tint="dark"
            className="absolute inset-0 rounded-[40px]"
          />
        ),
        tabBarStyle: {
          backgroundColor: 'rgba(62, 153, 159, 0.7)',
          position: "absolute",
          bottom: 35,
          marginHorizontal: 15,
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
          elevation: 52,
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: 80,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Icon={Home} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Icon={Bell} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="myLoans"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Icon={Menu} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="loan"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <Pressable
              onPress={() => router.push("/loan")}
            >
            <View
              className="bg-[#79C72B] w-[66px] h-[66px] mt-10 rounded-full justify-center items-center"
              style={{
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
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
