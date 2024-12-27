import React, { useState } from "react";
import { View, Text, Pressable, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';

const optionsMonto = [
  "$ 25.000", "$ 50.000", "$ 75.000", "$ 100.000",
  "$ 150.000", "$ 200.000", "$ 250.000", "$ 300.000",
];

const optionsCuotas = ["10 cuotas", "14 cuotas", "19 cuotas", "24 cuotas"];

const Loan = ({ navigation }) => {
  const [selectedMonto, setSelectedMonto] = useState("$ 75.000");
  const [selectedCuotas, setSelectedCuotas] = useState("19 cuotas");
  const [isMontoDropdownVisible, setMontoDropdownVisible] = useState(false);
  const [isCuotasDropdownVisible, setCuotasDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loanStatus, setLoanStatus] = useState(null); // 'approved' or 'rejected' or null

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
    // Simulate API call
    setTimeout(() => {
      // Random approval/rejection for demo purposes
      setLoanStatus(Math.random() > 0.5 ? 'approved' : 'rejected');
      setIsLoading(false);
    }, 2000);
  };

  const handleBack = () => {
    if (loanStatus) {
      setLoanStatus(null);
    } else {
      navigation?.goBack();
    }
  };

  const renderStatusScreen = () => {
    const isApproved = loanStatus === 'approved';
    
    return (
      <LinearGradient 
        colors={isApproved ? ["#388E3C", "#388E3C"] : ["#D32F2F", "#B71C1C"]} 
        style={styles.statusContainer}
      >
        <View style={styles.statusIconContainer}>
          <View style={[styles.statusIcon, isApproved ? styles.approvedIcon : styles.rejectedIcon]}>
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
          style={[styles.button, { backgroundColor: isApproved ? '#388E3C' : '#B71C1C' }]}
          onPress={() => isApproved ? console.log("Continuar con asesor") : handleBack()}
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
      <LinearGradient colors={["#006B7A", "#004C5E"]} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8BC34A" />
        <Text style={styles.loadingText}>Estamos confirmando el estado de su préstamo</Text>
      </LinearGradient>
    );
  }

  const renderOption = (item, onSelect, isSelected) => (
    <Pressable
      style={[styles.option, isSelected && styles.selectedOption]}
      onPress={() => onSelect(item)}
    >
      <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
        {item}
      </Text>
      {isSelected && <View style={styles.checkmark} />}
    </Pressable>
  );

  return (
    <LinearGradient colors={["#006B7A", "#004C5E"]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={styles.headerText}>Solicitar préstamo</Text>
        </View>

        <Text style={styles.label}>Monto</Text>
        <Pressable
          style={styles.selector}
          onPress={() => setMontoDropdownVisible(!isMontoDropdownVisible)}
        >
          <Text style={styles.selectorText}>{selectedMonto}</Text>
        </Pressable>
        {isMontoDropdownVisible && (
          <FlatList
            data={optionsMonto}
            keyExtractor={(item) => item}
            renderItem={({ item }) => renderOption(item, handleMontoSelect, item === selectedMonto)}
            style={styles.dropdown}
          />
        )}

        <Text style={styles.label}>Cuotas</Text>
        <Pressable
          style={styles.selector}
          onPress={() => setCuotasDropdownVisible(!isCuotasDropdownVisible)}
        >
          <Text style={styles.selectorText}>{selectedCuotas}</Text>
        </Pressable>
        {isCuotasDropdownVisible && (
          <FlatList
            data={optionsCuotas}
            keyExtractor={(item) => item}
            renderItem={({ item }) => renderOption(item, handleCuotasSelect, item === selectedCuotas)}
            style={styles.dropdown}
          />
        )}

        <Pressable style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar con el préstamo</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // ... existing styles remain the same ...
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  // Add new styles for status screens
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
  // ... rest of existing styles ...
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
  },
  selector: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
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
    marginBottom: 20,
    borderRadius: 8,
    maxHeight: 200,
  },
  option: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#8BC34A',
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
    marginTop: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: 10,
  },
});

export default Loan;