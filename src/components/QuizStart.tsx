import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const quizElement = document.getElementById("quiz");
        if (quizElement) {
          quizElement.scrollIntoView({ behavior: "smooth" });
        } else {
          toast.info("Starting your personalized journey!");
        }
      }, 300);
    } else {
      navigate("/#quiz");
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
      <DialogContent className="sm:max-w-md bg-[#FAF8F6] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2F2F2F]">
            Start Your Journey
          </DialogTitle>
          <DialogDescription className="text-[#4C5A72]">
            Discover your perfect university and career path
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <div className="w-24 h-24 mb-4 rounded-full border border-[#D86D70] overflow-hidden shadow-sm">
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Maya&hair=short16&hairColor=d2c3a4,80523b,c79282,dbd7d2&eyes=variant15&mouth=variant20"
              alt="Avatar Guide"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-center text-[#2F2F2F] mb-6 px-2">
            Hi there! I'm Maya, your guide. Ready to discover your perfect university and career path? Start with a quick personality quiz or explore our interactive tools!
          </p>

          <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
            <Button
              variant="outline"
              className="border-[#D86D70] text-[#2F2F2F]"
              onClick={onClose}
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleStartJourney}
              className="bg-[#9F262A] hover:bg-[#D86D70] text-white"
            >
              Start My Journey
            </Button>
            <Button
              onClick={handleExploreFeatures}
              className="bg-[#4C5A72] hover:bg-[#2F2F2F] text-white"
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