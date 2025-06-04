
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Search, FileText, Shield, AlertTriangle } from 'lucide-react';

interface AIProcessingProps {
  companyName: string;
}

const AIProcessing: React.FC<AIProcessingProps> = ({ companyName }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const processingSteps = [
    {
      icon: FileText,
      title: "Ingesting Corporate Data",
      description: "Parsing ownership structures, board composition, and financial agreements...",
      duration: 1000
    },
    {
      icon: Search,
      title: "Analyzing Entity Relationships",
      description: "Mapping corporate hierarchies and identifying foreign connections...",
      duration: 1200
    },
    {
      icon: AlertTriangle,
      title: "Identifying FOCI Risks",
      description: "Detecting ownership control patterns and influence vectors...",
      duration: 1000
    },
    {
      icon: Shield,
      title: "Generating Risk Assessment",
      description: "Calculating CIPHER score and categorizing threat levels...",
      duration: 800
    }
  ];

  useEffect(() => {
    let totalDuration = 0;
    const stepDurations = processingSteps.map(step => step.duration);
    
    stepDurations.forEach((duration, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        const progressIncrement = (index + 1) * (100 / processingSteps.length);
        
        // Animate progress for current step
        let currentProgress = index * (100 / processingSteps.length);
        const stepProgress = 100 / processingSteps.length;
        const incrementSize = stepProgress / (duration / 50);
        
        const progressInterval = setInterval(() => {
          currentProgress += incrementSize;
          if (currentProgress >= progressIncrement) {
            currentProgress = progressIncrement;
            clearInterval(progressInterval);
          }
          setProgress(currentProgress);
        }, 50);
        
      }, totalDuration);
      totalDuration += duration;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Brain className="h-12 w-12 text-blue-400 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">CIPHER AI Analyzing</h2>
              <p className="text-xl text-gray-300">{companyName}</p>
            </div>

            <div className="space-y-6 mb-8">
              {processingSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-500 ${
                      isActive ? 'bg-blue-900/30 border border-blue-500/30' : 
                      isCompleted ? 'bg-green-900/20' : 'bg-slate-700/30'
                    }`}
                  >
                    <div className={`flex-shrink-0 p-2 rounded-full ${
                      isActive ? 'bg-blue-500' : 
                      isCompleted ? 'bg-green-500' : 'bg-slate-600'
                    }`}>
                      <StepIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        isActive || isCompleted ? 'text-white' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${
                        isActive ? 'text-blue-200' : 
                        isCompleted ? 'text-green-200' : 'text-gray-500'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className="flex-shrink-0">
                        <div className="animate-spin h-5 w-5 border-2 border-blue-400 border-t-transparent rounded-full" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Analysis Progress</span>
                <span className="text-white">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Powered by OpenAI • Processing {companyName} corporate structure
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIProcessing;
