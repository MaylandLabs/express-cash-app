import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Animated
} from "react-native";
import { Link } from "expo-router";
import { Stack } from "expo-router";
import { styled } from "nativewind";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

const StyledPressable = styled(Pressable);

const HomeView = () => {
  const router = useRouter();
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  return (
    <LinearGradient
      colors={['#006B7A', '#004C5E']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Stack.Screen options={{ headerShown: false }} />
        
        {/* Header */}
        <Pressable
          onPress={() => router.push('/(tabs)/profile')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View
            style={[
              {
                transform: [{ scale }],
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20
              }
            ]}
          >
            <Image
              source={require('../assets/userr.png')}
              style={styles.userAvatar}
            />
            <Text style={styles.greeting}>Hola, Félix</Text>
            <Text style={styles.arrow}>{'>'}</Text>
          </Animated.View>
        </Pressable>
        {/* Loan Section */}
        <View style={styles.loanSection}>
          <View style={styles.loanCard}>
            <Text style={styles.loanTitle}>Pedí tu préstamo de hasta</Text>
            <Text style={styles.loanAmount}>$300.000</Text>
            
            <View style={styles.imageContainer}>
              <Image 
                source={require('../assets/image 24.png')} 
                style={styles.loanImage}
              />
            </View>

            <View style={styles.buttonContainer}>
              <StyledPressable
                style={styles.loanButton}
                onPress={() => router.push('/loan')}
              >
                <Text style={styles.buttonText}>
                  Pedir un préstamo
                </Text>
              </StyledPressable>
            </View>
          </View>
        </View>
        {/* Current Loan Status */}
        <View style={styles.statusSection}>
          <Text style={styles.statusTitle}>Mis préstamos</Text>
          <View style={styles.statusCard}>
            <View style={styles.statusInfoContainer}>
              <Text style={styles.amount}>$75.000</Text>
              <Text style={styles.smile}>😊</Text>
              <Text style={styles.status}> Al día</Text>
            </View>
            <Text style={styles.date}>14 junio 2023</Text>
            
            <View style={styles.paymentStatusContainer}>
              <Text style={styles.paymentStatusTitle}>Cuotas pagadas</Text>
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
              <Text style={styles.progressText}>8/10</Text>
            </View>
          </View>
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
    fontFamily: 'poppins'
  },
  arrow: {
    color: 'white',
    marginLeft: 'auto',
    fontFamily: 'poppins'
  },
  loanSection: {
    marginTop: 24,
    flex: 1,
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
    fontFamily: 'poppins'
  },
  loanAmount: {
    fontSize: 48,
    fontWeight: '600',
    color: 'white',
    marginTop: 16,
    fontFamily: 'poppins'
  },
  imageContainer: {
    flex: 1,
    marginLeft: -35,
  },
  loanImage: {
    width: 240,
    height: 168,
    resizeMode: 'contain',
    alignSelf: 'flex-start'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 32,
    right: 16,
  },
  loanButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#79C72B',
    width: 260,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#006B7A',
    fontFamily: 'poppins'
  },
  statusSection: {
    marginTop: 24,
    marginBottom: 160,
  },
  statusTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
    fontFamily: 'poppins'
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
    fontFamily: 'poppins'
  },
  smile: {
    marginLeft: 380,
    fontFamily: 'poppins'
  },
  status: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'poppins'
  },
  date: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    fontFamily: 'poppins'
  },
  paymentStatusContainer: {
    marginTop: 16,
  },
  paymentStatusTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
    fontFamily: 'poppins'
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
    fontFamily: 'poppins'
  },
});

export default HomeView;