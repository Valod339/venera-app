const statCatch = "s-app-v6"
const staticAss = [
    'index.html',
    '/js/main.js',
    '/js/wow.min.js',
    '/mail/conf.php',
    '/css/main.css',
    '/css/animate.min.css'
]
self.addEventListener("install", async event =>{
    const catscs = await caches.open(statCatch)
    await catscs.addAll(staticAss)
})
self.addEventListener("activate", async event =>{
   const cName = await caches.keys()
    await Promise.all(
        cName.filter(name => name !== statCatch)
            .map(name => caches.delete(name))
    )
})

self.addEventListener("fetch", event =>{
    event.respondWith(catcheFrist(event.request))
})

async function catcheFrist(req){
    const chaced = await caches.match(req)
    return chaced ?? await fetch(req)
}