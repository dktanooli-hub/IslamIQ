// IslamIQ Local Service Worker for offline-first notifications and PWA support
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // Root URL of the existing live site without any special path, query, or hash
  const rootUrl = self.registration.scope || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 1. If IslamIQ is already open, focus the existing IslamIQ window/tab
      for (const client of clientList) {
        if ('url' in client && client.url.startsWith(self.registration.scope)) {
          if ('focus' in client) {
            return client.focus();
          }
        }
      }

      // 2. If it is not open, open the exact existing live site root URL
      if (self.clients.openWindow) {
        return self.clients.openWindow(rootUrl);
      }
    })
  );
});
