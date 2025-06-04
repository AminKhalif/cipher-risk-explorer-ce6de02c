
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Beaker, TrendingDown, Shield, RefreshCw } from 'lucide-react';
import { analyzeMitigationImpact } from '@/services/openaiService';

interface MitigationLabProps {
  dossierId: string;
  initialAnalysis: any;
  onBack: () => void;
}

const MitigationLab: React.FC<MitigationLabProps> = ({ dossierId, initialAnalysis, onBack }) => {
  const [mitigationSettings, setMitigationSettings] = useState({
    easternStarOwnership: 60,
    foreignBoardSeats: 3,
    foreignFinancing: true,
    ctoForeignTies: true
  });

  const [mitigatedAnalysis, setMitigatedAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runMitigationAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const changes = {
        'Eastern Star Ownership Reduced': `${mitigationSettings.easternStarOwnership}% (from 60%)`,
        'Foreign Board Seats': `${mitigationSettings.foreignBoardSeats}/5 (from 3/5)`,
        'Foreign Financing Dependency': mitigationSettings.foreignFinancing ? 'Maintained' : 'Eliminated',
        'CTO Foreign Ties': mitigationSettings.ctoForeignTies ? 'Maintained' : 'Severed'
      };

      const result = await analyzeMitigationImpact(initialAnalysis, changes);
      setMitigatedAnalysis(result);
    } catch (error) {
      console.error('Mitigation analysis failed:', error);
      // Fallback to mock analysis
      const mockImpact = calculateMockImpact();
      setMitigatedAnalysis(mockImpact);
    }
    setIsAnalyzing(false);
  };

  const calculateMockImpact = () => {
    let riskReduction = 0;
    
    // Calculate risk reduction based on changes
    const ownershipReduction = (60 - mitigationSettings.easternStarOwnership) / 60 * 40;
    const boardReduction = (3 - mitigationSettings.foreignBoardSeats) / 3 * 25;
    const financingReduction = mitigationSettings.foreignFinancing ? 0 : 15;
    const personnelReduction = mitigationSettings.ctoForeignTies ? 0 : 10;
    
    riskReduction = ownershipReduction + boardReduction + financingReduction + personnelReduction;
    
    const newScore = Math.max(15, initialAnalysis.riskScore - riskReduction);
    const newLevel = newScore > 70 ? 'HIGH' : newScore > 40 ? 'MODERATE' : 'LOW';
    
    return {
      newRiskScore: Math.round(newScore),
      newRiskLevel: newLevel,
      impactSummary: `Risk reduced by ${Math.round(riskReduction)} points through ownership dilution and governance changes.`,
      remainingConcerns: newScore > 40 ? 'Significant foreign influence remains through remaining ownership stake and board presence.' : 'Minimal residual risk with current mitigation measures.'
    };
  };

  useEffect(() => {
    runMitigationAnalysis();
  }, [mitigationSettings]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'HIGH':
      case 'CRITICAL':
        return 'text-red-400';
      case 'MODERATE':
        return 'text-yellow-400';
      case 'LOW':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const currentScore = mitigatedAnalysis?.newRiskScore || initialAnalysis.riskScore;
  const currentLevel = mitigatedAnalysis?.newRiskLevel || initialAnalysis.riskLevel;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="text-gray-300 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Visualization
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <Beaker className="h-6 w-6 mr-2 text-blue-400" />
              Interactive Mitigation Lab
            </h1>
            <p className="text-gray-400">Simulate risk reduction strategies for Red October Innovations</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-400">Updated CIPHER Score</p>
          <div className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${getRiskColor(currentLevel)}`}>
              {currentScore}
            </span>
            <Badge 
              variant={currentLevel === 'HIGH' || currentLevel === 'CRITICAL' ? 'destructive' : 'default'}
              className={currentLevel === 'LOW' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              {currentLevel}
            </Badge>
          </div>
          <Progress value={currentScore} className="w-32 h-3 mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Mitigation Controls */}
        <div className="col-span-4 space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Mitigation Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Eastern Star Ownership */}
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Eastern Star Holdings Ownership: {mitigationSettings.easternStarOwnership}%
                </label>
                <Slider
                  value={[mitigationSettings.easternStarOwnership]}
                  onValueChange={(value) => setMitigationSettings({
                    ...mitigationSettings,
                    easternStarOwnership: value[0]
                  })}
                  max={60}
                  min={0}
                  step={5}
                  className="mb-2"
                />
                <p className="text-xs text-gray-400">Reduce foreign ownership percentage</p>
              </div>

              {/* Foreign Board Seats */}
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Foreign Board Seats: {mitigationSettings.foreignBoardSeats}/5
                </label>
                <Slider
                  value={[mitigationSettings.foreignBoardSeats]}
                  onValueChange={(value) => setMitigationSettings({
                    ...mitigationSettings,
                    foreignBoardSeats: value[0]
                  })}
                  max={3}
                  min={0}
                  step={1}
                  className="mb-2"
                />
                <p className="text-xs text-gray-400">Replace foreign directors with US citizens</p>
              </div>

              {/* Foreign Financing */}
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Foreign Financing Dependency
                </label>
                <Button
                  variant={mitigationSettings.foreignFinancing ? "destructive" : "default"}
                  className="w-full"
                  onClick={() => setMitigationSettings({
                    ...mitigationSettings,
                    foreignFinancing: !mitigationSettings.foreignFinancing
                  })}
                >
                  {mitigationSettings.foreignFinancing ? 'Eliminate Foreign Debt' : 'Foreign Debt Eliminated'}
                </Button>
                <p className="text-xs text-gray-400 mt-1">
                  Replace $10M Global Horizon Bank loan with domestic financing
                </p>
              </div>

              {/* CTO Foreign Ties */}
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  CTO Foreign Laboratory Ties
                </label>
                <Button
                  variant={mitigationSettings.ctoForeignTies ? "outline" : "default"}
                  className="w-full"
                  onClick={() => setMitigationSettings({
                    ...mitigationSettings,
                    ctoForeignTies: !mitigationSettings.ctoForeignTies
                  })}
                >
                  {mitigationSettings.ctoForeignTies ? 'Address Foreign Ties' : 'Ties Addressed'}
                </Button>
                <p className="text-xs text-gray-400 mt-1">
                  Require formal declaration of foreign government lab ties
                </p>
              </div>

              <Button
                onClick={runMitigationAnalysis}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {isAnalyzing ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Shield className="h-4 w-4 mr-2" />
                )}
                Reanalyze Risk Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Impact Analysis */}
        <div className="col-span-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-blue-400" />
                Risk Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-300">AI analyzing mitigation impact...</p>
                  </div>
                </div>
              ) : mitigatedAnalysis ? (
                <div className="space-y-6">
                  {/* Score Comparison */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">Original Score</p>
                      <p className="text-3xl font-bold text-red-400">{initialAnalysis.riskScore}</p>
                      <Badge variant="destructive" className="mt-2">
                        {initialAnalysis.riskLevel}
                      </Badge>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">Mitigated Score</p>
                      <p className={`text-3xl font-bold ${getRiskColor(currentLevel)}`}>
                        {currentScore}
                      </p>
                      <Badge 
                        variant={currentLevel === 'HIGH' ? 'destructive' : 'default'}
                        className={`mt-2 ${currentLevel === 'LOW' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                      >
                        {currentLevel}
                      </Badge>
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div>
                    <h3 className="font-semibold text-white mb-3">Impact Summary</h3>
                    <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                      <p className="text-blue-200">{mitigatedAnalysis.impactSummary}</p>
                    </div>
                  </div>

                  {/* Remaining Concerns */}
                  <div>
                    <h3 className="font-semibold text-white mb-3">Remaining Concerns</h3>
                    <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                      <p className="text-yellow-200">{mitigatedAnalysis.remainingConcerns}</p>
                    </div>
                  </div>

                  {/* Risk Reduction Visualization */}
                  <div>
                    <h3 className="font-semibold text-white mb-3">Risk Reduction Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Ownership Dilution</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-slate-600 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(100, (60 - mitigationSettings.easternStarOwnership) / 60 * 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400 w-12">
                            -{Math.round((60 - mitigationSettings.easternStarOwnership) / 60 * 40)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Board Restructuring</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-slate-600 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(100, (3 - mitigationSettings.foreignBoardSeats) / 3 * 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400 w-12">
                            -{Math.round((3 - mitigationSettings.foreignBoardSeats) / 3 * 25)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Financial Independence</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-slate-600 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${mitigationSettings.foreignFinancing ? 0 : 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400 w-12">
                            -{mitigationSettings.foreignFinancing ? 0 : 15}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">Adjust mitigation controls to see impact analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MitigationLab;
