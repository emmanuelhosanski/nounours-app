import React, { useEffect } from 'react';
import { UserSelect } from './components/UserSelect';
import { Chat } from './components/Chat';
import { Reminders } from './components/Reminders';
import { useStore } from './store';
import { Icon } from '@iconify/react';

function App() {
  const currentUser = useStore((state) => state.currentUser);
  const [showEasterEgg, setShowEasterEgg] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [direction, setDirection] = React.useState({ x: 2, y: 2 });

  const handleEasterEgg = () => {
    setShowEasterEgg(true);
  };

  useEffect(() => {
    if (showEasterEgg) {
      const interval = setInterval(() => {
        setPosition((prev) => {
          const newX = prev.x + direction.x;
          const newY = prev.y + direction.y;

          // Get window dimensions
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;

          // Check for boundary collisions
          let updatedX = newX;
          let updatedY = newY;

          if (newX <= 0 || newX >= windowWidth - 100) {
            setDirection((dir) => ({ ...dir, x: -dir.x })); // reverse x direction
            updatedX = newX <= 0 ? 0 : windowWidth - 100; // keep within bounds
          }

          if (newY <= 0 || newY >= windowHeight - 100) {
            setDirection((dir) => ({ ...dir, y: -dir.y })); // reverse y direction
            updatedY = newY <= 0 ? 0 : windowHeight - 100; // keep within bounds
          }

          return { x: updatedX, y: updatedY };
        });
      }, 20);

      return () => clearInterval(interval);
    }
  }, [showEasterEgg, direction]);

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
        <div
          className="fixed pointer-events-none z-50"
          style={{ left: position.x, top: position.y, transition: 'left 0.02s, top 0.02s' }}
        >
          <div>
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
