import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import ErrorLogo from '../assets/ErrorLogo';

const Toast = ({ message, visible, onHide }) => {
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
  
    return (
      <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
        <View style={styles.toastContent}>
          <ErrorLogo style={styles.errorIcon} />
          <Text style={styles.toastText}>{message}</Text>
        </View>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    toast: {
        backgroundColor: '#FA634F94',
        opacity: 0.58,
        padding: 12 ,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginBottom: 30,
        borderWidth: 0.5,
        borderColor: '#F5F5F580',
        width: '100%',
      },
      toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
       
      },
      errorIcon: {
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