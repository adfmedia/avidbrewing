import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect'

// Set as alpine.js plugin
Alpine.plugin(intersect)

window.Alpine = Alpine;
Alpine.start();
