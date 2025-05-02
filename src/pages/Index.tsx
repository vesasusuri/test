
import React, { useState } from 'react';
import Header from '@/components/Header';
import Avatar from '@/components/Avatar';
import PersonalityQuiz, { PersonalityResult } from '@/components/PersonalityQuiz';
import UniversityMatch from '@/components/UniversityMatch';
import CareerPathway from '@/components/CareerPathway';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
            <h1 className="text-center text-4xl md:text-5xl font-bold text-future-dark mb-6">
              Match With Your <span className="text-future-primary">Future</span>
            </h1>
            <p className="text-center text-xl text-muted-foreground max-w-2xl mb-12">
              Discover your perfect university and career path with our 
              AI-powered guidance platform for Albanian high school students.
            </p>
            
            <Avatar 
              onContinue={() => setCurrentStep(Step.QUIZ)} 
              className="mb-12"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full mt-8">
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-future-light rounded-full flex items-center justify-center mb-4">
                      <span className="text-future-primary text-xl font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Take Fun Quizzes</h3>
                    <p className="text-muted-foreground">Discover your personality type, interests, and talents through interactive quizzes.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-future-light rounded-full flex items-center justify-center mb-4">
                      <span className="text-future-primary text-xl font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Get Matched</h3>
                    <p className="text-muted-foreground">Our AI matches you with universities and careers that fit your unique profile.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-future-light rounded-full flex items-center justify-center mb-4">
                      <span className="text-future-primary text-xl font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Explore Paths</h3>
                    <p className="text-muted-foreground">Visualize your future with detailed career pathways and university programs.</p>
                  </div>
                </CardContent>
              </Card>
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
                    <Badge className="badge-personality">
                      Personality Type
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{personalityResult.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Your Strengths:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {personalityResult.strengths.map(strength => (
                          <Badge key={strength} variant="outline">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold">Suggested Fields:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {personalityResult.suggestedFields.map(field => (
                          <Badge key={field} variant="outline" className="bg-future-light text-future-tertiary border-0">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-lg border border-border p-1">
                <Button
                  variant={activeTab === 'universities' ? 'default' : 'ghost'}
                  className={activeTab === 'universities' ? 'bg-future-primary hover:bg-future-tertiary' : ''}
                  onClick={() => setActiveTab('universities')}
                >
                  Universities
                </Button>
                <Button
                  variant={activeTab === 'careers' ? 'default' : 'ghost'}
                  className={activeTab === 'careers' ? 'bg-future-primary hover:bg-future-tertiary' : ''}
                  onClick={() => setActiveTab('careers')}
                >
                  Career Paths
                </Button>
              </div>
            </div>
            
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
      
      <footer className="bg-future-dark text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-xl">
                Match<span className="text-future-primary">Future</span>
              </span>
              <p className="text-sm text-gray-400 mt-1">
                Guiding Albanian students to their perfect future
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <a href="#" className="text-sm text-gray-400 hover:text-white">About Us</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Universities</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Careers</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
