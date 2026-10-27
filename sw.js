// Offline support: always try the network first (bypassing stale browser caches), fall back to the cached copy when offline.
// Also receives files shared to the installed app (Android: WhatsApp → Share → Tata Ibadah).
const CACHE = "tata-ibadah-v20";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
const CDN = ["cdnjs.cloudflare.com", "fonts.googleapis.com", "fonts.gstatic.com"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE && k !== "ti-share").map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method === "POST" && url.origin === self.location.origin && url.searchParams.get("shared") === "1") {
    e.respondWith((async () => {
      try {
        const form = await e.request.formData();
        const file = form.getAll("file").find((f) => f && typeof f === "object" && f.size);
        if (file) {
          const c = await caches.open("ti-share");
          await c.put(new URL("shared-file", self.registration.scope).href, new Response(file, { headers: { "content-type": file.type || "application/octet-stream", "x-name": encodeURIComponent(file.name || "Tata Ibadah.docx") } }));
        }
      } catch (err) {}
      return Response.redirect(new URL("./?shared=1", self.registration.scope).href, 303);
    })());
    return;
  }
  if (e.request.method !== "GET") return;
  if (url.origin !== self.location.origin && !CDN.includes(url.hostname)) return;
  // own files: always ask the server for the newest copy (no stale browser cache)
  const req = url.origin === self.location.origin ? new Request(e.request, { cache: "no-cache" }) : e.request;
  e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
});
