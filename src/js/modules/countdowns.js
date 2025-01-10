export function checkForCountdowns() {
    const countdowns = document.querySelectorAll('[data-countdown]');
    if (countdowns.length) {
        bindCountdowns(countdowns);
    }
}

function bindCountdowns(countdowns) {
    for (const countdown of countdowns) {
        if (!countdown.dataset.bound) {
            let intvl;
            intvl = setInterval(() => {countdownTicker(countdown, intvl)}, 1000);
            countdownTicker(countdown, intvl);
            countdown.dataset.bound = 'true';
        }
    }
}

function countdownTicker(countdown, interval) {
    const date = countdown.dataset.date;
    const days = countdown.querySelector('[data-days]');
    const hrs = countdown.querySelector('[data-hrs]');
    const mins = countdown.querySelector('[data-mins]');
    const secs = countdown.querySelector('[data-secs]');

    const CloseD = new Date(date);
    const Now = new Date();
    const distance = CloseD.getTime() - Now.getTime();

    if (distance < 0) {
        if (interval) {
            clearInterval(interval);
        }
        return false;
    }

    const days_in_ms = 1000*60*60*24;
    const hrs_in_ms = 1000*60*60;
    const mins_in_ms = 1000*60;
    days.innerText = Math.floor(distance / days_in_ms);
    hrs.innerText = Math.floor((distance % days_in_ms) / hrs_in_ms);
    mins.innerText = Math.floor((distance % hrs_in_ms) / mins_in_ms);
    secs.innerText = Math.floor((distance % mins_in_ms) / 1000);
}