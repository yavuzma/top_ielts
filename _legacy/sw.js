// Basit çevrimdışı önbellek — uygulama kabuğu
const CACHE = "ielts99-v2";
const ASSETS = [
  "./", "./index.html", "./styles.css", "./app.js", "./data.js",
  "./firebase-config.js", "./manifest.webmanifest", "./icon.svg"
];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate", e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch", e=>{
  const url = e.request.url;
  // Firebase/ağ isteklerini önbelleğe alma; sadece yerel dosyaları sun
  if(e.request.method!=="GET" || url.includes("firebase") || url.includes("googleapis") || url.includes("gstatic")){
    return; // tarayıcı normal şekilde halletsin
  }
  e.respondWith(
    caches.match(e.request).then(hit=> hit || fetch(e.request).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(e.request, copy)).catch(()=>{});
      return res;
    }).catch(()=>caches.match("./index.html")))
  );
});
