self.addEventListener('install', function(event) {
  // インストール処理
  console.log('install できました!!');
});

self.addEventListener('activate', function(event) {
  // 有効化
  console.log('activate できました!!');
});

self.addEventListener('fetch', function(event) {
  console.log('proxied', event.request.url);
  
  if (
    [
      'https://teramotodaiki.github.io/service-worker-test/',
      'https://teramotodaiki.github.io/service-worker-test/index.html'
    ].includes(event.request.url) === false
  ) {
    // スルー
    event.respondWith(
      fetch(event.request)
    );
    return;
  }

  const html = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Service Worker Test</title>
        <script type="text/javascript">
            console.log('sw', 'serviceWorker' in navigator);
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('./sw.js?_=${new Date().getTime()}').then(function(registration) {
                // 登録成功
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
              }).catch(function(err) {
                // 登録失敗 :(
                console.log('ServiceWorker registration failed: ', err);
              });
            }
        </script>
    </head>
    <body>
        おめでとうございます！キャッシュです！ 10
    </body>
</html>
`;
  const file = new Blob([html], {
    type: 'text/html',
  });
  
  event.respondWith(
    Promise.resolve(
      new Response(file)
    )
  );
});

