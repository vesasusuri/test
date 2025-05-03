import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Universities from "./pages/Universities";
import Careers from "./pages/Careers";
import IntroScreen from "./components/IntroScreen";
import ParentPortal from "./pages/ParentPortal";

const queryClient = new QueryClient();

// Wrapper to access `useLocation` and handle intro logic
const AppWrapper = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Only show intro on homepage
    if (location.pathname !== "/") {
      setShowIntro(false);
    }
  }, [location.pathname]);

  return (
    <>
      {showIntro && location.pathname === "/" ? (
        <IntroScreen onFinish={() => setShowIntro(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/parents" element={<ParentPortal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppWrapper />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
