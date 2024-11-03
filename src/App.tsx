import React from 'react';
import { UserSelect } from './components/UserSelect';
import { Chat } from './components/Chat';
import { Reminders } from './components/Reminders';
import { useStore } from './store';
import { Icon } from '@iconify/react';

function App() {
  const currentUser = useStore((state) => state.currentUser);
  const [showEasterEgg, setShowEasterEgg] = React.useState(false);

  const handleEasterEgg = () => {
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 2000);
  };

  if (!currentUser) {
    return <UserSelect />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-screen">
      <div className="lg:col-span-2 border-r border-gray-200">
        <Chat />
      </div>
      <div className="hidden lg:block p-6 bg-white overflow-y-auto">
        <div className="mb-8 text-center">
          <button
            onClick={handleEasterEgg}
            className="inline-block hover:scale-110 transition-transform"
          >
            <Icon 
              icon="mdi:teddy-bear" 
              className={`w-12 h-12 text-amber-600 ${
                showEasterEgg ? 'animate-bounce' : ''
              }`}
            />
          </button>
        </div>
        <Reminders />
      </div>
      {showEasterEgg && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="animate-bounce">
            <Icon 
              icon="mdi:teddy-bear-dance" 
              className="w-64 h-64 text-amber-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;