import { create } from 'zustand';
import { User, Message, Reminder } from './types';
import { db, storage } from './lib/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy,
  updateDoc,
  doc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface AppState {
  currentUser: User | null;
  messages: Message[];
  reminders: Reminder[];
  setCurrentUser: (user: User | null) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => Promise<void>;
  addReminder: (reminder: Omit<Reminder, 'id' | 'timestamp'>) => Promise<void>;
  toggleReminder: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
}

export const useStore = create<AppState>((set) => {
  // Set up real-time listeners
  const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
  const remindersQuery = query(collection(db, 'reminders'), orderBy('timestamp', 'desc'));

  onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
    set({ messages });
  });

  onSnapshot(remindersQuery, (snapshot) => {
    const reminders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Reminder));
    set({ reminders });
  });

  return {
    currentUser: null,
    messages: [],
    reminders: [],
    setCurrentUser: (user) => set({ currentUser: user }),
    
    addMessage: async (message) => {
      await addDoc(collection(db, 'messages'), {
        ...message,
        timestamp: Date.now(),
      });
    },

    addReminder: async (reminder) => {
      await addDoc(collection(db, 'reminders'), {
        ...reminder,
        timestamp: Date.now(),
      });
    },

    toggleReminder: async (id) => {
      const reminderRef = doc(db, 'reminders', id);
      const reminder = (set.getState().reminders.find(r => r.id === id));
      if (reminder) {
        await updateDoc(reminderRef, {
          completed: !reminder.completed
        });
      }
    },

    uploadImage: async (file: File) => {
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    }
  };
});