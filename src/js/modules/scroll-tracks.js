export function bindScrollTrack(scrollTrack) {
    const items = scrollTrack.querySelectorAll('[data-scroll-item]');
    if (!items.length) { return; }

    const toggleOnOffset = parseInt(scrollTrack.dataset.scrollOffset);
    const header = document.querySelector('[data-main-header]');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    let itemsToggled = 0;
    const itemScrollToggle = () => {
        for (const item of items) {
            if (
                !item.dataset.toggled &&
                (item.getBoundingClientRect().top - headerHeight) <= toggleOnOffset
            ) {
                for (const elem of item.querySelectorAll('[data-scroll-class]')) {
                    const elemClasses = JSON.parse(elem.dataset.scrollClass);
                    if (typeof elemClasses.add != 'undefined') {
                        elem.classList.add(elemClasses.add);
                    }
                    if (typeof elemClasses.remove != 'undefined') {
                        elem.classList.remove(elemClasses.remove);
                    }
                }

                item.dataset.toggled = true;
                itemsToggled++;
            }
        }

        if (itemsToggled >= items.length) {
            document.removeEventListener('scroll', itemScrollToggle, {passive: true});
        }
    };
    document.addEventListener('scroll', itemScrollToggle, {passive: true});
}