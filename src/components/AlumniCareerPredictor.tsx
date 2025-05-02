
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartLine } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type CareerOutcome = {
  role: string;
  industry: string;
  salary: string;
  location: string;
  growth: 'high' | 'medium' | 'low';
  description: string;
};

type DegreeOutcomes = {
  [key: string]: {
    fiveYear: CareerOutcome[];
    tenYear: CareerOutcome[];
  };
};

const degreeOutcomes: DegreeOutcomes = {
  "Computer Science": {
    fiveYear: [
      {
        role: "Senior Software Engineer",
        industry: "Technology",
        salary: "$90,000 - $130,000",
        location: "Major tech hubs",
        growth: "high",
        description: "Leading development teams and architecting complex systems. Many CS graduates reach senior positions within 5 years through continuous learning."
      },
      {
        role: "Data Scientist",
        industry: "Various",
        salary: "$85,000 - $120,000",
        location: "Global opportunities",
        growth: "high",
        description: "Applying machine learning to business problems across industries from healthcare to finance."
      },
      {
        role: "Product Manager",
        industry: "Technology",
        salary: "$95,000 - $140,000",
        location: "Tech centers",
        growth: "medium",
        description: "Transitioning technical knowledge into product strategy and business leadership roles."
      }
    ],
    tenYear: [
      {
        role: "CTO / Technical Director",
        industry: "Various",
        salary: "$140,000 - $220,000",
        location: "Global",
        growth: "medium",
        description: "Leading technical strategy at companies or founding startups with strong technical foundations."
      },
      {
        role: "Engineering Manager",
        industry: "Technology",
        salary: "$130,000 - $180,000",
        location: "Major cities",
        growth: "high",
        description: "Managing teams of engineers while still maintaining technical expertise."
      },
      {
        role: "AI Research Scientist",
        industry: "Research / Technology",
        salary: "$120,000 - $200,000",
        location: "Research centers",
        growth: "high",
        description: "Advancing the field through research in machine learning and artificial intelligence."
      }
    ]
  },
  "Medicine": {
    fiveYear: [
      {
        role: "Specialist in Training",
        industry: "Healthcare",
        salary: "$70,000 - $100,000",
        location: "Urban hospitals",
        growth: "medium",
        description: "Completing residency and beginning specialization in chosen medical field."
      },
      {
        role: "General Practitioner",
        industry: "Healthcare",
        salary: "$90,000 - $140,000",
        location: "Various",
        growth: "high",
        description: "Providing primary care in community settings, clinics or hospitals."
      },
      {
        role: "Clinical Researcher",
        industry: "Research / Healthcare",
        salary: "$85,000 - $120,000",
        location: "Research hospitals",
        growth: "medium",
        description: "Conducting research while maintaining clinical practice to advance medical knowledge."
      }
    ],
    tenYear: [
      {
        role: "Senior Specialist",
        industry: "Healthcare",
        salary: "$180,000 - $350,000+",
        location: "Major medical centers",
        growth: "high",
        description: "Practicing in specialized fields with significant expertise and reputation."
      },
      {
        role: "Medical Director",
        industry: "Healthcare",
        salary: "$200,000 - $300,000",
        location: "Hospitals / Clinics",
        growth: "medium",
        description: "Leading medical teams and shaping healthcare delivery in institutions."
      },
      {
        role: "Private Practice Owner",
        industry: "Healthcare",
        salary: "$250,000 - $500,000+",
        location: "Various",
        growth: "medium",
        description: "Running own medical practice with established patient base and reputation."
      }
    ]
  },
  "Business": {
    fiveYear: [
      {
        role: "Senior Manager",
        industry: "Various",
        salary: "$80,000 - $110,000",
        location: "Major cities",
        growth: "high",
        description: "Managing teams and projects with increasing responsibility in chosen business field."
      },
      {
        role: "Financial Analyst",
        industry: "Finance",
        salary: "$75,000 - $95,000",
        location: "Financial centers",
        growth: "medium",
        description: "Providing financial insights and strategy for businesses or investment firms."
      },
      {
        role: "Marketing Specialist",
        industry: "Various",
        salary: "$70,000 - $100,000",
        location: "Global opportunities",
        growth: "high",
        description: "Creating brand strategies and marketing campaigns for companies across industries."
      }
    ],
    tenYear: [
      {
        role: "Director / VP",
        industry: "Various",
        salary: "$120,000 - $200,000",
        location: "Corporate hubs",
        growth: "medium",
        description: "Senior leadership positions with significant decision-making authority and strategic influence."
      },
      {
        role: "Entrepreneur",
        industry: "Various",
        salary: "Variable",
        location: "Global",
        growth: "high",
        description: "Founding and growing businesses, leveraging industry experience and networks."
      },
      {
        role: "Chief Officer (CFO, CMO, COO)",
        industry: "Various",
        salary: "$150,000 - $300,000+",
        location: "Corporate headquarters",
        growth: "medium",
        description: "C-suite positions directing entire divisions or functions within organizations."
      }
    ]
  },
  "Architecture": {
    fiveYear: [
      {
        role: "Licensed Architect",
        industry: "Architecture / Design",
        salary: "$70,000 - $90,000",
        location: "Urban centers",
        growth: "medium",
        description: "Completing licensing requirements and working on increasingly complex projects."
      },
      {
        role: "Project Manager",
        industry: "Construction / Architecture",
        salary: "$75,000 - $95,000",
        location: "Various",
        growth: "high",
        description: "Managing architectural projects from concept to completion."
      },
      {
        role: "Urban Designer",
        industry: "Urban Planning",
        salary: "$65,000 - $85,000",
        location: "Cities",
        growth: "medium",
        description: "Working on city planning and public space design."
      }
    ],
    tenYear: [
      {
        role: "Senior Architect / Partner",
        industry: "Architecture",
        salary: "$100,000 - $150,000+",
        location: "Design centers",
        growth: "medium",
        description: "Leading major projects and potentially becoming partner in established firms."
      },
      {
        role: "Design Director",
        industry: "Architecture / Design",
        salary: "$110,000 - $160,000",
        location: "Global cities",
        growth: "medium",
        description: "Directing design vision for significant architectural projects or firms."
      },
      {
        role: "Firm Owner",
        industry: "Architecture",
        salary: "Variable",
        location: "Various",
        growth: "medium",
        description: "Running own architecture practice with established portfolio and client base."
      }
    ]
  }
};

