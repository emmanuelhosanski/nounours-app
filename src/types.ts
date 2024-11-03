export type User = 'husband' | 'wife';

export interface Message {
  id: string;
  sender: User;
  content: string;
  type: 'text' | 'image' | 'gif';
  timestamp: number;
}

export interface Reminder {
  id: string;
  text: string;
  completed: boolean;
  createdBy: User;
  timestamp: number;
}