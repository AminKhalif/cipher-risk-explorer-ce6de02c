
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Brain, AlertTriangle, Shield, Eye } from 'lucide-react';
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

  const dossier = mockDossiers[dossierId];

  useEffect(() => {
    const runAnalysis = async () => {
      setIsLoading(true);
      
      // Simulate AI processing time
      setTimeout(async () => {
        try {
          const analysis = await analyzeCompanyData(dossier);
          setAnalysisData(analysis);
          setCurrentPhase('visualization');
        } catch (error) {
          console.error('Analysis failed:', error);
          // Fallback to mock data for demo
          setAnalysisData({
            riskScore: dossierId === 'red-october' ? 85 : 15,
            riskLevel: dossierId === 'red-october' ? 'CRITICAL' : 'LOW',
            risks: dossierId === 'red-october' ? [
              {
                type: 'Foreign Ownership',
                severity: 'HIGH',
                description: 'Eastern Star Holdings controls 60% voting shares',
                evidence: 'Ownership_Structure.txt - Eastern Star Holdings (Country X): 60% ownership'
              }
            ] : []
          });
          setCurrentPhase('visualization');
        }
        setIsLoading(false);
      }, 4000);
    };

    runAnalysis();
  }, [dossierId, dossier]);

  if (currentPhase === 'processing') {
    return <AIProcessing companyName={dossier.name} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Selection
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">{dossier.name}</h1>
              <p className="text-gray-400">{dossier.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {analysisData && (
              <>
                <div className="text-right">
                  <p className="text-sm text-gray-400">CIPHER Risk Score</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">{analysisData.riskScore}</span>
                    <Badge 
                      variant={analysisData.riskLevel === 'CRITICAL' || analysisData.riskLevel === 'HIGH' ? 'destructive' : 'default'}
                      className={analysisData.riskLevel === 'LOW' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      {analysisData.riskLevel}
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={analysisData.riskScore} 
                  className="w-32 h-3"
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Phase Navigation */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-8">
            <div className={`flex items-center space-x-2 ${currentPhase === 'visualization' ? 'text-blue-400' : 'text-gray-400'}`}>
              <Eye className="h-5 w-5" />
              <span className="font-medium">Visualization</span>
            </div>
            <div className={`flex items-center space-x-2 ${currentPhase === 'mitigation' ? 'text-blue-400' : 'text-gray-400'}`}>
              <Shield className="h-5 w-5" />
              <span className="font-medium">Mitigation Lab</span>
            </div>
          </div>
        </div>

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
            <div className="col-span-4">
              <RiskSidebar 
                selectedNode={selectedNode}
                analysisData={analysisData}
                dossier={dossier}
              />
              <div className="mt-6">
                <Button
                  onClick={() => setCurrentPhase('mitigation')}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  disabled={dossierId !== 'red-october'}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Open Mitigation Lab
                </Button>
                {dossierId !== 'red-october' && (
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    Mitigation lab available for high-risk entities
                  </p>
                )}
              </div>
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
