// Ersetzt den alten Service Worker der Lern-App unter corsinusbambini.github.io/lernspiel/:
// löscht die gespeicherte alte Kopie, meldet sich ab und schickt offene Fenster zur neuen Adresse.
const NEW_URL = 'https://lernspiel.pages.dev/';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Nur die eigenen Caches: Cache Storage gilt für alle Projektseiten auf github.io gemeinsam.
    for (const key of await caches.keys()) {
      if (key.startsWith('lernspiel-')) await caches.delete(key);
    }
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(NEW_URL).catch(() => {});
  })());
});
