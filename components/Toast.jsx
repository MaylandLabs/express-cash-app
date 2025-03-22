import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import ErrorLogo from '../assets/ErrorLogo';
import SuccessLogo from '../assets/SuccessLogo';

const Toast = ({ message, visible, onHide, type = "error" }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      if (visible) {
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(3000),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }
    }, [visible]);
  
    if (!visible) return null;
  
    const isError = type === "error";
  
    return (
      <Animated.View style={[styles.toast, isError ? styles.errorToast : styles.successToast, { opacity: fadeAnim }]}>
        <View style={styles.toastContent}>
          {isError ? <ErrorLogo style={styles.icon} /> : <SuccessLogo style={styles.icon} />}
          <Text style={styles.toastText}>{message}</Text>
        </View>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    toast: {
        padding: 12 ,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginBottom: 30,
        borderWidth: 0.5,
        width: '100%',
      },
      errorToast: {
        backgroundColor: '#FA634F94',
        borderColor: '#F5F5F580',
      },
      successToast: {
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
      },
      toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
       
      },
      icon: {
        marginRight: 5,
      },
      toastText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        flex: 1,
        textAlign: 'left',
      },
  });

  export default Toast;