import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Residency {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  createdAt: Date;
}

export async function getResidencies(): Promise<Residency[]> {
  try {
    const residenciesRef = collection(db, 'residencies');
    const q = query(residenciesRef, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Residency[];
  } catch (error) {
    console.error('Error fetching residencies:', error);
    return [];
  }
}
