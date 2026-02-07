import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Exhibition {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  createdAt: Date;
}

export async function getExhibitions(): Promise<Exhibition[]> {
  try {
    const exhibitionsRef = collection(db, 'exhibitions');
    const q = query(exhibitionsRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Exhibition[];
  } catch (error) {
    console.error('Error fetching exhibitions:', error);
    return [];
  }
}
