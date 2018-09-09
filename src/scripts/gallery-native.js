export default class GalleryNative {
    constructor(domElement) {
        this.domelement = document;
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
        return (window.CSS && CSS.supports('scroll-snap-type', 'x mandatory') && CSS.supports('scroll-snap-align', 'center'));
    }
}
