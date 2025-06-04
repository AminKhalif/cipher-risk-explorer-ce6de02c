import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Brain, AlertTriangle, Shield, Eye, Zap, Target } from 'lucide-react';
import AIProcessing from '@/components/AIProcessing';
import OrgChart from '@/components/OrgChart';
import RiskSidebar from '@/components/RiskSidebar';
import MitigationLab from '@/components/MitigationLab';
import { mockDossiers } from '@/data/mockDossiers';
import { analyzeCompanyData } from '@/services/openaiService';

interface AnalysisDashboardProps {
  dossierId: string;
  onBack: () => void;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ dossierId, onBack }) => {
  const [currentPhase, setCurrentPhase] = useState<'processing' | 'visualization' | 'mitigation'>('processing');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);

  const dossier = mockDossiers[dossierId];

  useEffect(() => {
    const runAnalysis = async () => {
      setIsLoading(true);
      
      // Simulate AI processing time with progressive updates
      const steps = [
        'Initializing CIPHER analysis engine...',
        'Parsing corporate structure data...',
        'Analyzing ownership patterns...',
        'Evaluating board composition...',
        'Assessing personnel risks...',
        'Calculating FOCI risk score...',
        'Generating recommendations...'
      ];

      for (let i = 0; i < steps.length; i++) {
        setTimeout(() => setAnimationStep(i), i * 600);
      }

      setTimeout(async () => {
        try {
          const analysis = await analyzeCompanyData(dossier);
          setAnalysisData(analysis);
          setCurrentPhase('visualization');
        } catch (error) {
          console.error('Analysis failed:', error);
          // Enhanced fallback data for demo
          setAnalysisData({
            riskScore: dossierId === 'red-october' ? 85 : 15,
            riskLevel: dossierId === 'red-october' ? 'CRITICAL' : 'LOW',
            risks: dossierId === 'red-october' ? [
              {
                type: 'Foreign Ownership',
                severity: 'HIGH',
                description: 'Eastern Star Holdings controls 60% voting shares - majority foreign control',
                evidence: 'Ownership_Structure.txt - Eastern Star Holdings (Country X): 60% ownership',
                category: 'Foreign Ownership',
                confidence: 'HIGH',
                impact: 'CRITICAL'
              },
              {
                type: 'Foreign Board Control',
                severity: 'HIGH', 
                description: 'Foreign nationals hold 3/5 board seats via Eastern Star appointments',
                evidence: 'Board_Composition.txt - Multiple Country X nationals on board',
                category: 'Foreign Control (Board/Management)',
                confidence: 'HIGH',
                impact: 'HIGH'
              },
              {
                type: 'Key Personnel Ties',
                severity: 'MEDIUM',
                description: 'CTO has dual citizenship and foreign government laboratory background',
                evidence: 'Key_Personnel.txt - Ivan Vorpatril background analysis',
                category: 'Key Personnel Foreign Ties',
                confidence: 'MEDIUM',
                impact: 'MEDIUM'
              }
            ] : [
              {
                type: 'Clean Structure',
                severity: 'LOW',
                description: 'No significant FOCI indicators detected',
                evidence: 'All documents reviewed - domestic ownership and control',
                category: 'Overall Assessment',
                confidence: 'HIGH',
                impact: 'MINIMAL'
              }
            ],
            summary: dossierId === 'red-october' ? 
              'Critical FOCI risks identified: majority foreign ownership and control structures pose significant national security concerns.' :
              'Low risk profile: domestic ownership and control with transparent, compliant structure.',
            recommendations: dossierId === 'red-october' ? [
              'Immediate restructuring required to reduce foreign ownership below 25%',
              'Implement security control agreements for foreign board members',
              'Enhanced background screening for key technical personnel'
            ] : [
              'Maintain current compliant structure',
              'Regular monitoring of ownership changes',
              'Continue security best practices'
            ],
            confidence: dossierId === 'red-october' ? 'HIGH' : 'HIGH',
            lastUpdated: new Date().toISOString()
          });
          setCurrentPhase('visualization');
        }
        setIsLoading(false);
      }, 4200);
    };

    runAnalysis();
  }, [dossierId, dossier]);

  // Auto-select high-risk node for demo effect
  useEffect(() => {
    if (currentPhase === 'visualization' && dossierId === 'red-october' && !selectedNode) {
      setTimeout(() => {
        setSelectedNode('eastern-star');
      }, 1000);
    }
  }, [currentPhase, dossierId, selectedNode]);

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-orange-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-600 animate-pulse';
      case 'HIGH': return 'bg-red-600';
      case 'MEDIUM': return 'bg-yellow-600';
      case 'LOW': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  if (currentPhase === 'processing') {
    return <AIProcessing companyName={dossier.name} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Enhanced Header */}
      <div className="container mx-auto px-4 py-6 border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Selection
            </Button>
            <div className="border-l border-slate-600 pl-4">
              <h1 className="text-2xl font-bold text-white flex items-center">
                {dossier.name}
                {analysisData?.riskLevel === 'CRITICAL' && (
                  <AlertTriangle className="h-6 w-6 ml-2 text-red-400 animate-pulse" />
                )}
              </h1>
              <p className="text-gray-400">{dossier.description}</p>
            </div>
          </div>
          
          {analysisData && (
            <div className="flex items-center space-x-6">
              {/* Risk Score Display */}
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">CIPHER Risk Score</p>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className={`text-3xl font-bold ${getRiskScoreColor(analysisData.riskScore)}`}>
                      {analysisData.riskScore}
                    </span>
                    <span className="text-gray-400 text-lg">/100</span>
                  </div>
                  <Badge 
                    className={`text-sm px-3 py-1 ${getRiskLevelColor(analysisData.riskLevel)}`}
                  >
                    {analysisData.riskLevel}
                  </Badge>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-32">
                <Progress 
                  value={analysisData.riskScore} 
                  className="h-4"
                />
                <p className="text-xs text-gray-500 mt-1 text-center">Risk Level</p>
              </div>

              {/* AI Confidence */}
              <div className="text-center">
                <div className="flex items-center space-x-1 mb-1">
                  <Brain className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-400">AI Confidence</span>
                </div>
                <Badge variant="outline" className="border-blue-500 text-blue-300">
                  {analysisData.confidence}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Phase Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-12 bg-slate-800/50 rounded-full px-8 py-4 backdrop-blur-sm">
            <button
              onClick={() => setCurrentPhase('visualization')}
              className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 ${
                currentPhase === 'visualization' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Eye className="h-5 w-5" />
              <span className="font-medium">Visualization</span>
              {currentPhase === 'visualization' && <Zap className="h-4 w-4 animate-pulse" />}
            </button>
            
            <div className={`h-px w-8 ${currentPhase === 'mitigation' ? 'bg-blue-400' : 'bg-gray-600'} transition-colors duration-300`} />
            
            <button
              onClick={() => currentPhase !== 'processing' && dossierId === 'red-october' && setCurrentPhase('mitigation')}
              disabled={dossierId !== 'red-october'}
              className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 ${
                currentPhase === 'mitigation' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                  : dossierId === 'red-october' 
                    ? 'text-gray-400 hover:text-white hover:bg-slate-700/50' 
                    : 'text-gray-600 cursor-not-allowed'
              }`}
            >
              <Shield className="h-5 w-5" />
              <span className="font-medium">Mitigation Lab</span>
              {currentPhase === 'mitigation' && <Target className="h-4 w-4 animate-pulse" />}
            </button>
          </div>
        </div>

        {/* Phase Content */}
        {currentPhase === 'visualization' && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <OrgChart 
                dossierId={dossierId}
                analysisData={analysisData}
                onNodeSelect={setSelectedNode}
                selectedNode={selectedNode}
              />
            </div>
            
            <div className="col-span-4 space-y-6">
              <RiskSidebar 
                selectedNode={selectedNode}
                analysisData={analysisData}
                dossier={dossier}
              />
              
              {/* Enhanced CTA */}
              <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Shield className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white mb-2">Ready for Mitigation?</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {dossierId === 'red-october' 
                        ? 'Explore interactive scenarios to reduce FOCI risks'
                        : 'Mitigation lab available for high-risk entities'
                      }
                    </p>
                    <Button
                      onClick={() => setCurrentPhase('mitigation')}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                      disabled={dossierId !== 'red-october'}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {dossierId === 'red-october' ? 'Open Mitigation Lab' : 'Not Available'}
                    </Button>
                    
                    {dossierId !== 'red-october' && (
                      <p className="text-xs text-gray-500 mt-2">
                        Low-risk entities don't require active mitigation
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentPhase === 'mitigation' && (
          <MitigationLab 
            dossierId={dossierId}
            initialAnalysis={analysisData}
            onBack={() => setCurrentPhase('visualization')}
          />
        )}
      </div>
    </div>
  );
};

export default AnalysisDashboard;
