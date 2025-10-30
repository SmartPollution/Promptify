import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface/30 border-t border-border-color mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-6 text-center text-text-secondary">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Promptify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
