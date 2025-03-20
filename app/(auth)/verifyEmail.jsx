import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const VerifyEmail = ({ email, setEmail }) => {
  return (
    <View style={styles.formContainer}>
      <Text style={[styles.title, { fontFamily: "Poppins_600SemiBold" }]}>
        Recuperar Contraseña
      </Text>
      <Text style={[styles.subtitle, { fontFamily: "Poppins_400Regular" }]}>
        Resetea tu contraseña y vuelve a ingresar a tu cuenta personal.
      </Text>

      <Text style={[styles.label, { fontFamily: "Poppins_400Regular" }]}>
        Email
      </Text>
      <TextInput
        style={[styles.input, { fontFamily: "Poppins_400Regular" }]}
        placeholder="Escribe tu email"
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins_600SemiBold",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 30,
    opacity: 0.8,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#00C853",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#004D56",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 60,
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 20,
    borderColor: "#7CBA47",
    borderWidth: 1,
  },
});

export default VerifyEmail;
