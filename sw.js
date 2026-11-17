var CACHE='holy-notes-v1';
var FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE}).map(function(n){return caches.delete(n)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(n){if(new URL(e.request.url).origin===location.origin){var cp=n.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp)})}return n}).catch(function(){return caches.match('./index.html')})}))});
