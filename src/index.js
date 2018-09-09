// vendor css
import '~/vendor/h5bp/normalize.css';
import '~/vendor/h5bp/main.css';

// font
import '~/assets/comic-sans.woff';

// SCSS
import '~/style.scss';

// images
// import '~/assets/cat-no.jpeg';

// JS imports
import GalleryNative from '~/scripts/gallery-native';
import GalleryFallback from '~/scripts/gallery-fallback';


// Native gallery
const nativeGallery = new GalleryNative(document.querySelector('.gallery-native-snap'));
nativeGallery.showOverlay();

// Fallback gallery
const fallbackGallery = new GalleryFallback(document.querySelector('.gallery-fallback'));
fallbackGallery.showOverlay();
