import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Interfaces
export interface UserProfile {
  userId: string;
  chosenName: string;
  createdAt: Timestamp;
  recoveryKey: string;
}

export interface MummyChat {
  id?: string;
  userId: string;
  date: string;
  userMessage: string;
  mummyReply: string;
  createdAt: Timestamp;
}

export interface DailyDiary {
  id?: string;
  userId: string;
  date: string;
  prayerMessage?: string;
  bestMemory?: string;
  worstPart?: string;
  tasks?: Task[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface ProfileImages {
  userId: string;
  mummyPhotoURL: string | null;
  umiyaPhotoURL: string | null;
}

// User Profile Functions
export const createUserProfile = async (userId: string, chosenName: string): Promise<string> => {
  const recoveryKey = generateRecoveryKey();
  const userDoc: UserProfile = {
    userId,
    chosenName,
    createdAt: Timestamp.now(),
    recoveryKey,
  };
  
  await setDoc(doc(db, 'users', userId), userDoc);
  return recoveryKey;
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as UserProfile : null;
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, data);
};

// Mummy Chat Functions
export const addMummyChat = async (chat: Omit<MummyChat, 'id' | 'createdAt'>): Promise<void> => {
  await addDoc(collection(db, 'mummyChat'), {
    ...chat,
    createdAt: Timestamp.now(),
  });
};

export const getMummyChatsForDate = async (userId: string, date: string): Promise<MummyChat[]> => {
  const q = query(
    collection(db, 'mummyChat'),
    where('userId', '==', userId),
    where('date', '==', date),
    orderBy('createdAt', 'asc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as MummyChat));
};

// Daily Diary Functions
export const getDailyDiary = async (userId: string, date: string): Promise<DailyDiary | null> => {
  const q = query(
    collection(db, 'dailyDiary'),
    where('userId', '==', userId),
    where('date', '==', date)
  );
  
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  
  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() } as DailyDiary;
};

export const saveDailyDiary = async (userId: string, date: string, data: Partial<DailyDiary>): Promise<void> => {
  const existing = await getDailyDiary(userId, date);
  
  if (existing?.id) {
    await updateDoc(doc(db, 'dailyDiary', existing.id), {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } else {
    await addDoc(collection(db, 'dailyDiary'), {
      userId,
      date,
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }
};

// Profile Images Functions
export const getProfileImages = async (userId: string): Promise<ProfileImages | null> => {
  const docRef = doc(db, 'profileImages', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as ProfileImages : null;
};

export const saveProfileImages = async (userId: string, images: Partial<ProfileImages>): Promise<void> => {
  const docRef = doc(db, 'profileImages', userId);
  const existing = await getDoc(docRef);
  
  if (existing.exists()) {
    await updateDoc(docRef, images);
  } else {
    await setDoc(docRef, {
      userId,
      mummyPhotoURL: null,
      umiyaPhotoURL: null,
      ...images,
    });
  }
};

// Helper Functions
const generateRecoveryKey = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) key += '-';
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};

export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};
