/**
 * Utility functions for handling image operations
 */

export interface ImageData {
  id: string;
  data: string; // base64 encoded
  mimeType: string;
}

/**
 * Converts a File to base64 encoded data
 */
export function fileToBase64(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const result = reader.result as string;
        if (!result) {
          throw new Error('FileReader returned empty result');
        }

        // Remove the data URL prefix to get just the base64 data
        const base64Data = result.split(',')[1];
        if (!base64Data) {
          throw new Error('Invalid file format');
        }

        resolve({
          id: crypto.randomUUID(),
          data: base64Data,
          mimeType: file.type
        });
      } catch (error) {
        reject(
          new Error(
            `Failed to process file: ${error instanceof Error ? error.message : 'Unknown error'}`
          )
        );
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Converts base64 data to a data URL for display
 */
export function base64ToDataUrl(base64Data: string, mimeType: string): string {
  return `data:${mimeType};base64,${base64Data}`;
}

/**
 * Validates if a file is a valid image
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
}

/**
 * Compresses an image file to reduce size
 */
export function compressImage(
  file: File,
  maxWidth: number = 800,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    img.onload = () => {
      try {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Draw and compress
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image - no blob generated'));
            }
          },
          file.type,
          quality
        );
      } catch (error) {
        reject(
          new Error(
            `Image compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`
          )
        );
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for compression'));
    };

    try {
      img.src = URL.createObjectURL(file);
    } catch (error) {
      reject(
        new Error(
          `Failed to create object URL: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      );
    }
  });
}
