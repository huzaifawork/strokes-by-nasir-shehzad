import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface GalleryItem {
  id: string;
  name: string;
  description: string;
  size: string;
  imageUrl: string;
  order: number;
  createdAt: Date;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const galleryRef = collection(db, 'gallery');
    const q = query(galleryRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as GalleryItem[];
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return [];
  }
}
