
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Video } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic } from 'lucide-react';

type University = {
  name: string;
  avatar: string;
  program: string;
  questions: Question[];
};

type Question = {
  id: number;
  text: string;
  tips: string;
  expectedTopics: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

const universities: University[] = [
  {
    name: 'University of Oxford',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Oxford',
    program: 'Medicine',
    questions: [
      {
        id: 1,
        text: 'Why do you want to study Medicine specifically at Oxford?',
        tips: 'Focus on specific aspects of Oxford\'s medicine program that appeal to you and align with your career goals.',
        expectedTopics: ['Research opportunities', 'Tutorial system', 'Clinical exposure'],
        difficulty: 'Medium'
      },
      {
        id: 2,
        text: 'Can you explain this medical ethics scenario to me?',
        tips: 'Consider multiple perspectives and demonstrate balanced reasoning.',
        expectedTopics: ['Patient autonomy', 'Beneficence', 'Justice'],
        difficulty: 'Hard'
      },
      {
        id: 3,
        text: 'How would you assess a patient presenting with chest pain?',
        tips: 'Structure your answer methodically using a recognized approach.',
        expectedTopics: ['Differential diagnosis', 'Clinical assessment', 'Immediate management'],
        difficulty: 'Hard'
      }
    ]
  },
  {
    name: 'MIT',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=MIT',
    program: 'Computer Science',
    questions: [
      {
        id: 1,
        text: 'Describe a technical project you\'ve worked on that you\'re most proud of.',
        tips: 'Highlight your problem-solving approach and technical skills.',
        expectedTopics: ['Technical challenges', 'Innovation', 'Impact'],
        difficulty: 'Medium'
      },
      {
        id: 2,
        text: 'How would you solve this algorithmic problem?',
        tips: 'Walk through your thought process step by step.',
        expectedTopics: ['Complexity analysis', 'Optimization', 'Edge cases'],
        difficulty: 'Hard'
      },
      {
        id: 3,
        text: 'Where do you see the field of AI heading in the next decade?',
        tips: 'Demonstrate awareness of current research trends and ethical considerations.',
        expectedTopics: ['Ethics', 'Future applications', 'Technical challenges'],
        difficulty: 'Medium'
      }
    ]
  },
  {
    name: 'Harvard Business School',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=Harvard',
    program: 'MBA',
    questions: [
      {
        id: 1,
        text: 'Tell me about a time you demonstrated leadership in a challenging situation.',
        tips: 'Use the STAR method: Situation, Task, Action, Result.',
        expectedTopics: ['Leadership style', 'Conflict resolution', 'Results achieved'],
        difficulty: 'Medium'
      },
      {
        id: 2,
        text: 'What is your greatest professional achievement and why?',
        tips: 'Connect your achievement to your values and future goals.',
        expectedTopics: ['Impact', 'Skills demonstrated', 'Lessons learned'],
        difficulty: 'Easy'
      },
      {
        id: 3,
        text: 'How would you analyze this business case?',
        tips: 'Structure your analysis clearly and consider multiple stakeholders.',
        expectedTopics: ['Market analysis', 'Financial considerations', 'Strategic recommendations'],
        difficulty: 'Hard'
      }
    ]
  },
  {
    name: 'RISD',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=RISD',
    program: 'Architecture',
    questions: [
      {
        id: 1,
        text: 'Walk me through your portfolio and explain your design process.',
        tips: 'Focus on your thought process and how you developed your concepts.',
        expectedTopics: ['Inspiration', 'Iteration', 'Final execution'],
        difficulty: 'Medium'
      },
      {
        id: 2,
        text: 'How do you balance aesthetics with functionality in your designs?',
        tips: 'Use specific examples from your work to illustrate your approach.',
        expectedTopics: ['User experience', 'Design principles', 'Practical constraints'],
        difficulty: 'Medium'
      },
      {
        id: 3,
        text: 'What architectural movement has influenced your work the most and why?',
        tips: 'Demonstrate knowledge of architectural history and personal reflection.',
        expectedTopics: ['Historical context', 'Key principles', 'Personal connection'],
        difficulty: 'Easy'
      }
    ]
  }
];

const AIInterviewPractice: React.FC = () => {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectUniversity = (uni: University) => {
    setSelectedUniversity(uni);
    setCurrentQuestionIndex(0);
    setFeedback(null);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setFeedback(null);
    
    // Simulate recording for 5 seconds
    setTimeout(() => {
      setIsRecording(false);
      generateFeedback();
    }, 5000);
  };

  const generateFeedback = () => {
    if (!selectedUniversity) return;
    
    const question = selectedUniversity.questions[currentQuestionIndex];
    const feedbackOptions = [
      `Good start! You addressed the key points about ${question.expectedTopics[0]}. Consider expanding on ${question.expectedTopics[1]} to strengthen your answer.`,
      `Your answer was well-structured and clear. Great mention of ${question.expectedTopics[0]}! To improve, try to provide more specific examples related to ${question.expectedTopics[2]}.`,
      `You demonstrated good knowledge, especially regarding ${question.expectedTopics[1]}. Your tone was confident but could be more conversational. Remember to maintain good eye contact throughout.`
    ];
    
    setFeedback(feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]);
  };

  const handleNextQuestion = () => {
    if (!selectedUniversity) return;
    
    if (currentQuestionIndex < selectedUniversity.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setFeedback(null);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-future-primary" />
          AI Interview Practice
        </CardTitle>
        <CardDescription>
          Practice university admission interviews with AI feedback
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between"
            >
              {isOpen ? "Hide Interview Practice" : "Try Interview Practice"}
              <span className="text-xs text-muted-foreground">
                {isOpen ? "↑" : "↓"}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <Tabs defaultValue="universities">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="universities">Select University</TabsTrigger>
                <TabsTrigger value="interview" disabled={!selectedUniversity}>Interview Practice</TabsTrigger>
              </TabsList>
              
              <TabsContent value="universities">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {universities.map((uni) => (
                    <Card 
                      key={uni.name} 
                      className={`cursor-pointer transition-all hover:border-future-primary ${
                        selectedUniversity?.name === uni.name ? 'border-future-primary ring-2 ring-future-light' : ''
                      }`}
                      onClick={() => handleSelectUniversity(uni)}
                    >
                      <CardHeader className="flex flex-row items-center gap-3 pb-2">
                        <Avatar>
                          <AvatarImage src={uni.avatar} alt={uni.name} />
                          <AvatarFallback>{uni.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{uni.name}</CardTitle>
                          <CardDescription>{uni.program}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {uni.questions.length} practice questions available
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {selectedUniversity && (
                  <div className="flex justify-center mt-4">
                    <Button 
                      className="bg-future-primary hover:bg-future-tertiary"
                      onClick={() => document.querySelector('[data-value="interview"]')?.dispatchEvent(new MouseEvent('click'))}
                    >
                      Start Practice Interview
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="interview">
                {selectedUniversity && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedUniversity.avatar} alt={selectedUniversity.name} />
                        <AvatarFallback>{selectedUniversity.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedUniversity.name} Interview</h3>
                        <p className="text-sm text-muted-foreground">{selectedUniversity.program} Program</p>
                      </div>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Badge variant="outline">Question {currentQuestionIndex + 1}/{selectedUniversity.questions.length}</Badge>
                          <Badge variant={
                            selectedUniversity.questions[currentQuestionIndex].difficulty === 'Easy' ? 'outline' :
                            selectedUniversity.questions[currentQuestionIndex].difficulty === 'Medium' ? 'secondary' : 'default'
                          }>
                            {selectedUniversity.questions[currentQuestionIndex].difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">
                          {selectedUniversity.questions[currentQuestionIndex].text}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted p-3 rounded text-sm">
                          <p className="font-medium">Interviewer tips:</p>
                          <p>{selectedUniversity.questions[currentQuestionIndex].tips}</p>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Expected topics:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedUniversity.questions[currentQuestionIndex].expectedTopics.map((topic) => (
                              <Badge key={topic} variant="outline">{topic}</Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex-col items-stretch gap-4">
                        <Button 
                          onClick={handleStartRecording}
                          disabled={isRecording}
                          className={`${isRecording ? 'bg-red-500 animate-pulse' : 'bg-future-primary'} hover:bg-future-tertiary w-full`}
                        >
                          <Mic className="mr-2 h-4 w-4" />
                          {isRecording ? 'Recording...' : 'Record Your Answer'}
                        </Button>
                        
                        {feedback && (
                          <div className="bg-future-light p-4 rounded-md">
                            <h4 className="font-medium mb-2">AI Feedback:</h4>
                            <p className="text-sm">{feedback}</p>
                          </div>
                        )}
                        
                        <div className="flex justify-between gap-2">
                          <Button
                            variant="outline"
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                          >
                            Previous Question
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleNextQuestion}
                            disabled={currentQuestionIndex === selectedUniversity.questions.length - 1}
                          >
                            Next Question
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default AIInterviewPractice;
