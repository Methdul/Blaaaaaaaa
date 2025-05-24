import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Immediately IIFE to set theme before app renders to prevent flicker
;(function() {
  try {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (_) {
    // If localStorage or matchMedia is not available, do nothing
    // The theme will default to light and can be toggled later by the user.
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
