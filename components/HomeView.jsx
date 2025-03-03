import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Stack } from "expo-router";
import { styled } from "nativewind";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { ArrowRight } from 'lucide-react-native';

const StyledPressable = styled(Pressable);

const HomeView = () => {
  const router = useRouter();
  const [headerScale] = useState(new Animated.Value(1));
  const [loanButtonScale] = useState(new Animated.Value(1));
  const [statusCardScale] = useState(new Animated.Value(1));

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const handlePressIn = (scale) => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = (scale) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#006B7A', '#004C5E']}
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <View style={styles.content}>
        <Stack.Screen options={{ headerShown: false }} />

        {/* Header */}
        <Pressable
          onPress={() => router.push('/(tabs)/profile')}
          onPressIn={() => handlePressIn(headerScale)}
          onPressOut={() => handlePressOut(headerScale)}
        >
          <Animated.View
            style={[
              {
                transform: [{ scale: headerScale }],
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                marginBottom: 10,
                top: -20
              }
            ]}
          >
            <Image
              source={require('../assets/userr.png')}
              style={styles.userAvatar}
            />
            <Text style={[styles.greeting, { fontFamily: 'Poppins_500Medium' }]}>Hola, Félix</Text>
            <ArrowRight size={18} color="white" />
          </Animated.View>
        </Pressable>

        {/* Loan Section */}
        <View style={styles.loanSection}>
          <View style={styles.loanCard}>
            <Text style={[styles.loanTitle, { fontFamily: 'Poppins_400Regular' }]}>Pedí tu préstamo de hasta</Text>
            <Text style={[styles.loanAmount, { fontFamily: 'Poppins_600SemiBold' }]}>$300.000</Text>

            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/image 24.png')}
                style={styles.loanImage}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                onPress={() => router.push('/loan')}
                onPressIn={() => handlePressIn(loanButtonScale)}
                onPressOut={() => handlePressOut(loanButtonScale)}
              >
                <Animated.View
                  style={[
                    styles.loanButton,
                    {
                      transform: [{ scale: loanButtonScale }]
                    }
                  ]}
                >
                  <Text style={styles.buttonText}>
                    Pedir un préstamo
                  </Text>
                </Animated.View>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Current Loan Status */}
        <View style={styles.statusSection}>
          <Text style={[styles.statusTitle, { fontFamily: 'Poppins_500Medium' }]}>Mis préstamos</Text>
          
          <Pressable
            onPress={() => router.push('/MyLoans')}
            onPressIn={() => handlePressIn(statusCardScale)}
            onPressOut={() => handlePressOut(statusCardScale)}
          >
            <Animated.View
              style={[
                styles.statusCard,
                {
                  transform: [{ scale: statusCardScale }]
                }
              ]}
            >
              <View style={styles.statusInfoContainer}>
                <Text style={[styles.amount, { fontFamily: 'Poppins_600SemiBold' }]}>$75.000</Text>
                <Text style={[styles.smile, { fontFamily: 'Poppins_400Regular' }]}>😊</Text>
                <Text style={[styles.status, { fontFamily: 'Poppins_400Regular' }]}> Al día</Text>
              </View>
              <Text style={[styles.date, { fontFamily: 'Poppins_400Regular' }]}>14 junio 2023</Text>

              <View style={styles.paymentStatusContainer}>
                <Text style={[styles.paymentStatusTitle, { fontFamily: 'Poppins_400Regular' }]}>Cuotas pagadas</Text>
                <View style={styles.paymentProgress}>
                  {[...Array(10)].map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.progressBarItem,
                        i < 8 ? styles.progressBarItemActive : {}
                      ]}
                    />
                  ))}
                </View>
                <Text style={[styles.progressText, { fontFamily: 'Poppins_400Regular' }]}>8/10</Text>
              </View>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loanButton: {
    backgroundColor: '#7CBA47',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 24,
    marginTop: 32,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    top: 3
  },
  arrow: {
    color: 'white',
    marginLeft: 10,
  },
  loanSection: {
    marginTop: 24,
    flex: 1,
    top: -15
  },
  loanCard: {
    backgroundColor: '#006B7A',
    padding: 16,
    borderRadius: 16,
    height: 340,
  },
  loanTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  loanAmount: {
    fontSize: 48,
    fontWeight: '600',
    color: 'white',
    marginTop: 16,
  },
  imageContainer: {
    flex: 1,
    marginLeft: -35,
  },
  loanImage: {
    width: 240,
    height: 168,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 32,
    right: 16,
  },
  loanButton: {
    backgroundColor: '#7CBA47',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease', 
  },
  loanButtonHover: {
    backgroundColor: '#66A73B',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#006B7A',
  },
  statusSection: {
    marginTop: 24,
    marginBottom: 160,
  },
  statusTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
    marginTop: 10
  },
  statusCard: {
    backgroundColor: '#006B7A',
    padding: 16,
    borderRadius: 16,
  },
  statusInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  smile: {
    marginLeft: 380,
  },
  status: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  date: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  paymentStatusContainer: {
    marginTop: 16,
  },
  paymentStatusTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  paymentProgress: {
    flexDirection: 'row',
    gap: 4,
  },
  progressBarItem: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressBarItemActive: {
    backgroundColor: '#79C72B',
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
});

export default HomeView;
