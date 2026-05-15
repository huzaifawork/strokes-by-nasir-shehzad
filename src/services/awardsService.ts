import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Award {
  id: string;
  title: string;
  awardImageUrl?: string;
  receivingImageUrl?: string;
  order: number;
  createdAt: Date;
}

export async function getAwards(): Promise<Award[]> {
  try {
    const awardsRef = collection(db, 'awards');
    const q = query(awardsRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
      };
    }) as Award[];
  } catch (error) {
    console.error('Error fetching awards:', error);
    return [];
  }
}
