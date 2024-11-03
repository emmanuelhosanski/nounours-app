import React, { useState } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Search, X } from 'lucide-react';

const gf = new GiphyFetch('GlVGYHkr3WSBnllca54iNt0yFbjz7L65');

interface GifPickerProps {
  onSelect: (gifUrl: string) => void;
  onClose: () => void;
}

export function GifPicker({ onSelect, onClose }: GifPickerProps) {
  const [search, setSearch] = useState('');

  const fetchGifs = (offset: number) =>
    search
      ? gf.search(search, { offset, limit: 10 })
      : gf.trending({ offset, limit: 10 });

  return (
    <div className="h-[400px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un GIF..."
            className="bg-transparent flex-1 focus:outline-none"
          />
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="overflow-y-auto h-[calc(100%-60px)]">
        <Grid
          width={400}
          columns={4}
          fetchGifs={fetchGifs}
          key={search}
          onGifClick={(gif) => onSelect(gif.images.original.url)}
        />
      </div>
    </div>
  );
}