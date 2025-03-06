import { Asset } from 'expo-asset';
import { ImageSourcePropType } from 'react-native';

export const images: { [key: string]: ImageSourcePropType } = {
  logo: require('../assets/images/logo.png'),
  google_logo: require('../assets/images/google_icon.png'),
  user_icon: require('../assets/images/user.png'),
  userr_icon: require('../assets/images/userr.png'),
  money_icon: require('../assets/images/money_icon.png'),
};

type VirtualAssetModuleType = number | string;

// preload images
const imageAssets = Object.keys(images).map(key => {
  return Asset.fromModule(images[key] as VirtualAssetModuleType).downloadAsync();
});

export const loadImages = () => Promise.all(imageAssets);
