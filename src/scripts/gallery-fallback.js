export default class GalleryFallback {
    constructor(domElement) {
        this.domelement = domElement;
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
