import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const optionsMonto = [
  "$ 25.000",
  "$ 50.000",
  "$ 75.000",
  "$ 100.000",
  "$ 150.000",
  "$ 200.000",
  "$ 250.000",
  "$ 300.000",
];

const optionsCuotas = ["10 cuotas", "14 cuotas", "19 cuotas", "24 cuotas"];

const Loan = ({ navigation }) => {
  const [selectedMonto, setSelectedMonto] = useState("$ 75.000");
  const [selectedCuotas, setSelectedCuotas] = useState("19 cuotas");
  const [isMontoDropdownVisible, setMontoDropdownVisible] = useState(false);
  const [isCuotasDropdownVisible, setCuotasDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loanStatus, setLoanStatus] = useState(null);
  const router = useRouter();

  // Animación para el botón de retroceso
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Animación para el botón de "Continuar con el préstamo"
  const [scaleContinue] = useState(new Animated.Value(1));

  const handlePressInContinue = () => {
    Animated.spring(scaleContinue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutContinue = () => {
    Animated.spring(scaleContinue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleMontoSelect = (value) => {
    setSelectedMonto(value);
    setMontoDropdownVisible(false);
  };

  const handleCuotasSelect = (value) => {
    setSelectedCuotas(value);
    setCuotasDropdownVisible(false);
  };

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLoanStatus(Math.random() > 0.5 ? "approved" : "rejected");
      setIsLoading(false);
    }, 2000);
  };

  const handleBack = () => {
    if (loanStatus) {
      setLoanStatus(null);
    } else if (navigation) {
      navigation.goBack();
    } else {
      router.push("/");
    }
  };

  const renderStatusScreen = () => {
    const isApproved = loanStatus === "approved";

    return (
      <LinearGradient
        colors={isApproved ? ["#388E3C", "#388E3C"] : ["#D32F2F", "#B71C1C"]}
        style={style.statusContainer}
      >
        <View style={style.statusIconContainer}>
          <View
            style={[style.statusIcon, isApproved ? style.approvedIcon : style.rejectedIcon]}
          >
            <Ionicons
              name={isApproved ? "checkmark" : "close"}
              size={40}
              color="white"
            />
          </View>
        </View>

        <Text style={[style.statusTitle, { fontFamily: "Poppins" }]}>
          {isApproved ? "Préstamo pre-aprobado" : "Préstamo rechazado"}
        </Text>

        <Text style={[style.statusMessage, { fontFamily: "Poppins" }]}>
          {isApproved
            ? "Tu préstamo ha sido pre-aprobado.\nPuedes continuar con el asesor."
            : "Tu préstamo ha sido rechazado.\nTu perfil no es compatible."}
        </Text>

        <Pressable
          style={[style.button, { backgroundColor: isApproved ? "#388E3C" : "#B71C1C" }]}
          onPress={() => {
            if (isApproved) {
              router.push("/");
            } else {
              handleBack();
            }
          }}
        >
          <Text style={style.buttonText}>
            {isApproved ? "Continuar con el asesor" : "Volver al home"}
          </Text>
        </Pressable>
      </LinearGradient>
    );
  };

  if (loanStatus) {
    return renderStatusScreen();
  }

  if (isLoading) {
    return (
      <LinearGradient
        colors={["#006B7A", "#004C5E"]}
        style={style.loadingContainer}
      >
        <ActivityIndicator size="large" color="#8BC34A" />
        <Text style={[style.loadingText, { fontFamily: "Poppins" }]}>
          Estamos confirmando el estado de su préstamo
        </Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#006B7A", "#004C5E"]} style={style.container}>
      <View style={style.content}>
        <View style={style.header}>
          <Pressable
            onPress={handleBack}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={style.backButton}
          >
            <Animated.View style={{ transform: [{ scale }] }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Animated.View>
          </Pressable>
          <Text style={[style.headerText, { fontFamily: "Poppins" }]}>
            Solicitar préstamo
          </Text>
        </View>

        <Text style={[style.label, { fontFamily: "Poppins" }]}>Monto</Text>
        <Pressable
          style={style.selector}
          onPress={() => setMontoDropdownVisible(!isMontoDropdownVisible)}
        >
          <Text style={[style.selectorText, { fontFamily: "Poppins" }]}>
            {selectedMonto}
          </Text>
          <Ionicons
            name={isMontoDropdownVisible ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
          />
        </Pressable>
        {isMontoDropdownVisible && (
          <View style={style.dropdown}>
            {optionsMonto.map((monto) => (
              <Pressable
                key={monto}
                style={[style.option, selectedMonto === monto && style.selectedOption]}
                onPress={() => handleMontoSelect(monto)}
              >
                <Text
                  style={[style.optionText, selectedMonto === monto && style.selectedOptionText]}
                >
                  {monto}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <Text style={[style.labelC, { fontFamily: "Poppins" }]}>Cuotas</Text>
        <Pressable
          style={style.selector}
          onPress={() => setCuotasDropdownVisible(!isCuotasDropdownVisible)}
        >
          <Text style={[style.selectorText, { fontFamily: "Poppins" }]}>
            {selectedCuotas}
          </Text>
          <Ionicons
            name={isCuotasDropdownVisible ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
          />
        </Pressable>
        {isCuotasDropdownVisible && (
          <View style={style.dropdown}>
            {optionsCuotas.map((cuota) => (
              <Pressable
                key={cuota}
                style={[style.option, selectedCuotas === cuota && style.selectedOption]}
                onPress={() => handleCuotasSelect(cuota)}
              >
                <Text
                  style={[style.optionText, selectedCuotas === cuota && style.selectedOptionText]}
                >
                  {cuota}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={style.bottomButtonContainer}>
          <Animated.View style={{ transform: [{ scale: scaleContinue }], width: '100%' }}>
            <Pressable
              style={style.button}
              onPress={handleContinue}
              onPressIn={handlePressInContinue}
              onPressOut={handlePressOutContinue}
            >
              <Text style={style.buttonText}>Continuar con el préstamo</Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
};

const style = {
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  bottomButtonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#8BC34A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: '100%',
  },
  backButton: {
    marginRight: 15,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    color: "#8BC34A",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  labelC: {
    color: "#8BC34A",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 40,
  },
  selector: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8BC34A",
  },
  selectorText: {
    color: "white",
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 8,
    borderColor: "#8BC34A",
    borderWidth: 1,
    marginTop: 5,
    overflow: "hidden",
    maxHeight: 200,
  },
  option: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#8BC34A33",
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#8BC34A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 80,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  statusIconContainer: {
    marginBottom: 30,
  },
  statusIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  approvedIcon: {
    backgroundColor: "#388E3C",
  },
  rejectedIcon: {
    backgroundColor: "#B71C1C",
  },
  statusTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  statusMessage: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    color: "white",
    fontSize: 16,
  },
};

export default Loan;