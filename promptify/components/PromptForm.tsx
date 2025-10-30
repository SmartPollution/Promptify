import React, { useState } from 'react';
import { SpinnerIcon, SparklesIcon } from './Icons';
import { enhancePrompt } from '../services/geminiService';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  const handleEnhance = async () => {
    setIsEnhancing(true);
    try {
      const enhanced = await enhancePrompt(prompt);
      setPrompt(enhanced);
    } catch (err) {
      // In a real app, this might be a toast notification
      alert("Sorry, could not enhance the prompt right now. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        id="prompt-textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., A cinematic shot of a raccoon in a library, wearing a monocle, surrounded by floating books..."
        className="w-full h-28 p-4 bg-surface rounded-lg border border-border-color focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none placeholder-text-secondary/60"
        disabled={isLoading || isEnhancing}
      />
      <div className="flex items-center justify-end gap-2">
         <button
          type="button"
          onClick={handleEnhance}
          disabled={isLoading || isEnhancing || !prompt.trim()}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-surface text-text-main font-semibold rounded-lg border border-primary hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Enhance prompt with AI"
        >
          {isEnhancing ? (
            <>
              <SpinnerIcon className="animate-spin h-5 w-5" />
              Enhancing...
            </>
          ) : (
            <>
              <SparklesIcon className="h-5 w-5" />
              Enhance
            </>
          )}
        </button>
        <button
          type="submit"
          disabled={isLoading || isEnhancing}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-primary disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <SpinnerIcon className="animate-spin h-5 w-5" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;
