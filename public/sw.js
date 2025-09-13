const CACHE_NAME = 'austindest-v2';
const STATIC_CACHE = 'austindest-static-v2';
const DYNAMIC_CACHE = 'austindest-dynamic-v2';

const urlsToCache = [
  '/',
  '/static/css/',
  '/static/js/',
  '/images/a1.webp',
  '/images/a2.webp',
  '/images/a3.webp',
  '/images/a4.webp',
  '/fonts/Monoton-Regular.woff2',
  '/logo.png',
  '/favicon.ico',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then(response => {
      if (response) {
        return response;
      }

      return fetch(request).then(fetchResponse => {
        // Don't cache if not a valid response
        if (
          !fetchResponse ||
          fetchResponse.status !== 200 ||
          fetchResponse.type !== 'basic'
        ) {
          return fetchResponse;
        }

        // Clone the response
        const responseToCache = fetchResponse.clone();

        caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(request, responseToCache);
        });

        return fetchResponse;
      });
    })
  );
});
