export function loadRecaptcha() {
    if (typeof CAPTCHAKEY != 'undefined' && CAPTCHAKEY) {
        injectScript();
    }
}

function injectScript() {
    const scrpt = document.createElement('script');
    scrpt.src = 'https://www.google.com/recaptcha/api.js?render=' + CAPTCHAKEY;
    scrpt.async = true;
    scrpt.defer = true;
    document.querySelector('body').appendChild(scrpt);
}

export function getRecaptchaToken(site_action) {
    if (typeof CAPTCHAKEY == 'undefined' || !CAPTCHAKEY) { return false; }
    if (typeof grecaptcha == 'undefined') { return false; }

    return grecaptcha.execute(CAPTCHAKEY, {action: site_action});
}