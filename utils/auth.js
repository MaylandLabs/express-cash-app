// utils/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@app_token';

export const checkAuth = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token !== null;
  } catch (error) {
    console.error('Error checking auth:', error);
    return false;
  }
};

export const login = async (email, password) => {
  try {
    if (email && password) {
      const fakeToken = 'fake-jwt-token';
      await AsyncStorage.setItem(TOKEN_KEY, fakeToken);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
};