import React from 'react';
import { Icon } from '@iconify/react';
import { User } from '../types';
import { useStore } from '../store';

export function UserSelect() {
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const selectUser = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-amber-800 mb-8">
          NounourChat
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => selectUser('husband')}
            className="flex flex-col items-center gap-4 p-6 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors group"
          >
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon icon="mdi:teddy-bear" className="w-16 h-16 text-blue-600" />
            </div>
            <span className="text-lg font-medium text-amber-900">
              Nounours Homme
            </span>
          </button>
          <button
            onClick={() => selectUser('wife')}
            className="flex flex-col items-center gap-4 p-6 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors group"
          >
            <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon icon="mdi:teddy-bear" className="w-16 h-16 text-pink-600" />
            </div>
            <span className="text-lg font-medium text-amber-900">
              Nounours Femme
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}