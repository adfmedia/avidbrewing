import { Loader } from "@googlemaps/js-api-loader"

export function bindMaps(maps) {
    for (const map of maps) {
        switch (map.dataset.map) {
            case 'offices-listing':
                officesListingMap(map);
                break;
        }
    }
}

async function officesListingMap(mapEl) {
    const loader = new Loader({
        apiKey: (typeof GMAP_API_KEY != 'undefined' ? GMAP_API_KEY : ''),
        version: 'weekly'
    });

    loader.load().then(async () => {
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        const { LatLngBounds } = await google.maps.importLibrary("core");

        const map = new Map(mapEl, {
            mapId: mapEl.dataset.id,
            center: {lat: 0, lng: 0},
            zoom: 8,
            maxZoom: 15
        });

        const myBounds = new LatLngBounds();
        for (const officeTile of document.querySelectorAll('[data-office]')) {
            const officePos = { 
                lat: parseFloat(officeTile.dataset.lat), 
                lng: parseFloat(officeTile.dataset.lng)
            };
            const officeMarker = new AdvancedMarkerElement({
                map: map,
                position: officePos
            });
            myBounds.extend(officePos);
        }
        map.fitBounds(myBounds);

        mapEl.classList.remove('hidden');
    });
}