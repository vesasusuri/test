import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import myVideo from '../assets/home/waving.mp4';

type AvatarProps = {
  onContinue: () => void;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({ onContinue, className }) => {
  const [message, setMessage] = useState<string>(
    "👋 Hi there! I'm Bekim the Bear, your future guide. Ready to discover your perfect university and career path?"
  );

  const [messageIndex, setMessageIndex] = useState<number>(0);
  const messages = [
    "👋 Hi there! I'm Bekim the Bear, your future guide. Ready to discover your perfect university and career path?",
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
    <div className={cn("flex flex-col items-center gap-10", className)}>
      {/* Top Section: Bear & Message */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Bear */}
        <div className="w-48 md:w-60 h-60 relative animate-float">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 240 240"
            preserveAspectRatio="xMidYMid meet"
            className="absolute top-0 left-0 z-10"
          >
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

        {/* Message + CTA */}
        <div className="flex flex-col justify-end h-60 ml-6 -translate-y-2">
          <div className="bg-white p-4 rounded-2xl shadow-md max-w-md mb-4 animate-slide-up">
            <p className="text-lg">{message}</p>
          </div>
          <Button
            onClick={handleNextMessage}
            className="bg-[#9F262A] text-white px-6 py-2 rounded-full animate-pulse-light max-w-[150px]"
          >
            {messageIndex < messages.length - 1 ? "Continue" : "Start Now"}
          </Button>
        </div>
      </div>

      {/* Slim Upload Section */}
      <div className="w-full max-w-4xl bg-[#FAF8F6] border border-[#D86D70] rounded-xl py-4 px-6 shadow-lg">
        <h2 className="text-center text-lg font-semibold text-[#2F2F2F] mb-1">
          Upload Academic Records
        </h2>
        <p className="text-center text-sm text-[#4C5A72] mb-4">
          Drop your academic files or choose manually to enhance your match results
        </p>

        <div className="border-2 border-dashed border-[#D86D70] rounded-md p-4 bg-white hover:bg-[#FFF5F5] transition flex flex-col md:flex-row justify-center items-center gap-2 h-32">
          <svg className="w-8 h-8 text-[#9F262A]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.88 9.94a1.5 1.5 0 00-2.12 0L11 13.71V3.5a1.5 1.5 0 00-3 0v10.21l-3.76-3.77a1.5 1.5 0 10-2.12 2.12l6.5 6.5a1.5 1.5 0 002.12 0l6.5-6.5a1.5 1.5 0 000-2.12z" />
          </svg>
          <div className="flex flex-col items-center">
            <label
              htmlFor="academic-upload"
              className="cursor-pointer font-medium text-[#9F262A] border border-[#D86D70] px-4 py-2 rounded-md hover:bg-[#D86D70] hover:text-white transition"
            >
              Choose Files
            </label>
            <p className="text-xs text-[#4C5A72] mt-1">PDF, JPG, PNG up to 10MB</p>
            <input
              id="academic-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
