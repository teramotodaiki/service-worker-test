self.addEventListener('install', function(event) {
  // インストール処理
  console.log('インストールできました!!');
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

