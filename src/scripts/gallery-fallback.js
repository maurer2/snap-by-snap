import Gallery from '~/scripts/gallery';

export default class GalleryFallback extends Gallery {
    constructor(domElement) {
        super(domElement);

        this.slider = this.domelement.querySelector('.slider');
        this.slides = Array.from(this.domelement.querySelectorAll('.slide'));
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        // add intersction observer for nav buttons
        this.slideObserver = new IntersectionObserver((entries) => {
            const visible = entries.filter((entry) => entry.intersectionRatio > 0);
            const hidden = entries.filter((entry) => entry.intersectionRatio === 0);

            console.log('visible', visible);
            console.log('hidden', hidden);
        }, {
            root: this.slider,
            rootMargin: '0px',
            threshold: 0,
        });

        this.slides.forEach((slide) => {
            this.slideObserver.observe(slide);
        })
    }
}
