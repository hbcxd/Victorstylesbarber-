const CACHE_NAME = 'victor-styles-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/admin.html',
  '/styles.css',
  '/IMAGENES/LOGO.png',
  '/IMAGENES/Hero.jpg'
];

// Instalar el Service Worker y almacenar archivos esenciales
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Responder con los archivos guardados en caché si no hay internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
