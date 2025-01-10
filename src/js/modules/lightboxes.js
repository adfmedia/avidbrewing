export function bindLightboxes(lboxLinks) {
    import('glightbox')
        .then(({ default: GLightbox }) => {
            lboxLinks.forEach(lboxLink => {
                const glbox = new GLightbox({
                    selector: '[data-lightbox][data-group="' + lboxLink.dataset.group + '"]'
                });

                glbox.on('open', () => {
                    const ifr = glbox.modal.querySelector('iframe');
                    if (ifr) {
                        ifr.addEventListener('load', () => {
                            const close = ifr.contentWindow.document.body.querySelector('[data-close]');
                            if (close) {
                                close.onclick = (evt) => {
                                    evt.preventDefault();
                                    glbox.close();
                                }
                            }
                        });
                    }
                });
            });
        });
    
    if (typeof (LIGHTBOX_CSS) != 'undefined') {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = LIGHTBOX_CSS;
        css.type = 'text/css';
        document.querySelector('body').appendChild(css);
    }
}