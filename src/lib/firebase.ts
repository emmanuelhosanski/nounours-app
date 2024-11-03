import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB8BPZmt0GhhIt07ztJbbnRdb-t6RxhTGg",
  authDomain: "nnapp-56897.firebaseapp.com",
  projectId: "nnapp-56897",
  storageBucket: "nnapp-56897.firebasestorage.app",
  messagingSenderId: "830385117177",
  appId: "1:830385117177:web:cf57a2ba30cd390be10f28",
  measurementId: "G-NKW2DKKEFT"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);