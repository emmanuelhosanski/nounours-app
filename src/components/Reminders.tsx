import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store';

export function Reminders() {
  const [newReminder, setNewReminder] = useState('');
  const { currentUser, reminders, addReminder, toggleReminder } = useStore();

  const handleAddReminder = () => {
    if (newReminder.trim() && currentUser) {
      addReminder({
        text: newReminder,
        completed: false,
        createdBy: currentUser,
      });
      setNewReminder('');
    }
  };

  return (
    <div className="p-4 bg-amber-50 rounded-xl">
      <h3 className="text-xl font-semibold text-amber-900 mb-4">Rappels</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddReminder()}
            placeholder="Ajouter un rappel..."
            className="flex-1 p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleAddReminder}
            className="p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-center gap-3 p-3 bg-white rounded-lg group"
            >
              <button
                onClick={() => toggleReminder(reminder.id)}
                className="text-amber-600 hover:text-amber-700"
              >
                {reminder.completed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <span
                className={`flex-1 ${
                  reminder.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {reminder.text}
              </span>
              <span className="text-sm text-gray-500">
                par {reminder.createdBy === 'husband' ? '🐻' : '🐻‍❄️'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}