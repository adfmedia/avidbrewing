export function bindLoadMore(wrapper) {
    let page = 1;
    const url = wrapper.dataset.url;
    const listings = wrapper.querySelector('[data-listings]');
    const btn = wrapper.querySelector('[data-load-more-btn]');

    if (!url || !listings || !btn) {
        return;
    }

    btn.onclick = (e) => {
        e.preventDefault();

        page++;

        const btn_url = btn.getAttribute('href');
        history.pushState({}, '', btn_url);

        fetch(
            url + (url.includes('?') ? '&' : '?') + 'page=' + page,
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        )
        .then(resp => resp.json())
        .then(json => {
            if (json.listings) {
                const new_listings = new DOMParser().parseFromString(json.listings, 'text/html').body.childNodes;
                for (const listing of new_listings) {
                    listings.append(listing);
                }
            }

            if (!json.has_more) {
                btn.remove();
            } else {
                btn.setAttribute('href', btn_url.replace('page=' + page, 'page=' + (page+1)));
            }
        })
        .catch(() => {
            btn.remove();
        });
    }
}