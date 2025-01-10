import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Thumbs } from 'swiper/modules';

export function bindCarousels(carousels) {
    carousels.forEach(carousel => {
        if (carousel.dataset.config == "comp-gallery") {
            const carouselThumbs = carousel.querySelector('[data-thumbs-swiper]');
            const carouselMain = carousel.querySelector('[data-main-swiper]');

            if (!carouselThumbs && !carouselMain) {
                return;
            }

            const thumbsSwiper = new Swiper(carouselThumbs, {
                modules: [Navigation],
                loop: true,
                navigation: {
                    nextEl: carouselThumbs.querySelector('.swiper-button-next'),
                    prevEl: carouselThumbs.querySelector('.swiper-button-prev'),
                },
                slidesPerView: 3,
                spaceBetween: 8,
                breakpoints: {
                    640: {
                        slidesPerView: 4
                    },
                    1024: {
                        slidesPerView: 5
                    },
                    1440: {
                        slidesPerView: 6
                    }
                }
            });
            const mainSwiper = new Swiper(carouselMain, {
                modules: [Thumbs],
                loop: true,
                slidesPerView: 1,
                allowTouchMove: true,
                navigation: {
                    nextEl: carouselThumbs.querySelector('.swiper-button-next'),
                    prevEl: carouselThumbs.querySelector('.swiper-button-prev'),
                },
                thumbs: {
                    swiper: thumbsSwiper
                }
            });
        } else {
            new Swiper(carousel, getSwiperConfig(carousel, Navigation, Pagination, Autoplay));
        }
    });

    if (typeof (CAROUSEL_CSS) != 'undefined') {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = CAROUSEL_CSS;
        css.type = 'text/css';
        document.querySelector('body').appendChild(css);
    }
}

function getSwiperConfig(carousel, Navigation, Pagination, Autoplay) {
    const swiper_config_default = {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        autoplay: false,
        navigation: {
            nextEl: carousel.querySelector('.swiper-button-next'),
            prevEl: carousel.querySelector('.swiper-button-prev'),
        },
        pagination: {
            el: carousel.querySelector('.swiper-pagination'),
            clickable: true
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        breakpoints: {
            640: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            1024: {
                slidesPerView: 4,
                slidesPerGroup: 4
            }
        },
        on: {
            afterInit: function () {
                const lightboxes = document.querySelectorAll('.swiper-slide-duplicate [data-lightbox]');
                if (lightboxes.length) {
                    import('glightbox')
                        .then(({ default: GLightbox }) => {
                            lightboxes.forEach(lightbox => {
                                new GLightbox({
                                    selector: '[data-lightbox][data-group="' + lightbox.getAttribute('data-group') + '"]'
                                });
                            });
                        });
                }
            }
        }
    };

    switch (carousel.dataset.config) {
        case 'testimonials':
            // Remove responsive breakpoints - 1 slide at a time
            const config_testimonials = Object.assign({}, swiper_config_default, {
                breakpoints: {}
            });
            return config_testimonials;
        default:
            return swiper_config_default;
    }
}
