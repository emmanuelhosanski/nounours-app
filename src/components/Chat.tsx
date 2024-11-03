import React, { useState, useRef, useEffect } from 'react';
import { Image, Send, Gift, ArrowLeft } from 'lucide-react';
import { Icon } from '@iconify/react';
import { useStore } from '../store';
import { GifPicker } from './GifPicker';

export function Chat() {
  const [message, setMessage] = useState('');
  const [showGifPicker, setShowGifPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentUser, messages, addMessage, setCurrentUser, uploadImage } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (message.trim() && currentUser) {
      await addMessage({
        sender: currentUser,
        content: message,
        type: 'text',
      });
      setMessage('');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentUser) {
      try {
        const imageUrl = await uploadImage(file);
        await addMessage({
          sender: currentUser,
          content: imageUrl,
          type: 'image',
        });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleGifSelect = async (gifUrl: string) => {
    if (currentUser) {
      await addMessage({
        sender: currentUser,
        content: gifUrl,
        type: 'gif',
      });
      setShowGifPicker(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-amber-50">
      <div className="bg-white shadow-sm p-4 flex items-center gap-4">
        <button
          onClick={() => setCurrentUser(null)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-amber-900" />
        </button>
        <h2 className="text-xl font-semibold text-amber-900">NounourChat</h2>
        <Icon icon="mdi:teddy-bear" className="w-8 h-8 text-amber-600 ml-auto" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === currentUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl p-3 ${
                msg.sender === currentUser
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-amber-900'
              }`}
            >
              {msg.type === 'text' && <p>{msg.content}</p>}
              {(msg.type === 'image' || msg.type === 'gif') && (
                <img
                  src={msg.content}
                  alt="Message content"
                  className="rounded-lg max-w-full"
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showGifPicker && (
        <div className="p-4 bg-white border-t">
          <GifPicker onSelect={handleGifSelect} onClose={() => setShowGifPicker(false)} />
        </div>
      )}

      <div className="bg-white p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Image className="w-6 h-6 text-amber-600" />
          </label>
          <button
            onClick={() => setShowGifPicker(!showGifPicker)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Gift className="w-6 h-6 text-amber-600" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Écrivez votre message..."
            className="flex-1 p-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleSend}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Send className="w-6 h-6 text-amber-600" />
          </button>
        </div>
      </div>
    </div>
  );
}