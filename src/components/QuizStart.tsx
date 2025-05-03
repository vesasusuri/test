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
import myVideo from "../assets/home/waving.mp4";

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
          {/* <div className="w-24 h-24 mb-4 rounded-full border border-[#D86D70] overflow-hidden shadow-sm">
            <img
              src={}
              alt="Avatar Guide"
              className="w-full h-full object-cover"
            />
          </div> */}
           <div className="w-48 md:w-60 h-60 mb-6 relative animate-float">
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
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        className="w-full h-full"
                      >
                        <video
                          src={myVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </foreignObject>
                  </svg>
                </div>

          <p className="text-center text-[#2F2F2F] mb-6 px-2">
            Hi there! I'm Bekim the Bear, your guide. Discover your perfect university match.
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
            {/* <Button
              onClick={handleExploreFeatures}
              className="bg-[#4C5A72] hover:bg-[#2F2F2F] text-white"
            >
              Explore Career Tools
            </Button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizStart;