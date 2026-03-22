const CACHE_NAME = 'random-restaurant-v5';
const urlsToCache = [
  'randomdish',
  'css/style.css',
  'js/main.js',
  'pic/logo.webp'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  // Always fetch from network and never cache during development
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});