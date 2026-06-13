<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <!-- PWA / Mobile -->
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Teneo" />
    <meta name="theme-color" content="#0F172A" />

    <!-- SEO -->
    <title>Teneo Node Dashboard</title>
    <meta name="description" content="Track your Teneo node contributions, fragments, and points in real-time." />

    <!-- Open Graph -->
    <meta property="og:title" content="Teneo Node Dashboard" />
    <meta property="og:description" content="Track your Teneo node contributions, fragments, and points in real-time." />
    <meta property="og:type" content="website" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root {
        height: 100%;
        background: #F5F7FA;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        overscroll-behavior: none;
      }
      ::-webkit-scrollbar { display: none; }
      body { scrollbar-width: none; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
