import Gallery from '~/scripts/gallery';

export default class GalleryFallback extends Gallery {
    constructor(domElement) {
        super(domElement);
    }

    showOverlay() {
        const overlay = this.domelement.querySelector('.overlay');
        const image = overlay.querySelector('.image');

        if (!this.isSupported()) {
            image.src = image.dataset.src;
            overlay.classList.remove('overlay--is-hidden');
        }
    }

    isSupported() {
        return false;
    }
}
