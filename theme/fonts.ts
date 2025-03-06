import * as Font from 'expo-font';
import { 
  Poppins_400Regular, 
  Poppins_500Medium,
  Poppins_600SemiBold, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';

// Simple font names that are easy to remember and use
export const FONTS = {
  REGULAR: 'PoppinsRegular',
  MEDIUM: 'PoppinsMedium',
  SEMIBOLD: 'PoppinsSemiBold',
  BOLD: 'PoppinsBold'
};

// Preload fonts with simplified names
export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      // Load with simpler names
      [FONTS.REGULAR]: Poppins_400Regular,
      [FONTS.MEDIUM]: Poppins_500Medium,
      [FONTS.SEMIBOLD]: Poppins_600SemiBold,
      [FONTS.BOLD]: Poppins_700Bold,
    });
    return true;
  } catch (error) {
    console.error('Font loading error:', error);
    return false;
  }
};