const AlumniCareerPredictor: React.FC = () => {
  const [selectedDegree, setSelectedDegree] = useState<string | undefined>();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'fiveYear' | 'tenYear'>('fiveYear');
  const [isOpen, setIsOpen] = useState(false);

  const outcomes = selectedDegree ? degreeOutcomes[selectedDegree][selectedTimeframe] : [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartLine className="h-5 w-5 text-future-primary" />
          Alumni Career Predictor
        </CardTitle>
        <CardDescription>
          Explore potential career outcomes 5-10 years after graduation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between"
            >
              {isOpen ? "Hide Career Predictor" : "Explore Future Career Paths"}
              <span className="text-xs text-muted-foreground">
                {isOpen ? "↑" : "↓"}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Select Degree</label>
                  <Select 
                    value={selectedDegree} 
                    onValueChange={(value) => setSelectedDegree(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a degree" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(degreeOutcomes).map(degree => (
                        <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Timeframe</label>
                  <div className="flex rounded-md overflow-hidden border">
                    <Button
                      type="button"
                      variant={selectedTimeframe === 'fiveYear' ? 'default' : 'outline'}
                      className={`flex-1 rounded-none ${selectedTimeframe === 'fiveYear' ? 'bg-future-primary' : ''}`}
                      onClick={() => setSelectedTimeframe('fiveYear')}
                    >
                      5 Years
                    </Button>
                    <Button
                      type="button"
                      variant={selectedTimeframe === 'tenYear' ? 'default' : 'outline'}
                      className={`flex-1 rounded-none ${selectedTimeframe === 'tenYear' ? 'bg-future-primary' : ''}`}
                      onClick={() => setSelectedTimeframe('tenYear')}
                    >
                      10 Years
                    </Button>
                  </div>
                </div>
              </div>

              {selectedDegree ? (
                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold text-lg">
                    Potential careers {selectedTimeframe === 'fiveYear' ? '5' : '10'} years after a {selectedDegree} degree:
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {outcomes.map((outcome, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className={`h-2 ${outcome.growth === 'high' ? 'bg-green-500' : outcome.growth === 'medium' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{outcome.role}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge>{outcome.industry}</Badge>
                            <Badge variant="outline">{outcome.location}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <span className="text-sm font-medium block">Typical Salary Range:</span>
                            <span className="text-lg font-bold text-future-primary">{outcome.salary}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium block">Growth Opportunity:</span>
                            <div className="flex items-center gap-2">
                              <span className={`inline-block w-3 h-3 rounded-full ${
                                outcome.growth === 'high' ? 'bg-green-500' : 
                                outcome.growth === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                              }`}></span>
                              <span className="capitalize">{outcome.growth}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{outcome.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">Select a degree to see potential career outcomes</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default AlumniCareerPredictor;
