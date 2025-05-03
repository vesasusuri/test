
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

type QuizStartProps = {
  isOpen: boolean;
  onClose: () => void;
};

const QuizStart: React.FC<QuizStartProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const handleStartJourney = () => {
    onClose();
    
    // If we're on a different page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/');
      // Give time for navigation to complete before scrolling
      setTimeout(() => {
        const quizElement = document.getElementById("quiz");
        if (quizElement) {
          quizElement.scrollIntoView({ behavior: "smooth" });
        } else {
          toast.info("Starting your personalized journey!");
        }
      }, 300);
    } else {
      // We're already on the homepage
      navigate("/#quiz");
      // Scroll to quiz section
      setTimeout(() => {
        const quizElement = document.getElementById("quiz");
        if (quizElement) {
          quizElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleExploreFeatures = () => {
    onClose();
    navigate("/careers");
    toast.info("Explore our interactive career tools!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-future-dark">Start Your Journey</DialogTitle>
          <DialogDescription>
            Discover your perfect university and career path
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          <div className="avatar-container w-28 h-28 mb-4">
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Maya&hair=short16&hairColor=d2c3a4,80523b,c79282,dbd7d2&eyes=variant15&mouth=variant20"
              alt="Avatar Guide"
              className="w-full h-full object-cover"
            />
          </div>
          
          <p className="text-center mb-6">
            Hi there! I'm Maya, your future guide. Ready to discover your perfect 
            match for universities and career paths? Take our quick personality 
            quiz to get started, or explore our new interactive career tools!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={onClose}>
              Maybe Later
            </Button>
            <Button 
              onClick={handleStartJourney} 
              className="bg-future-primary hover:bg-future-tertiary"
            >
              Start My Journey
            </Button>
            <Button 
              onClick={handleExploreFeatures} 
              variant="secondary"
            >
              Explore Career Tools
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizStart;