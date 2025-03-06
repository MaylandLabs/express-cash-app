import { usePathname, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

export default function NotFoundScreen() {
  const pathname = usePathname();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text>The route "{pathname}" doesn't exist.</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});