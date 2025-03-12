// Import the fonts
import { FONTS, loadFonts } from './fonts';
import { images, loadImages } from './images';
// Re-export fonts
export { FONTS, loadFonts };

// Re-export everything from images.ts
export * from './images';

// Re-export everything from fonts.ts
export * from './fonts';


// Add a theme initialization function
export const initializeTheme = async () => {
  try {
    // Load all resources in parallel
    const [fontsLoaded, imagesLoaded] = await Promise.all([
      loadFonts(),
      loadImages()
    ]);
    return true;
  } catch (error) {
    console.error('Theme initialization failed:', error);
    return false;
  }
};
