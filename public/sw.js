const CACHE_NAME = 'cache-v9'

const filesToCache = [
  'offline.html',
  'offline.css',
  'offline.svg',
  'presentation.svg',
  'manifest.json',
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'logo-192x192.png',
  'logo-512x512.png',
  'logo-maskable.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(filesToCache)
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request)
    }).catch(error => {
      return caches.match('offline.html');
    })
  );
});


self.addEventListener('activate', event => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});