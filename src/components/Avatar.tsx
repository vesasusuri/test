import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import myVideo from "../assets/home/waving.mp4";

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
      {/* SVG mask-based video crop */}
      <div className="w-48 md:w-60 h-60 mb-6 relative animate-float">
        <svg width="100%" height="100%" viewBox="0 0 240 240" preserveAspectRatio="xMidYMid meet" className="absolute top-0 left-0 z-10">
          <defs>
            <clipPath id="bottomClip" clipPathUnits="userSpaceOnUse">
              <rect x="0" y="0" width="240" height="120" />
              <circle cx="120" cy="120" r="120" />
            </clipPath>
          </defs>
          <foreignObject width="240" height="340" clipPath="url(#bottomClip)">
            <video
              src={myVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </foreignObject>
        </svg>
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