self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./",
                "./public/style.css",
                "./public/script.js",
                "./public/index.js",
                "./images/logo512.png",
                "./images/logo_transparent.png",
                "./Music/Background_Music.mp3",
                "./Music/Correct.ogg",
                "https://fonts.gstatic.com/s/chivo/v12/va9F4kzIxd1KFrjDY_Z2sK32QA.woff2",
                "https://fonts.gstatic.com/s/chivo/v12/va9F4kzIxd1KFrjDY_Z4sK0.woff2"
            ]);
        })
    )
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})