import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default (props) => <View style={{ backgroundColor: 'transparent', flex: 1, }}>
 <LinearGradient colors={['#FFFFFF00', '#FFFFFF', '#FFFFFF00']} style={{ flex: 1, width: '100%', borderTopLeftRadius: 32, borderTopRightRadius: 32 }}>
 </LinearGradient>
</View>