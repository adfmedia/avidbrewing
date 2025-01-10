export function bindAccordions(wrappers) {
    for (const wrapper of wrappers) {
        for (const item of wrapper.querySelectorAll('[data-accordion-item]')) {
            const toggle = item.querySelector('[data-item-toggle]');
            if (toggle) {
                toggle.onclick = (e) => {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            }
        }
    }
}