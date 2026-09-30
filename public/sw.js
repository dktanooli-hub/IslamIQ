// IslamIQ Local Service Worker for offline-first notifications and PWA support
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  const targetTab = data.tab || 'home';
  const targetSection = data.section || '';
  const targetPath = data.url || (targetTab === 'salah' ? '/?tab=salah' : (targetSection === 'daily' ? '/?tab=daily' : '/?tab=home'));

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // 1. If an existing IslamIQ tab is open, focus it and tell it to navigate in-place
      for (const client of clientList) {
        if ('url' in client && client.url.startsWith(self.location.origin)) {
          if ('postMessage' in client) {
            client.postMessage({
              type: 'ISLAMIQ_NAVIGATE_TAB',
              tab: targetTab,
              section: targetSection
            });
          }
          if ('focus' in client) {
            client.focus();
          }
          return;
        }
      }

      // 2. If no matching window is currently open, open the live target URL directly
      const fullUrl = new URL(targetPath, self.location.origin).href;
      if (self.clients.openWindow) {
        return self.clients.openWindow(fullUrl);
      }
    })
  );
});
