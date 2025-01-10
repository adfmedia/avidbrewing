window.addEventListener('load', () => {
    const cookieBanner = document.querySelector('[data-cookie-banner]');
    const cookieNameClosed = typeof (COOKIE_BANNER_CNAME_CLOSED) != 'undefined' ? COOKIE_BANNER_CNAME_CLOSED : false;
    const cookieNameAccepted = typeof (COOKIE_BANNER_CNAME_ACCEPTED) != 'undefined' ? COOKIE_BANNER_CNAME_ACCEPTED : false;
    const cookieNameRejected = typeof (COOKIE_BANNER_CNAME_REJECTED) != 'undefined' ? COOKIE_BANNER_CNAME_REJECTED : false;
    const cookieNameStatus = typeof (COOKIE_BANNER_CNAME_STATUS) != 'undefined' ? COOKIE_BANNER_CNAME_STATUS : false;
    
    if (!cookieBanner || !cookieNameClosed || !cookieNameAccepted) { return; }

    const getCookie = (cname) => {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    const setCookie = (cname, value, days) => {
        if (typeof (days) == 'undefined') {
            days = 365;
        }
        const expiry_ms = (1000 * 60 * 60 * 24 * parseInt(days));
        const now = new Date().getTime();
        const expiry = new Date(now + expiry_ms);
        const secure = typeof (COOKIE_SECURE) != 'undefined' && COOKIE_SECURE ? 'secure' : '';

        document.cookie = cname + '=; expires=0; path=/;' + secure;
        document.cookie = cname + '=' + value + '; expires=' + expiry.toUTCString() + '; path=/;' + secure;
    }

    const fireConsentTags = (type, state) => {
        window.dataLayer = window.dataLayer || [];

        function gtag() { dataLayer.push(arguments); }
        gtag('consent', type, {
            'ad_storage': state ? 'granted' : 'denied',
            'ad_user_data': state ? 'granted' : 'denied',
            'ad_personalization': state ? 'granted' : 'denied',
            'analytics_storage': state ? 'granted' : 'denied'
        });

        window.dataLayer.push({
            event: 'cookie-state-update'
        });
    };

    const defaultState = cookieBanner.dataset.defaultState == 'true';
    const cookieState = getCookie(cookieNameStatus);

    const closeBtn = cookieBanner.querySelector('[data-close-btn]');
    const acceptBtn = cookieBanner.querySelector('[data-accept-btn]');
    const rejectBtn = cookieBanner.querySelector('[data-reject-btn]');

    // If no cookie status is set, use default state
    if(!cookieState) {
        fireConsentTags('default', defaultState);
        // If no option to reject, set the cookie state to the default, ready for override
        if (!rejectBtn) {
            setCookie(cookieNameStatus, defaultState ? 'accepted' : 'rejected');
        }
    }
    else {
        fireConsentTags('default', cookieState == 'accepted')
    }  
    
    // Already closed, do nothing
    const bannerClosed = getCookie(cookieNameClosed);
    if (bannerClosed.length && bannerClosed !== false) { return; }

    const closeBanner = () => {
        setCookie(cookieNameClosed, true);
        cookieBanner.classList.add('translate-y-full');
    };

    if (closeBtn) {
        closeBtn.onclick = (e) => {
            e.preventDefault();
            closeBanner();
        }
    }

    if (acceptBtn) {
        acceptBtn.onclick = (e) => {
            e.preventDefault();
            setCookie(cookieNameAccepted, true);
            closeBanner();

            setCookie(cookieNameStatus, 'accepted');
            fireConsentTags('update', true);

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'cookies-accepted'
            });
        };
    }

    if(rejectBtn) {
        rejectBtn.onclick = (e) => {
            e.preventDefault();
            setCookie(cookieNameStatus, 'rejected');
            setCookie(cookieNameRejected, true);
            fireConsentTags('update', false);
            closeBanner();

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'cookies-rejected'
            });
        };
    }

    cookieBanner.classList.remove('translate-y-full');
});