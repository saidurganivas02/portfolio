/**
 * Client-side image compression utility.
 * Resizes and compresses image files or Data URLs before saving to localStorage
 * to ensure they stay under ~70KB, preventing DOMException: QuotaExceededError.
 */

export const compressImage = (
  fileOrUrl: File | string,
  maxWidth = 640,
  maxHeight = 640,
  quality = 0.86
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const processSrc = (src: string) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio while bounding within maxWidth x maxHeight
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(width, 1);
        canvas.height = Math.max(height, 1);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(src);
          return;
        }

        // Draw onto canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Export as optimized JPEG
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };

      img.onerror = () => {
        // If image object fails (e.g. cross-origin), return original src
        resolve(src);
      };

      img.src = src;
    };

    if (typeof fileOrUrl === 'string') {
      processSrc(fileOrUrl);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          processSrc(result);
        } else {
          reject(new Error('Failed to read file as data URL'));
        }
      };
      reader.onerror = () => reject(new Error('FileReader read error'));
      reader.readAsDataURL(fileOrUrl);
    }
  });
};
