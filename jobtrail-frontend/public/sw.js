// const CACHE = "jobtrail-v1";
// const ASSETS = ["/", "/dashboard"];

// self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
// self.addEventListener("fetch", e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
const CACHE = "jobtrail-v1";
const ASSETS = ["/", "/dashboard"];

self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));

self.addEventListener("fetch", e => {
  if (e.request.url.includes("localhost:8080")) return; // let API calls pass through normally
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});