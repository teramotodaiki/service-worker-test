self.addEventListener('install', function(event) {
  // インストール処理
  console.log('install できました!!');
});

self.addEventListener('activate', function(event) {
  // 有効化
  console.log('activate できました!!');
});

self.addEventListener('fetch', function(event) {
  console.log('プロキシできました!!!!');

  const html = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Service Worker Test</title>
        <script type="text/javascript">
            alert('このアラートはキャッシュされたHTMLからのアレです！');

            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('./sw.js').then(function(registration) {
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
        おめでとうございます！キャッシュです！
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

