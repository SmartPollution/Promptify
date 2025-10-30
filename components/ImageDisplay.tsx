import React from 'react';
import type { HistoryItem } from '../types';
import { DownloadIcon, EditIcon, ImageIcon, SpinnerIcon } from './Icons';

interface ImageDisplayProps {
  imageItem: HistoryItem | null;
  isLoading: boolean;
  onEdit: (item: HistoryItem) => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageItem, isLoading, onEdit }) => {
  const handleSave = () => {
    if (!imageItem) return;
    const link = document.createElement('a');
    link.href = imageItem.imageDataUrl;
    // Create a safe filename from the prompt
    const safePrompt = imageItem.prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `promptify_${safePrompt.slice(0, 30)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-text-secondary">
          <SpinnerIcon className="w-12 h-12 animate-spin text-primary" />
          <p className="text-lg">Generating your masterpiece...</p>
        </div>
      );
    }

    if (imageItem) {
      return (
        <div className="relative group w-full h-full">
          <img
            src={imageItem.imageDataUrl}
            alt={imageItem.prompt}
            className="w-full h-full object-contain rounded-lg transition-all"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-lg">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-white/10 text-white backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Save Image"
            >
              <DownloadIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => onEdit(imageItem)}
              className="flex items-center gap-2 bg-white/10 text-white backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Edit Prompt"
            >
              <EditIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-text-secondary border-2 border-dashed border-border-color rounded-lg">
        <ImageIcon className="w-16 h-16" />
        <p className="text-lg">Your generated image will appear here</p>
      </div>
    );
  };

  return (
    <div className="bg-surface rounded-lg w-full aspect-square flex items-center justify-center p-2">
      {renderContent()}
    </div>
  );
};

export default ImageDisplay;
