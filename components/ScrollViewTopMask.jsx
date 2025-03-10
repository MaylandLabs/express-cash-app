import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const ScrollViewTopMask = ({ children }) => {
  return (
    <MaskedView
      style={{ flex: 1 }}
      maskElement={
        <LinearGradient
          colors={['transparent', 'black']}
          locations={[0, 0.15]}
          style={{ flex: 1 }}
        />
      }
    >
      {children}
    </MaskedView>
  );
};

export default ScrollViewTopMask; 