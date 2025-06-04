
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, AlertTriangle, Target } from 'lucide-react';
import DossierSelection from '@/components/DossierSelection';
import AnalysisDashboard from '@/components/AnalysisDashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'selection' | 'analysis'>('intro');
  const [selectedDossier, setSelectedDossier] = useState<string | null>(null);

  const handleDossierSelect = (dossierId: string) => {
    setSelectedDossier(dossierId);
    setCurrentStep('analysis');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {currentStep === 'intro' && (
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16 pt-16">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-blue-400 mr-4" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                CIPHER
              </h1>
            </div>
            <p className="text-2xl text-gray-300 mb-4">
              Control Influence Profile for High-risk Entity Review
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
              AI-powered analysis system that transforms complex corporate structures into clear, actionable intelligence for national security assessments. From chaos to clarity to control.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <Eye className="h-8 w-8 text-red-400 mb-2" />
                  <CardTitle className="text-white">Identify</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Detect hidden foreign ownership, control structures, and influence networks</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <AlertTriangle className="h-8 w-8 text-yellow-400 mb-2" />
                  <CardTitle className="text-white">Analyze</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">AI-powered risk assessment with visual org charts and threat scoring</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <Target className="h-8 w-8 text-green-400 mb-2" />
                  <CardTitle className="text-white">Mitigate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Interactive scenario modeling for risk reduction strategies</p>
                </CardContent>
              </Card>
            </div>

            <Button 
              onClick={() => setCurrentStep('selection')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Begin Analysis Demo
            </Button>
          </div>

          {/* The Problem Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">The Challenge</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              In an interconnected global economy, identifying foreign ownership, control, or influence (FOCI) in companies vital to national security is increasingly complex. Traditional analysis methods are slow, prone to oversight, and struggle with the volume of modern corporate structures.
            </p>
          </div>
        </div>
      )}

      {currentStep === 'selection' && (
        <DossierSelection onSelectDossier={handleDossierSelect} />
      )}

      {currentStep === 'analysis' && selectedDossier && (
        <AnalysisDashboard 
          dossierId={selectedDossier} 
          onBack={() => setCurrentStep('selection')}
        />
      )}
    </div>
  );
};

export default Index;
