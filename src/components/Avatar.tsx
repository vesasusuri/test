
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AvatarProps = {
  onContinue: () => void;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({ onContinue, className }) => {
  const [message, setMessage] = useState<string>(
    "👋 Hi there! I'm Maya, your future guide. Ready to discover your perfect university and career path?"
  );

  const [messageIndex, setMessageIndex] = useState<number>(0);
  const messages = [
    "👋 Hi there! I'm Maya, your future guide. Ready to discover your perfect university and career path?",
    "Great! Let's start by getting to know you better through some fun quizzes.",
    "Your answers will help me match you with the perfect university programs and career paths!"
  ];

  const handleNextMessage = () => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex(messageIndex + 1);
      setMessage(messages[messageIndex + 1]);
    } else {
      onContinue();
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="avatar-container w-32 h-32 md:w-40 md:h-40 animate-float mb-6">
        <img
          src="https://api.dicebear.com/7.x/adventurer/svg?seed=Maya&hair=short16&hairColor=d2c3a4,80523b,c79282,dbd7d2&eyes=variant15&mouth=variant20"
          alt="Avatar Guide"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="bg-white p-4 rounded-2xl shadow-md max-w-md mb-6 animate-slide-up">
        <p className="text-lg">{message}</p>
      </div>
      
      <Button 
        onClick={handleNextMessage} 
        className="bg-future-primary hover:bg-future-tertiary text-white px-6 py-2 rounded-full animate-pulse-light"
      >
        {messageIndex < messages.length - 1 ? "Continue" : "Start My Journey"}
      </Button>
    </div>
  );
};

export default Avatar;
