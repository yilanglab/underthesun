/**
 * Get the asset path with basePath prefix for GitHub Pages deployment
 * In production (GitHub Pages), assets need the /underthesun prefix
 * In development, no prefix is needed
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In browser, check if we're on GitHub Pages
  if (typeof window !== 'undefined') {
    // If pathname starts with /underthesun, we're on GitHub Pages
    if (window.location.pathname.startsWith('/underthesun')) {
      return `/underthesun/${cleanPath}`;
    }
  }
  
  // For SSR or local dev, use env var
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}/${cleanPath}`;
}
