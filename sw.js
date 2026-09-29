// Service worker AETHER — build b59834d. Cache-first utk aset, network-first utk halaman utama.
const CACHE = 'aether-b59834d';
const ASSETS = [
 "./",
 "index.html",
 "manifest.webmanifest",
 "vendor/chart.umd.min.js",
 "icons/apple-touch-icon.png",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon-maskable-512.png",
 "icons/wordmark.png",
 "fonts/jetbrains-mono-latin-400-normal.woff2",
 "fonts/jetbrains-mono-latin-500-normal.woff2",
 "fonts/jetbrains-mono-latin-600-normal.woff2",
 "fonts/space-grotesk-latin-400-normal.woff2",
 "fonts/space-grotesk-latin-500-normal.woff2",
 "fonts/space-grotesk-latin-600-normal.woff2",
 "fonts/space-grotesk-latin-700-normal.woff2"
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => { const cp = res.clone(); caches.open(CACHE).then((c) => c.put('index.html', cp)); return res; })
                  .catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
