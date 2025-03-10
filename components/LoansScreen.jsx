import React, { useRef } from "react";
import { View, Text, Pressable, StyleSheet, Animated, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FONTS } from "../theme";
import ScrollViewTopMask from "./ScrollViewTopMask";
const LoansScreen = () => {
  const insets = useSafeAreaInsets();

  const backButtonAnimatedScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(backButtonAnimatedScale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 30,
      bounciness: 2,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(backButtonAnimatedScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 2,
    }).start();
  };

  const MOCK_LOAN_DATA = {
    amount: 75000,
    date: "19 junio 2023",
    totalInstallments: 10,
    completedInstallments: 8,
    status: "Al día",
    progressPercentage: "50%",
  };

  const ProgressBar = () => {
    const segments = Array(MOCK_LOAN_DATA.totalInstallments).fill(null);

    return (
      <View className="w-full">
        <View className="flex-row justify-between items-center">
          <Text
            className="text-sm text-white"
            style={{ fontFamily: FONTS.REGULAR }}
          >
            Cuotas pagadas
          </Text>
          <Text
            className="text-sm text-[#7CBA47]"
            style={{ fontFamily: FONTS.MEDIUM }}
          >
            {MOCK_LOAN_DATA.progressPercentage}
          </Text>
        </View>
        <View className="flex-row gap-1 mt-1">
          {segments.map((_, index) => (
            <View
              key={index}
              className={`flex-1 rounded h-8 ${
                index < MOCK_LOAN_DATA.completedInstallments
                  ? "bg-[#7CBA47]"
                  : "bg-[#044454]"
              }`}
            />
          ))}
        </View>
        <View className="flex-row mt-1">
          <Text
            className="text-sm text-ex-secondary mt-1"
            style={{ fontFamily: FONTS.SEMIBOLD }}
          >
            {MOCK_LOAN_DATA.completedInstallments}
          </Text>
          <Text
            className="text-sm text-white mt-1 opacity-60"
            style={{ fontFamily: FONTS.REGULAR }}
          >
            /{MOCK_LOAN_DATA.totalInstallments}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#055B72", "#004C5E"]}
      className="flex-1"
      style={
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      }
    >
      <Text
        className="text-xl text-white mt-4 text-center"
        style={{ fontFamily: FONTS.SEMIBOLD }}
      >
        Mis préstamos
      </Text>
      <ScrollViewTopMask>
      <ScrollView className="flex-1 px-4 mt-8">
      <View className="bg-ex-primary px-4 py-6 rounded-2xl w-full mt-6">
        <View className="flex-row justify-between items-center">
          <View className="flex items-start">
            <View className="flex-row items-center">
              <Text
                className="text-ex-secondary text-3xl"
                style={{ fontFamily: FONTS.REGULAR }}
              >
                $
              </Text>
              <Text
                className="text-3xl text-white"
                style={{ fontFamily: FONTS.REGULAR }}
              >
                75.000
              </Text>
            </View>
            <Text
              className="text-sm text-white opacity-60"
              style={{ fontFamily: FONTS.REGULAR }}
            >
              14 junio 2023
            </Text>
          </View>
          <View className="flex items-center">
            <Text
              className="text-white text-sm text-right opacity-60"
              style={{ fontFamily: FONTS.REGULAR }}
            >
              {" "}
              Al día
            </Text>
            <Text className="text-4xl" style={{ fontFamily: FONTS.REGULAR }}>
              😊
            </Text>
          </View>
        </View>

        <View className="mt-4">
          <ProgressBar />
        </View>
      </View>
      </ScrollView>
      </ScrollViewTopMask>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginRight: 15,
    marginBottom: 25,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    fontFamily: "Poppins",
  },
  card: {
    backgroundColor: "#055B72",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardAmount: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  cardStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardStatusText: {
    color: "white",
    opacity: 0.8,
    marginRight: 8,
    fontFamily: "Poppins",
  },
  cardStatusIcon: {
    color: "#FFCC00",
    fontSize: 24,
  },
  cardDate: {
    color: "white",
    opacity: 0.6,
    fontSize: 14,
    marginBottom: 16,
    fontFamily: "Poppins",
  },
  cardSubTitle: {
    color: "white",
    opacity: 0.8,
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  progressBar: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 8,
  },
  progressBarItem: {
    flex: 1,
    height: 6,
    borderRadius: 4,
  },
  progressBarFilled: {
    backgroundColor: "#79C72B",
  },
  progressBarEmpty: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  cardSubText: {
    color: "white",
    opacity: 0.6,
    fontSize: 14,
    fontFamily: "Poppins",
  },
});

export default LoansScreen;
