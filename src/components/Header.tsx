
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import QuizStart from './QuizStart';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isQuizStartOpen, setIsQuizStartOpen] = useState(false);
  
  const handleSignIn = (values: { email: string, password: string }) => {
    // In a real app, you would handle authentication here
    console.log("Sign in with:", values);
  };

  return (
    <header className={cn("border-b border-border py-4", className)}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="bg-gradient-to-r from-future-primary to-future-accent p-1.5 rounded-md text-white font-bold text-lg">MF</div>
          </Link>
          <Link to="/">
            <span className="font-bold text-xl text-future-dark">
              Match<span className="text-future-primary">Future</span>
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-future-dark hover:text-future-primary transition">Home</Link>
          <Link to="/universities" className="text-future-dark hover:text-future-primary transition">Universities</Link>
          <Link to="/careers" className="text-future-dark hover:text-future-primary transition">Careers</Link>
          <a href="#" className="text-future-dark hover:text-future-primary transition">About</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="hidden sm:inline-flex"
            onClick={() => setIsSignInOpen(true)}
          >
            Sign In
          </Button>
          <Button 
            className="bg-future-primary hover:bg-future-tertiary"
            onClick={() => setIsQuizStartOpen(true)}
          >
            Get Started
          </Button>
        </div>
      </div>
      
      {/* Sign In Dialog */}
      <SignIn 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)}
        onSignIn={handleSignIn}
      />
      
      {/* Quiz Start Dialog */}
      <QuizStart 
        isOpen={isQuizStartOpen} 
        onClose={() => setIsQuizStartOpen(false)} 
      />
    </header>
  );
};

export default Header;