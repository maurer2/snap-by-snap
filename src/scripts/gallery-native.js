import Gallery from '~/scripts/gallery';

export default class GalleryNative extends Gallery {
    constructor(domElement) {
        super(domElement);

        this.slider = this.domelement.querySelector('.slider');
        this.overlay = this.domelement.querySelector('.overlay');

        this.slides = Array.from(this.domelement.querySelectorAll('.slide'));
        this.buttons = Array.from(domElement.querySelectorAll('.navigation .button'));
    }
    init() {
        this.showOverlay();
        this.resetNav();
        this.activateNav();
    }

    isSupported() {
        return (window.CSS && CSS.supports('scroll-snap-type', 'x mandatory') && CSS.supports('scroll-snap-align', 'center'));
    }

    activateNav() {
        this.buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.buttons.forEach((button) => button.classList.remove('button--is-active'));
                this.buttons[index].classList.add('button--is-active');

                this.activateSlide();
            });
        });
    }

    resetNav() {
        this.buttons.forEach((button) => button.classList.remove('button--is-active'));
        this.buttons[0].classList.add('button--is-active');
    }

    activateSlide() {
        const index = this.buttons.findIndex((button) => button.classList.contains('button--is-active'));
        const activeSlide = this.slides[index];

        this.slider.scrollLeft = activeSlide.offsetLeft;
    }

    showOverlay() {
        const image = this.overlay.querySelector('.image');

        if (!this.isSupported()) {
            image.src = image.dataset.src;
            this.overlay.classList.remove('overlay--is-hidden');
        }
    }
}
