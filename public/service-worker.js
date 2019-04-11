const CACHE_NAME = "cache-v1";
const assetToCache = [
  "/",
];
self.addEventListener("install", function(event) {
  console.log("installing");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(assetToCache);
      })
      .catch(console.error)
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response; //return the matching entry found
      }
      return fetch(event.request);
    })
  );
});