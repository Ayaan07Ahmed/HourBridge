const CACHE_NAME = 'hourbridge-v12';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './favicon.svg',
    './world-map.svg',
    './manifest.json'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET') return; // Don't intercept non-GET

    e.respondWith(
        caches.match(req).then(cached => {
            if (cached) return cached;
            return fetch(req).then(response => {
                // Cache successful GET responses (opaque responses from CDN too)
                if (response && (response.status === 200 || response.type === 'opaque')) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
                }
                return response;
            }).catch(() => cached); // If network fails and no cache, let it error
        })
    );
});
