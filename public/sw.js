// IslamIQ Local Service Worker for offline-first notifications and PWA support
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const origin = self.location.origin;
  const targetUrl = origin + '/';

  event.waitUntil(
    self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      // 1. If an existing IslamIQ window is found, focus it and do NOT call openWindow()
      for (const client of clientList) {
        if ('url' in client && client.url.startsWith(origin)) {
          if ('focus' in client) {
            return client.focus();
          }
        }
      }

      // 2. Only if no existing IslamIQ window is found, open targetUrl
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
