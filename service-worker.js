// Archivos para cachear
const CACHE_NAME = "pwa-clock-cache-v1";
const ASSETS = [
    "./",
    "./index.html",
    "./styles.css",const CACHE_NAME = "pwa-reloj-cache-v1";
    const urlsToCache = [
      "./index.html",
      "./styles.css",
      "./script.js",
      "./manifest.json",
      "./icon-192.png",
      "./icon-512.png"
    ];
    
    self.addEventListener("install", event => {
      event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(urlsToCache);
        })
      );
    });
    
    self.addEventListener("fetch", event => {
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request);
        })
      );
    });
    
    self.addEventListener("activate", event => {
      event.waitUntil(
        caches.keys().then(cacheNames =>
          Promise.all(
            cacheNames.map(cache => {
              if (cache !== CACHE_NAME) {
                return caches.delete(cache);
              }
            })
          )
        )
      );
    });
    
    "./script.js",
    "./manifest.json",
    "./icon.png",
    "./icon-512.png"
];

// Instalación del Service Worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activación del Service Worker
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

// Interceptación de peticiones
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
