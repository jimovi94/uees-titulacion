var CACHE_NAME = '';
var urlsToCache = [
	'/',
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(fetch(event.request));
});