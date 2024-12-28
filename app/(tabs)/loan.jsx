import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
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
      navigation.goBack(); // Usa navegación clásica
    } else {
      router.push("/"); // Vuelve al home si no hay navegación clásica
    }
  };
  

  const renderStatusScreen = () => {
    const isApproved = loanStatus === "approved";

    return (
      <LinearGradient
        colors={isApproved ? ["#388E3C", "#388E3C"] : ["#D32F2F", "#B71C1C"]}
        style={styles.statusContainer}
      >
        <View style={styles.statusIconContainer}>
          <View
            style={[
              styles.statusIcon,
              isApproved ? styles.approvedIcon : styles.rejectedIcon,
            ]}
          >
            <Ionicons
              name={isApproved ? "checkmark" : "close"}
              size={40}
              color="white"
            />
          </View>
        </View>

        <Text style={styles.statusTitle}>
          {isApproved ? "Préstamo pre-aprobado" : "Préstamo rechazado"}
        </Text>

        <Text style={styles.statusMessage}>
          {isApproved
            ? "Tu préstamo ha sido pre-aprobado.\nPuedes continuar con el asesor."
            : "Tu préstamo ha sido rechazado.\nTu perfil no es compatible."}
        </Text>

        <Pressable
          style={[
            styles.button,
            { backgroundColor: isApproved ? "#388E3C" : "#B71C1C" },
          ]}
          onPress={() => {
            if (isApproved) {
              // Redirige a otra página o realiza otra acción
              router.push("/"); // Cambia "/asesor" por la ruta correspondiente
            } else {
              handleBack(); // Vuelve hacia atrás
            }
          }}
        >
          <Text style={styles.buttonText}>
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
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color="#8BC34A" />
        <Text style={styles.loadingText}>
          Estamos confirmando el estado de su préstamo
        </Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#006B7A", "#004C5E"]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/")} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={styles.headerText}>Solicitar préstamo</Text>
        </View>

        {/* Dropdown for Monto */}
        <Text style={styles.label}>Monto</Text>
        <Pressable
          style={styles.selector}
          onPress={() => setMontoDropdownVisible(!isMontoDropdownVisible)}
        >
          <Text style={styles.selectorText}>{selectedMonto}</Text>
          <Ionicons
            name={isMontoDropdownVisible ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
          />
        </Pressable>
        {isMontoDropdownVisible && (
          <View style={styles.dropdown}>
            {optionsMonto.map((monto) => (
              <Pressable
                key={monto}
                style={[
                  styles.option,
                  selectedMonto === monto && styles.selectedOption,
                ]}
                onPress={() => handleMontoSelect(monto)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedMonto === monto && styles.selectedOptionText,
                  ]}
                >
                  {monto}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Dropdown for Cuotas */}
        <Text style={styles.labelC}>Cuotas</Text>
        <Pressable
          style={styles.selector}
          onPress={() => setCuotasDropdownVisible(!isCuotasDropdownVisible)}
        >
          <Text style={styles.selectorText}>{selectedCuotas}</Text>
          <Ionicons
            name={isCuotasDropdownVisible ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
          />
        </Pressable>
        {isCuotasDropdownVisible && (
          <View style={styles.dropdown}>
            {optionsCuotas.map((cuota) => (
              <Pressable
                key={cuota}
                style={[
                  styles.option,
                  selectedCuotas === cuota && styles.selectedOption,
                ]}
                onPress={() => handleCuotasSelect(cuota)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedCuotas === cuota && styles.selectedOptionText,
                  ]}
                >
                  {cuota}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <Pressable style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar con el préstamo</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
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
    marginTop: 20
  },
  labelC: {
    color: "#8BC34A",
    fontSize: 16,
    marginBottom: 10,
    marginTop:40
  },
  selector: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8BC34A',
  },
  selectorText: {
    color: "white",
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    borderColor: "#8BC34A",
    borderWidth: 1,
    marginTop: 5,
    overflow: "hidden",
    maxHeight: 200, // Altura máxima del dropdown
  },
  scrollView: {
    paddingVertical: 5,
  },
  option: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#8BC34A33',
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: "#8BC34A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 80,
    position: "fix"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusIconContainer: {
    marginBottom: 30,
  },
  statusIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  approvedIcon: {
    backgroundColor: '#388E3C',
  },
  rejectedIcon: {
    backgroundColor: '#B71C1C',
  },
  statusTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusMessage: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Loan;
