export function bindDropdownToggles (dropdownToggles) {
    for (const dropdownToggle of dropdownToggles) {
        dropdownToggle.onclick = (e) => {
            e.preventDefault();

            const icon = dropdownToggle.querySelector('[data-toggle-icon]');
            const target = document.getElementById(dropdownToggle.getAttribute('aria-controls'));

            if (target) {
                target.classList.toggle(target.dataset.toggleClass ?? 'open');
            }

            if (icon) {
                const activeClass = icon.dataset.activeClass ?? 'active';
                const inactiveClass = icon.dataset.inactiveClass ?? 'inactive';

                const classTarget = icon.dataset.toggleClassOnIcon == 'true' ? icon : dropdownToggle;
                if (classTarget.classList.contains(activeClass)) {
                    classTarget.classList.replace(activeClass, inactiveClass);
                } else {
                    classTarget.classList.replace(inactiveClass, activeClass);
                }
            }

            document.addEventListener('click', clickOutsideDropdown);
        };

        const selectWrap = dropdownToggle.closest('[data-dropdown-wrap]');
        if (selectWrap) {
            const options = selectWrap.querySelectorAll('[data-dropdown-option]');
            if (options.length) {
                const label = selectWrap.querySelector('[data-dropdown-label]');
                const select = selectWrap.querySelector('[data-dropdown-select]');

                for (const option of options) {
                    option.addEventListener('click', () => {
                        if (select) {
                            select.value = option.dataset.dropdownOption;
                            select.dispatchEvent(new Event('change'));
                        }

                        if (label) {
                            label.innerText = option.innerText;
                        }

                        if (option.hasAttribute('data-toggles')) {
                            const toggleable = document.getElementById(option.dataset.toggles);
                            if (toggleable && toggleable.hasAttribute('data-toggleable')) {
                                const toggleableWrap = toggleable.closest('[data-toggleable-wrap]');
                                if (toggleableWrap) {
                                    const otherToggleables = toggleableWrap.querySelectorAll('[data-toggleable]');
                                    for (const otherToggleable of otherToggleables) {
                                        otherToggleable.classList.add(otherToggleable.dataset.hiddenClass ?? 'hidden');
                                    }
                                }
                                toggleable.classList.remove(toggleable.dataset.hiddenClass ?? 'hidden');
                            }
                        }

                        dropdownToggle.dispatchEvent(new Event('click'));
                    });
                }
            }
        }
    }
}

function clickOutsideDropdown (e) {
    if (e.target.hasAttribute('data-dropdown-toggle') || e.target.closest('[data-dropdown-toggle]')) {
        return;
    }

    for (const toggle of document.querySelectorAll('[data-dropdown-toggle]')) {
        const toggleClass = toggle.dataset.toggleClass ?? 'open';
        if (toggle.classList.contains(toggleClass)) {
            toggle.dispatchEvent(new Event('click'));
        }
    }

    document.removeEventListener('click', clickOutsideDropdown);
}