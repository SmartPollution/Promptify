import React, { useState, useCallback } from 'react';
import { HistoryItem } from './types';
import { generateImage as generateImageService } from './services/geminiService';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import ImageDisplay from './components/ImageDisplay';
import HistoryPanel from './components/HistoryPanel';
import Footer from './components/Footer';

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<HistoryItem | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (newPrompt: string) => {
    if (!newPrompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setCurrentImage(null);

    try {
      const imageDataUrl = await generateImageService(newPrompt);
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        prompt: newPrompt,
        imageDataUrl: imageDataUrl,
      };
      setCurrentImage(newHistoryItem);
      setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
      setPrompt(newPrompt);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(`Error: ${errorMessage}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectFromHistory = useCallback((item: HistoryItem) => {
    setCurrentImage(item);
    setPrompt(item.prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleEdit = useCallback((item: HistoryItem) => {
     setPrompt(item.prompt);
     // For a better UX, focus the prompt input after setting its value
     document.getElementById('prompt-textarea')?.focus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
        <div className="flex-grow lg:w-2/3 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-text-secondary">Image Generator</h2>
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
          {error && <div className="bg-red-900/50 text-red-300 p-4 rounded-lg border border-red-700">{error}</div>}
          <ImageDisplay
            imageItem={currentImage}
            isLoading={isLoading}
            onEdit={handleEdit}
          />
        </div>
        <aside className="w-full lg:w-1/3">
          <HistoryPanel history={history} onSelect={handleSelectFromHistory} />
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default App;
