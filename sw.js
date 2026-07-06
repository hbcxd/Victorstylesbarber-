const CACHE_NAME = 'sistema-v4.6';
const ASSETS = [
  '/',
  '/index.html',
  '/admin.html',
  '/manifest.json'
];

// Instalar el Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activar y limpiar cachés viejas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Responder desde la caché o buscar en la red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
// Escuchar el mensaje para forzar la actualización
self.addEventListener('message', (evento) => {
  if (evento.data && evento.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

