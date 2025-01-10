export function bindCmsForms(forms) {
    let recaptchaInjected = false;
    for (const form of forms) {
        form.onsubmit = (e) => {
            e.preventDefault();

            if (form.dataset.recaptcha == "true") {
                import('./recaptcha')
                    .then(({ getRecaptchaToken }) => {
                        getRecaptchaToken()
                        .then(token => {
                            submitForm(form, token);
                        })
                    });
            } else {
                submitForm(form);
            }
        }

        if (form.dataset.recaptcha == "true" && !recaptchaInjected) {
            import('./recaptcha')
                .then(({ loadRecaptcha }) => {
                    for (const input of form.querySelectorAll('input, select, textarea')) {
                        input.addEventListener('focus', () => {
                            if (!recaptchaInjected) {
                                loadRecaptcha();
                                recaptchaInjected = true;
                            }
                        });
                    }
                });
        }
    }
}

function submitForm(form, captcha_token) {
    const fieldWrap = form.querySelector('[data-field-wrap]');
    const loader = form.querySelector('[data-loader]');
    const errorOutput = form.querySelector('[data-error]');
    const genericErrorOutput = form.querySelector('[data-generic-error]');
    const successOutput = form.querySelector('[data-success]');

    if (form.dataset.sending == "1") { return false; }
    form.setAttribute('data-sending', 1);

    if (loader) {
        loader.classList.remove('hidden');
    }

    for (const errMsg of form.querySelectorAll('[data-field-error]')) {
        errMsg.remove();
    }
    if (errorOutput) {
        errorOutput.classList.add('hidden');
    }
    if (genericErrorOutput) {
        genericErrorOutput.classList.add('hidden');
    }

    let submitUrl = '/ajax/form/submit';
    if (form.hasAttribute('data-url')) {
        submitUrl = form.dataset.url;
    }

    const postBody = new FormData(form);
    if (captcha_token) {
        postBody.append('g-recaptcha-response', captcha_token);
    }

    fetch(
        submitUrl,
        {
            method: form.getAttribute('method'),
            body: postBody,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
    )
    .then(resp => resp.json())
    .then(json => {
        if (json.success) {
            if (json.ga4_event) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'ga4_event',
                    ga4_event: json.ga4_event
                });
            }


            for (const inputToClear of form.querySelectorAll('[data-clear-on-success]')) {
                inputToClear.value = '';
            }

            if (successOutput) {
                successOutput.classList.remove('hidden');
            }

            if (json.token) {
                document.querySelector('[name="csrf-token"]').setAttribute('content', json.token);
                for (const tokenField of document.querySelectorAll('[name="_token"]')) {
                    tokenField.value = json.token;
                }
            }
            
            if (json.redirect) {
                window.location.href = json.redirect;
            }
            else if (json.delayed_redirect && json.delay_time) {
                setTimeout(() => {
                    window.location.href = json.delayed_redirect;
                }, json.delay_time);
            }
            else {
                if (fieldWrap) {
                    fieldWrap.classList.add('hidden');
                }

                form.dispatchEvent(new CustomEvent('form-success'));
            }
        } else {
            if (json.errors) {
                let firstError = false;
                for (const field_name in json.errors) {
                    let message = json.errors[field_name];
                    if (typeof (message) == 'object') { message = message[0]; }

                    const fieldWrap = form.querySelector('[data-field="' + field_name + '"]');
                    const err_html = '<div data-field-error class="error-message">' + message + '</div>';
                    const err_dom = new DOMParser().parseFromString(err_html, 'text/html').body.childNodes[0];

                    fieldWrap.appendChild(err_dom);
                    if (!firstError) {
                        firstError = fieldWrap;
                    }
                }

                if (errorOutput) {
                    errorOutput.classList.remove('hidden');
                }

                if (firstError) {
                    firstError.scrollIntoView();
                }
            }
        }

        if (loader) {
            loader.classList.add('hidden');
        }
    })
    .catch(() => {
        if (loader) {
            loader.classList.add('hidden');
        }
        if (genericErrorOutput) {
            genericErrorOutput.classList.remove('hidden');
        }
    })
    .finally(() => {
        form.removeAttribute('data-sending');
    });
}