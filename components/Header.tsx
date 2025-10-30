import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-surface/50 backdrop-blur-sm border-b border-border-color sticky top-0 z-10">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center gap-3">
        <LogoIcon className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-text-main tracking-tight">Promptify</h1>
      </div>
    </header>
  );
};

export default Header;
