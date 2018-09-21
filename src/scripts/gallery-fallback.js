import Gallery from '~/scripts/gallery';
import _throttle from 'lodash/throttle';

export default class GalleryFallback extends Gallery {
    constructor(domElement) {
        super(domElement);

        this.slider = this.domelement.querySelector('.slider');
        this.buttons = Array.from(domElement.querySelectorAll('.navigation .button'));
        this.slides = Array.from(this.domelement.querySelectorAll('.slide'));
    }

    init() {
        if ('IntersectionObserver2' in window && 'IntersectionObserverEntry' in window) {
            this.registerSlideVisibilityChangeListener();
        } else {
            this.slider.addEventListener('scroll', _throttle(this.onScrollEvent.bind(this), 500));
        }
    }

    onScrollEvent() {
        // only works for equal wide elements
        const totalScrollWidth = this.slider.scrollWidth;
        const numberElements = this.slides.length;
        const slideWidth = totalScrollWidth / numberElements;
        const threshold = 0.5;

        const scrollPosition = this.slider.scrollLeft;
        const slideCalculated = scrollPosition / slideWidth;
        const decimalPoints = slideCalculated - Math.floor(slideCalculated);
        const index = (decimalPoints >= threshold) ? slideCalculated + 1 : slideCalculated;

        this.buttons.forEach((button) => button.classList.remove('button--is-active'));
        this.buttons[Math.floor(index)].classList.add('button--is-active');
    }

    registerSlideVisibilityChangeListener() {
        const threshold = 0.5;

        this.slideObserver = new IntersectionObserver((entries) => {
            const visibleElement = entries.filter((entry) => entry.intersectionRatio >= threshold);

            if (visibleElement.length === 1) {
                const index = this.slides.findIndex((slide) => slide === visibleElement[0].target);

                this.buttons.forEach((button) => button.classList.remove('button--is-active'));
                this.buttons[index].classList.add('button--is-active');
            }
        }, {
            root: this.slider,
            rootMargin: '0%',
            threshold: threshold,
        });

        this.slides.forEach((slide) => {
            this.slideObserver.observe(slide);
        })
    }
}
