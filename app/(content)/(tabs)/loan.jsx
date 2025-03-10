import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Animated,
  Modal,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FONTS } from "../../../theme";

// Component for the back button
const BackButton = ({ onPress }) => {
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

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.backButton}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Animated.View>
    </Pressable>
  );
};

// Updated dropdown selector component
const DropdownSelector = ({ label, value, options, onSelect, labelStyle }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handleSelect = (selectedValue) => {
    onSelect(selectedValue);
    setDropdownVisible(false);
  };

  return (
    <>
      <Text className="text-ex-secondary mb-1 text-sm mt-12" style={{ fontFamily: FONTS.BOLD }}>{label}</Text>
      <Pressable
        style={styles.selector}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={[styles.selectorText, { fontFamily: FONTS.REGULAR }]}>
          {value}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#8BC34A" />
      </Pressable>
      
      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.modalHeader}>
              <BackButton onPress={() => setDropdownVisible(false)} />
              <Text style={styles.modalTitle}>Seleccionar {label.toLowerCase()}</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <ScrollView style={styles.optionsList}>
              {options.map((option) => (
                <Pressable
                  key={option}
                  style={[
                    styles.optionItem,
                    value === option && styles.selectedOptionItem
                  ]}
                  onPress={() => handleSelect(option)}
                >
                  <Text 
                    style={[
                      styles.optionItemText, 
                      value === option && styles.selectedOptionItemText
                    ]}
                  >
                    {option}
                  </Text>
                  {value === option && (
                    <Ionicons name="checkmark-circle" size={24} color="#8BC34A" />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Component for the continue button
const ContinueButton = ({ onPress, text }) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], width: '100%' }}>
      <Pressable
        style={styles.button}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text className="text-ex-primary text-center text-base" style={{ fontFamily: FONTS.SEMIBOLD }}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
};

// Component for the loading screen
const LoadingScreen = () => (
  <LinearGradient
    colors={["#055B72", "#004C5E"]}
    style={styles.loadingContainer}
  >
    <ActivityIndicator size="large" color="#8BC34A" />
    <Text style={[styles.loadingText, { fontFamily: FONTS.REGULAR }]}>
      Estamos confirmando el estado de su préstamo
    </Text>
  </LinearGradient>
);

// Updated StatusScreen component
const StatusScreen = ({ status, onContinue, onBack }) => {
  const isApproved = status === "approved";
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={isApproved ? ["#388E3C", "#7AC92A"] : ["#B71C1C", "#E74D3E"]}
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontFamily: FONTS.SEMIBOLD }} className="text-white text-xl mt-4">
        {isApproved ? "Préstamo pre-aprobado" : "Préstamo rechazado"}
      </Text>
      
      <View style={styles.statusContent}>
        <View style={styles.statusIconContainer}>
          <View
            style={[styles.statusIcon, isApproved ? styles.approvedIcon : styles.rejectedIcon]}
          >
            <Ionicons
              name={isApproved ? "checkmark" : "close"}
              size={40}
              color="white"
            />
          </View>
        </View>

        <Text style={[styles.statusMessage, { fontFamily: FONTS.REGULAR }]}>
          {isApproved
            ? "Tu préstamo ha sido pre-aprobado.\nPuedes continuar con el asesor."
            : "Tu préstamo ha sido rechazado.\nTu perfil no es compatible."}
        </Text>
      </View>

      <Pressable
        style={[styles.statusButton]}
        onPress={isApproved ? onContinue : onBack}
      >
        <Text style={[styles.buttonText, { color: "white", fontFamily: FONTS.BOLD }]}>
          {isApproved ? "Continuar con el asesor" : "Volver al home"}
        </Text>
      </Pressable>
    </LinearGradient>
  );
};

const Loan = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedMonto, setSelectedMonto] = useState("$ 75.000");
  const [selectedCuotas, setSelectedCuotas] = useState("19 cuotas");
  const [isLoading, setIsLoading] = useState(false);
  const [loanStatus, setLoanStatus] = useState(null);
  const router = useRouter();

  const optionsAmount = [
    "$ 25.000", "$ 50.000", "$ 75.000", "$ 100.000",
    "$ 150.000", "$ 200.000", "$ 250.000", "$ 300.000",
  ];

  const optionsCuotas = ["10 cuotas", "14 cuotas", "19 cuotas", "24 cuotas"];

  const handleBack = () => {
    if (loanStatus) {
      setLoanStatus(null);
    } else if (navigation) {
      navigation.goBack();
    } else {
      router.push("/");
    }
  };

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLoanStatus(Math.random() > 0.5 ? "approved" : "rejected");
      setIsLoading(false);
    }, 2000);
  };

  const handleApprovedContinue = () => {
    router.push("/");
  };

  const handleRejectedBack = () => {
    router.push("/");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (loanStatus) {
    return (
      <StatusScreen 
        status={loanStatus} 
        onContinue={handleApprovedContinue} 
        onBack={handleRejectedBack} 
      />
    );
  }

  return (
    <LinearGradient colors={["#055B72", "#004C5E"]} style={ { paddingTop: insets.top, paddingBottom: insets.bottom }} className="flex-1">
      <View className="flex-1 px-4 justify-between">
        <View>
        <View className="flex-row items-center justify-between mt-4">
          <BackButton onPress={handleBack} />
          <Text
          className="text-white text-xl"
           style={ { fontFamily: FONTS.SEMIBOLD }}>
            Solicitar préstamo
          </Text>
          <View className="w-8"></View> 
        </View>

        <DropdownSelector
          label="Monto"
          value={selectedMonto}
          options={optionsAmount}
          onSelect={setSelectedMonto}
        />

        <DropdownSelector
          label="Cuotas"
          value={selectedCuotas}
          options={optionsCuotas}
          onSelect={setSelectedCuotas}
          labelStyle={styles.labelC}
        />
        </View>

        <View style={styles.bottomButtonContainer}>
          <ContinueButton 
            onPress={handleContinue} 
            text="Continuar con el préstamo" 
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  bottomButtonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#8BC34A",
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  rText: {
    color: "white",
    fontSize: 24,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#055B72",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    fontFamily: FONTS.SEMIBOLD,
  },
  optionsList: {
    flex: 1,
    padding: 16,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,

  },
  selectedOptionItem: {
    backgroundColor: "rgba(139, 195, 74, 0.1)",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 0,
  },
  optionItemText: {
    color: "white",
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
  },
  selectedOptionItemText: {
    color: "#8BC34A",
    fontFamily: FONTS.MEDIUM,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
    borderWidth: 2,
  },
  approvedIcon: {
    backgroundColor: "#388E3C",
    borderColor: "white",
  },
  rejectedIcon: {
    backgroundColor: "transparent",
    borderColor: "white",
  },
  statusTitle: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
    fontFamily: FONTS.SEMIBOLD,
  },
  statusContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusMessage: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  statusButton: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
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
    textAlign: "center",
    marginTop: 20,
  },
  backButton: {
    padding: 8,
  },
};

export default Loan;