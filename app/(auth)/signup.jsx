// app/(auth)/signup.jsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Signup = ({ navigation }) => {
  const handleSignup = () => {
    // Aquí implementas tu lógica de registro
    console.log('Registrarse');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <Button title="Crear cuenta" onPress={handleSignup} />
      <Button title="Volver al Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Signup;
