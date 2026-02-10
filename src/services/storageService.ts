import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase';

// Image compression utility
async function compressImage(file: File, maxSizeMB: number = 2): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    // Add timeout to prevent hanging on Samsung devices
    const timeout = setTimeout(() => {
      reject(new Error('File read timeout - file may be too large or corrupted'));
    }, 30000); // 30 second timeout
    
    reader.onload = (event) => {
      clearTimeout(timeout);
      
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimensions for high quality
          const MAX_WIDTH = 2000;
          const MAX_HEIGHT = 2000;
          
          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = (height * MAX_WIDTH) / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = (width * MAX_HEIGHT) / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to blob with quality adjustment
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                reject(new Error('Canvas to Blob conversion failed'));
              }
            },
            'image/jpeg',
            0.85 // 85% quality - good balance between quality and size
          );
        } catch (error) {
          reject(new Error('Image processing failed: ' + (error as Error).message));
        }
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Image load failed - file may be corrupted or unsupported format'));
      };
    };
    
    reader.onerror = (error) => {
      clearTimeout(timeout);
      console.error('FileReader error:', error);
      reject(new Error('File read failed - please try a different image or reduce file size'));
    };
    
    // Try to read the file
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      clearTimeout(timeout);
      reject(new Error('Failed to start reading file: ' + (error as Error).message));
    }
  });
}

export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    // Check file size (max 10MB before compression)
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxFileSize) {
      throw new Error('Image size must be less than 10MB');
    }
    
    // Compress image for faster upload
    const compressedFile = await compressImage(file);
    
    // Upload to Firebase Storage
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, compressedFile);
    
    // Get download URL
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}
