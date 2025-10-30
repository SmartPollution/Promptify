import React from 'react';
import type { HistoryItem } from '../types';
import { HistoryIcon } from './Icons';

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect }) => {
  return (
    <div className="bg-surface p-4 rounded-lg border border-border-color h-full">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <HistoryIcon className="w-6 h-6" />
        History
      </h3>
      {history.length === 0 ? (
        <p className="text-text-secondary text-center py-8">No images generated yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto pr-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer group relative aspect-square"
              onClick={() => onSelect(item)}
            >
              <img
                src={item.imageDataUrl}
                alt={item.prompt}
                className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 rounded-md">
                <p className="text-white text-xs line-clamp-2">{item.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;
