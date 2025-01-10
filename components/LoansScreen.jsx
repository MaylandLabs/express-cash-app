import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const LoansScreen = () => {
  const router = useRouter();


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

  return (
    <LinearGradient colors={["#006B7A", "#004C5E"]} style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={{ transform: [{ scale: backButtonAnimatedScale }] }}>
          <Pressable 
            onPress={() => router.push("/(tabs)/profile")} 
            style={styles.backButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
        </Animated.View>

        <Text style={styles.title}>Mis préstamos</Text>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardAmount}>$ 75.000</Text>
            <View style={styles.cardStatus}>
              <Text style={styles.cardStatusText}>Al día</Text>
              <Text style={styles.cardStatusIcon}>😊</Text>
            </View>
          </View>
          
          <Text style={styles.cardDate}>19 junio 2023</Text>
          
          <Text style={styles.cardSubTitle}>Cuotas pagadas</Text>
          <View style={styles.progressBar}>
            {[...Array(10)].map((_, i) => (
              <View 
                key={i}
                style={[styles.progressBarItem, i < 8 ? styles.progressBarFilled : styles.progressBarEmpty]}
              />
            ))}
          </View>
          <Text style={styles.cardSubText}>9/19</Text>
        </View>
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
    padding: 24,
  },
  backButton: {
    marginRight: 15,
    marginBottom: 25,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    fontFamily: 'Poppins',
  },
  card: {
    backgroundColor: '#006B7A',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardAmount: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  cardStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStatusText: {
    color: 'white',
    opacity: 0.8,
    marginRight: 8,
    fontFamily: 'Poppins',
  },
  cardStatusIcon: {
    color: '#FFCC00',
    fontSize: 24,
  },
  cardDate: {
    color: 'white',
    opacity: 0.6,
    fontSize: 14,
    marginBottom: 16,
    fontFamily: 'Poppins',
  },
  cardSubTitle: {
    color: 'white',
    opacity: 0.8,
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Poppins',
  },
  progressBar: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  progressBarItem: {
    flex: 1,
    height: 6,
    borderRadius: 4,
  },
  progressBarFilled: {
    backgroundColor: '#79C72B',
  },
  progressBarEmpty: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardSubText: {
    color: 'white',
    opacity: 0.6,
    fontSize: 14,
    fontFamily: 'Poppins',
  },
});

export default LoansScreen;
