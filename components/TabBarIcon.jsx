import React from 'react';
import { View } from 'react-native';

const TabBarIcon = ({ Icon, focused }) => {
  return (
    <View className="h-20 items-center justify-center mt-10">
      {focused ? (
        <View className="relative p-3 bg-[#044454] rounded-full opacity-90">
          <Icon
            size={24}
            strokeWidth={2}
            color="white"
          />
        </View>
      ) : (
        <View className="p-3">
          <Icon
            size={24}
            color="white"
            strokeWidth={2}
          />
        </View>
      )}
    </View>
  );
};

export default TabBarIcon; 