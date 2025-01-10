
if (typeof ALPJS != 'undefined' && ALPJS) {
    import('./modules/alpine');
}

// Helper function
let domReady = (cb) => {
    document.readyState === 'interactive' || document.readyState === 'complete'
        ? cb()
        : document.addEventListener('DOMContentLoaded', cb);
};

domReady(() => {
    // Display body when DOM is loaded
    document.body.style.visibility = 'visible';
});

/* Vite static assets */
import.meta.glob([
    '../fonts/**',
    '../images/**',
]);



window.addEventListener('load', () => {
    /* Mobile nav */
    const mobNavToggle = document.querySelector('[data-mobile-nav-toggle]');
    const mobNav = document.querySelector('[data-mobile-nav]');
    if (mobNavToggle && mobNav) {
        const mobNavInner = mobNav.querySelector('[data-mobile-nav-inner]');
        if (mobNavInner.hasAttribute('data-sticky-header')) {
            const stickyHeader = document.querySelector(mobNavInner.dataset.stickyHeader);
            if (stickyHeader) {
                mobNavInner.style.paddingTop = stickyHeader.offsetHeight + 'px';
            }
        }

        mobNavToggle.onclick = (e) => {
            e.preventDefault();
            mobNav.classList.toggle('hidden');
            document.querySelector('body').classList.toggle('overflow-hidden');

            const openIcon = mobNavToggle.querySelector('[data-open-icon]');
            const closeIcon = mobNavToggle.querySelector('[data-close-icon]');
            if (openIcon && closeIcon) {
                openIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            }
        };

        const subLinks = mobNav.querySelectorAll('[data-has-sub]');
        for (const subLink of subLinks) {
            const toggle = subLink.querySelector('[data-sub-toggle]');
            const icon = subLink.querySelector('[data-sub-icon]');
            const nav = subLink.querySelector('[data-sub-nav]');

            if (toggle && nav) {
                toggle.onclick = (e) => {
                    e.preventDefault();
                    nav.classList.toggle('hidden');

                    if (icon) {
                        icon.classList.toggle('rotate-180');
                    }
                }
            }
        }
    }
    /* END Mobile nav */


    const cmsForms = document.querySelectorAll('[data-cms-form]');
    if (cmsForms.length) {
        import('./modules/form-submissions')
            .then(({ bindCmsForms }) => {
                bindCmsForms(cmsForms);
            });
    }

    const lightboxes = document.querySelectorAll('[data-lightbox]');
    if (lightboxes.length) {
        import('./modules/lightboxes')
            .then(({ bindLightboxes }) => {
                bindLightboxes(lightboxes);
            });
    }

    const carousels = document.querySelectorAll('[data-carousel]');
    if (carousels.length) {
        import('./modules/carousels')
            .then(({ bindCarousels }) => {
                bindCarousels(carousels);
            });
    }

    const accordionWraps = document.querySelectorAll('[data-accordion-wrap]');
    if (accordionWraps.length) {
        import('./modules/accordions')
            .then(({ bindAccordions }) => {
                bindAccordions(accordionWraps);
            })
    }

    const maps = document.querySelectorAll('[data-map]');
    if (maps.length) {
        import('./modules/maps')
            .then(({ bindMaps }) => {
                bindMaps(maps);
            });
    }

    const loadMores = document.querySelectorAll('[data-load-more]');
    if (loadMores.length) {
        import('./modules/load-more')
            .then(({ bindLoadMore }) => {
                for (const loadMore of loadMores) {
                    bindLoadMore(loadMore);
                }
            })
    }

    const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
    if (dropdownToggles.length) {
        import('./modules/dropdown-toggles')
            .then(({ bindDropdownToggles }) => {
                bindDropdownToggles(dropdownToggles);
            });
    }

    const scrollTracks = document.querySelectorAll('[data-scroll-track]');
    if (scrollTracks.length) {
        import('./modules/scroll-tracks')
            .then(({ bindScrollTrack }) => {
                for (const scrollTrack of scrollTracks) {
                    bindScrollTrack(scrollTrack);
                }
            });
    }



});

window.carousel = function () {
    return {
        container: null,
        prev: null,
        next: null,
        init() {
            this.container = this.$refs.container

            this.update();

            this.container.addEventListener('scroll', this.update.bind(this), {passive: true});
        },
        update() {
            const rect = this.container.getBoundingClientRect();

            const visibleElements = Array.from(this.container.children).filter((child) => {
                const childRect = child.getBoundingClientRect()

                return childRect.left >= rect.left && childRect.right <= rect.right;
            });

            if (visibleElements.length > 0) {
                this.prev = this.getPrevElement(visibleElements);
                this.next = this.getNextElement(visibleElements);
            }
        },
        getPrevElement(list) {
            const sibling = list[0].previousElementSibling;

            if (sibling instanceof HTMLElement) {
                return sibling;
            }

            return null;
        },
        getNextElement(list) {
            const sibling = list[list.length - 1].nextElementSibling;

            if (sibling instanceof HTMLElement) {
                return sibling;
            }

            return null;
        },
        scrollTo(element) {
            const current = this.container;

            if (!current || !element) return;

            const nextScrollPosition =
                element.offsetLeft +
                element.getBoundingClientRect().width / 2 -
                current.getBoundingClientRect().width / 2;

            current.scroll({
                left: nextScrollPosition,
                behavior: 'smooth',
            });
        }
    };
}

