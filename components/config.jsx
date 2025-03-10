import React from "react";
import { Text, View, Pressable, Animated, StyleSheet } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import { Wallet, HelpCircle, Shield, Settings, CreditCard, ArrowRight, FileText, Lock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

const StyledPressable = styled(Pressable);

const Config = () => {
  const router = useRouter();
  const [hasLoanActive, setHasLoanActive] = React.useState(true); // Simulando si tiene un préstamo activo.

  const handlePressIn = (animatedValue) => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4
    }).start();
  };

  const handlePressOut = (animatedValue) => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4
    }).start();
  };

  return (
    <LinearGradient colors={["#055B72", "#004C5E"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.header, { fontFamily: 'Poppins_600SemiBold' }]}>Configuraciones</Text>

        {/* Opción de Límites de gasto */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_600SemiBold' }]}>Finanzas</Text>
          <View style={styles.card}>
            <Animated.View style={{ transform: [{ scale: 1 }] }}>
              <StyledPressable
                style={styles.cardItem}
                onPressIn={() => handlePressIn(1)}
                onPressOut={() => handlePressOut(1)}
                onPress={() => router.push('/spending-limits')}
              >
                <View style={styles.cardItemContent}>
                  <Wallet size={24} color="white" />
                  <Text style={[styles.cardItemText, { fontFamily: 'Poppins_400Regular' }]}>Límites de gasto</Text>
                  <ArrowRight size={24} color="white" />
                </View>
              </StyledPressable>
            </Animated.View>
          </View>
        </View>

        {/* Opción de Métodos de pago */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Animated.View style={{ transform: [{ scale: 1 }] }}>
              <StyledPressable
                style={styles.cardItem}
                onPressIn={() => handlePressIn(1)}
                onPressOut={() => handlePressOut(1)}
                onPress={() => router.push('/payment-methods')}
              >
                <View style={styles.cardItemContent}>
                  <CreditCard size={24} color="white" />
                  <Text style={[styles.cardItemText, { fontFamily: 'Poppins_400Regular' }]}>Métodos de pago</Text>
                  <ArrowRight size={24} color="white" />
                </View>
              </StyledPressable>
            </Animated.View>
          </View>
        </View>

        {/* Opción de Autenticación de dos factores */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_600SemiBold' }]}>Seguridad</Text>
          <View style={styles.card}>
            <Animated.View style={{ transform: [{ scale: 1 }] }}>
              <StyledPressable
                style={styles.cardItem}
                onPressIn={() => handlePressIn(1)}
                onPressOut={() => handlePressOut(1)}
                onPress={() => router.push('/two-factor-auth')}
              >
                <View style={styles.cardItemContent}>
                  <Shield size={24} color="white" />
                  <Text style={[styles.cardItemText, { fontFamily: 'Poppins_400Regular' }]}>Autenticación de dos factores</Text>
                  <ArrowRight size={24} color="white" />
                </View>
              </StyledPressable>
            </Animated.View>
          </View>
        </View>

        {/* Opción de Cambiar PIN */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Animated.View style={{ transform: [{ scale: 1 }] }}>
              <StyledPressable
                style={styles.cardItem}
                onPressIn={() => handlePressIn(1)}
                onPressOut={() => handlePressOut(1)}
                onPress={() => router.push('/change-pin')}
              >
                <View style={styles.cardItemContent}>
                  <Lock size={24} color="white" />
                  <Text style={[styles.cardItemText, { fontFamily: 'Poppins_400Regular' }]}>Cambiar PIN</Text>
                  <ArrowRight size={24} color="white" />
                </View>
              </StyledPressable>
            </Animated.View>
          </View>
        </View>

        {/* Opción de Términos y condiciones */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_600SemiBold' }]}>Legal</Text>
          <View style={styles.card}>
            <Animated.View style={{ transform: [{ scale: 1 }] }}>
              <StyledPressable
                style={styles.cardItem}
                onPressIn={() => handlePressIn(1)}
                onPressOut={() => handlePressOut(1)}
                onPress={() => router.push('/terms-and-conditions')}
              >
                <View style={styles.cardItemContent}>
                  <FileText size={24} color="white" />
                  <Text style={[styles.cardItemText, { fontFamily: 'Poppins_400Regular' }]}>Términos y condiciones</Text>
                  <ArrowRight size={24} color="white" />
                </View>
              </StyledPressable>
            </Animated.View>
          </View>
        </View>

  

      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center'
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  card: {
    backgroundColor: '#055B72',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardItem: {
    backgroundColor: 'transparent',
    padding: 15,
  },
  cardItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardItemText: {
    flex: 1,
    color: 'white',
    marginLeft: 10,
  },
});

export default Config;

