import { reactive, ref } from 'vue';

interface CachedImage {
  dataUrl: string;
  timestamp: number;
  size: number;
}

class ImageCache {
  private cache = reactive<Map<string, CachedImage>>(new Map());
  private maxSize = 50 * 1024 * 1024; // 50MB max cache size
  private maxAge = 24 * 60 * 60 * 1000; // 24 hours

  get(key: string): string | null {
    const cached = this.cache.get(key);
    if (!cached) {
      return null;
    }

    // Check if cache entry is expired
    if (Date.now() - cached.timestamp > this.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return cached.dataUrl;
  }

  set(key: string, dataUrl: string): void {
    // Clean up old entries if cache is too large
    this.cleanup();

    this.cache.set(key, {
      dataUrl,
      timestamp: Date.now(),
      size: dataUrl.length
    });
  }

  private cleanup(): void {
    const entries = Array.from(this.cache.entries());
    const totalSize = entries.reduce((sum, [, value]) => sum + value.size, 0);

    if (totalSize > this.maxSize) {
      // Sort by timestamp (oldest first)
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

      // Remove oldest entries until we're under the limit
      let currentSize = totalSize;
      for (const [key, value] of entries) {
        if (currentSize <= this.maxSize * 0.8) {
          break;
        } // Leave some headroom

        this.cache.delete(key);
        currentSize -= value.size;
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }

  getStats() {
    const entries = Array.from(this.cache.values());
    return {
      count: entries.length,
      totalSize: entries.reduce((sum, entry) => sum + entry.size, 0),
      maxSize: this.maxSize
    };
  }
}

const imageCache = new ImageCache();

export function useImageCache() {
  const loadingImages = ref<Set<string>>(new Set());

  async function loadImage(
    imageId: string,
    loadFunction: () => Promise<string>
  ): Promise<string> {
    // Check cache first
    const cached = imageCache.get(imageId);
    if (cached) {
      return cached;
    }

    // Prevent duplicate loading
    if (loadingImages.value.has(imageId)) {
      // Wait for the existing load to complete
      return new Promise((resolve) => {
        const checkCache = () => {
          const result = imageCache.get(imageId);
          if (result) {
            resolve(result);
          } else {
            setTimeout(checkCache, 100);
          }
        };
        checkCache();
      });
    }

    loadingImages.value.add(imageId);

    try {
      const dataUrl = await loadFunction();
      imageCache.set(imageId, dataUrl);
      return dataUrl;
    } finally {
      loadingImages.value.delete(imageId);
    }
  }

  function preloadImage(
    imageId: string,
    loadFunction: () => Promise<string>
  ): void {
    if (!imageCache.get(imageId) && !loadingImages.value.has(imageId)) {
      loadImage(imageId, loadFunction);
    }
  }

  function clearCache(): void {
    imageCache.clear();
  }

  function getCacheStats() {
    return imageCache.getStats();
  }

  return {
    loadImage,
    preloadImage,
    clearCache,
    getCacheStats,
    loadingImages: loadingImages.value
  };
}
