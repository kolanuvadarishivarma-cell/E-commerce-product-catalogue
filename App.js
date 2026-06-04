import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Prevent double-loading on React strict mode re-renders
    if (window.__scriptsLoaded) return;
    window.__scriptsLoaded = true;

    const scripts = [
      '/vanilla/data.js',
      '/vanilla/state.js',
      '/vanilla/render.js',
      '/vanilla/app.js',
      '/vanilla/auth.js',
    ];

    let loaded = 0;
    scripts.forEach((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => {
        loaded++;
        if (loaded === scripts.length) {
          window.lucide && window.lucide.createIcons();
        }
      };
      document.body.appendChild(script);
    });
  }, []);

  return null;
}

export default App;