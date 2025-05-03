import React, { useState } from 'react';
import Header from '@/components/Header';
import Avatar from '@/components/Avatar';
import PersonalityQuiz, { PersonalityResult } from '@/components/PersonalityQuiz';
import UniversityMatch from '@/components/UniversityMatch';
import CareerPathway from '@/components/CareerPathway';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import logo from '../assets/navbar/umatch-logo.png';

enum Step {
  WELCOME,
  QUIZ,
  RESULTS,
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME);
  const [personalityResult, setPersonalityResult] = useState<PersonalityResult | null>(null);
  const [activeTab, setActiveTab] = useState<'universities' | 'careers'>('universities');

  const handleQuizComplete = (result: PersonalityResult) => {
    setPersonalityResult(result);
    setCurrentStep(Step.RESULTS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
  {currentStep === Step.WELCOME && (
    <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center">
      <h1 className="text-center text-4xl md:text-5xl font-bold text-[#2F2F2F] mb-6">
        Match With Your <span className="text-[#9F262A]">Future</span>
      </h1>
      <p className="text-center text-xl text-[#6B7280] max-w-2xl mb-12">
        Discover your perfect university and career path with our
        AI-powered guidance platform for Albanian high school students.
      </p>

      <Avatar onContinue={() => setCurrentStep(Step.QUIZ)} className="mb-12" />

      {/* How It Works Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-4">
        {[1, 2, 3].map((num) => (
          <Card
            key={num}
            className="transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 rounded-xl"
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#FAF8F6] rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <span className="text-[#9F262A] text-xl font-bold">{num}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {num === 1 && 'Take Fun Quizzes'}
                  {num === 2 && 'Get Matched'}
                  {num === 3 && 'Explore Paths'}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {num === 1 &&
                    'Discover your personality type, interests, and talents through interactive quizzes.'}
                  {num === 2 &&
                    'Our AI matches you with universities and careers that fit your unique profile.'}
                  {num === 3 &&
                    'Visualize your future with detailed career pathways and university programs.'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )}

  {currentStep === Step.QUIZ && (
    <div id="quiz" className="container mx-auto px-4 py-8">
      <PersonalityQuiz onComplete={handleQuizComplete} />
    </div>
  )}

  {currentStep === Step.RESULTS && personalityResult && (
    <div className="container mx-auto px-4 py-8">
      {/* Personality Summary */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="avatar-container w-24 h-24 shrink-0">
            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${personalityResult.type}`}
              alt="Personality Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{personalityResult.type}</h2>
              <Badge className="badge-personality">Personality Type</Badge>
            </div>

            <p className="text-[#6B7280] mb-4">{personalityResult.description}</p>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">Your Strengths:</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {personalityResult.strengths.map((strength) => (
                    <Badge key={strength} variant="outline">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Suggested Fields:</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {personalityResult.suggestedFields.map((field) => (
                    <Badge
                      key={field}
                      variant="outline"
                      className="bg-[#FAF8F6] text-[#D86D70] border-0"
                    >
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-[#E5E7EB] p-1">
          <Button
            variant={activeTab === 'universities' ? 'default' : 'ghost'}
            className={activeTab === 'universities' ? 'bg-[#9F262A] hover:bg-[#D86D70]' : ''}
            onClick={() => setActiveTab('universities')}
          >
            Universities
          </Button>
          <Button
            variant={activeTab === 'careers' ? 'default' : 'ghost'}
            className={activeTab === 'careers' ? 'bg-[#9F262A] hover:bg-[#D86D70]' : ''}
            onClick={() => setActiveTab('careers')}
          >
            Career Paths
          </Button>
        </div>
      </div>

      {/* Results Display */}
      {activeTab === 'universities' ? (
        <UniversityMatch personalityResult={personalityResult} />
      ) : (
        <CareerPathway personalityResult={personalityResult} />
      )}

      <div className="text-center mt-12 mb-6">
        <Button onClick={() => setCurrentStep(Step.WELCOME)} variant="outline">
          Return to Start
        </Button>
      </div>
    </div>
  )}
</main>
      
<footer className="bg-[#2f2f2f] text-white py-12 mt-16">
  <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
    {/* 1. Brand Overview */}
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="UMatch Logo" className="h-8 w-auto" />
      </div>
      <p className="text-sm text-[#CCCCCC] leading-relaxed">
        Empowering Albanian students to explore university and career opportunities through AI-driven insights and quizzes.
      </p>
    </div>

    {/* 2. Main Links */}
    <div>
      <h4 className="text-lg font-semibold mb-4">Explore</h4>
      <ul className="space-y-2 text-sm text-[#BBBBBB]">
        <li><a href="#" className="hover:text-white transition">Home</a></li>
        <li><a href="#" className="hover:text-white transition">Universities</a></li>
        <li><a href="#" className="hover:text-white transition">Careers</a></li>
        <li><a href="#" className="hover:text-white transition">About</a></li>
      </ul>
    </div>

    {/* 3. Resources */}
    <div>
      <h4 className="text-lg font-semibold mb-4">Resources</h4>
      <ul className="space-y-2 text-sm text-[#BBBBBB]">
        <li><a href="#" className="hover:text-white transition">Blog</a></li>
        <li><a href="#" className="hover:text-white transition">Student Stories</a></li>
        <li><a href="#" className="hover:text-white transition">Help Center</a></li>
        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
      </ul>
    </div>

    {/* 4. Contact & Social */}
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Contact</h4>
      <p className="text-sm text-[#CCCCCC]">contact@umatch.al</p>
      <div className="flex gap-4 mt-2">
        <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform">
          <img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5" />
        </a>
        <a href="#" aria-label="Twitter" className="hover:scale-110 transition-transform">
          <img src="/icons/twitter.svg" alt="Twitter" className="h-5 w-5" />
        </a>
        <a href="#" aria-label="Instagram" className="hover:scale-110 transition-transform">
          <img src="/icons/instagram.svg" alt="Instagram" className="h-5 w-5" />
        </a>
        <a href="#" aria-label="LinkedIn" className="hover:scale-110 transition-transform">
          <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
        </a>
      </div>
    </div>
  </div>

  {/* Divider */}
  <div className="border-t border-[#333] mt-10 pt-6 text-center text-xs text-[#888]">
    © {new Date().getFullYear()} UMatch. All rights reserved.
  </div>
</footer>

    </div>
  );
};

export default Index;