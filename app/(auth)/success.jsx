import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Success() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={["#055B72", "#004C5E"]}
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContainer}
      >
        <View style={styles.container}>
          <Text style={styles.title}>¡Todo listo! 💸</Text>
          <Text style={styles.subtitle}>
            Ya formas parte de la comunidad de Express Cash y puedes acceder a
            la app.
          </Text>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.continueButton}>
        <Text
          style={styles.continueButtonText}
          onPress={() => router.replace("/(content)/index")}
        >
          Ir a la app
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingTop: 40,
    justifyContent: "space-between",
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  continueButton: {
    backgroundColor: "#7CBA47",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  continueButtonText: {
    color: "#055B72",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});
