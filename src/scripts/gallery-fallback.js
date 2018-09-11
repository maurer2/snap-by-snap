import Gallery from '~/scripts/gallery';

export default class GalleryFallback extends Gallery {
    constructor(domElement) {
        super(domElement);

        this.slider = this.domelement.querySelector('.slider');
        this.buttons = Array.from(domElement.querySelectorAll('.navigation .button'));
        this.slides = Array.from(this.domelement.querySelectorAll('.slide'));
    }

    init() {
        this.registerSlideVisibilityChangeListener();
    }

    registerSlideVisibilityChangeListener() {
        if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window) {
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
        } else {
            // offset calculation
        }
    }
}
