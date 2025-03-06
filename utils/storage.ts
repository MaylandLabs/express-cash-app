import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
    // eslint-disable-next-line
  } catch (error) {
    // console.error("Error obteniendo datos:", error);
    return null;
  }
};

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    // eslint-disable-next-line
  } catch (error) {
    // console.error("Error almacenando datos:", error);
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    // eslint-disable-next-line
  } catch (error) {
    // console.error("Error eliminando datos:", error);
  }
};
