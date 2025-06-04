
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Beaker, TrendingDown, Shield, Users, DollarSign, Building, User, CheckCircle, AlertCircle, Lightbulb, Zap, Target, Brain } from 'lucide-react';
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
    eliminateForeignFinancing: false,
    addressCtoTies: false
  });

  const [mitigatedAnalysis, setMitigatedAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // AI-suggested optimal pathways
  const aiOptimalPathways = [
    {
      name: "Quick Compliance",
      description: "Fastest route to regulatory compliance",
      icon: Zap,
      changes: {
        easternStarOwnership: 25,
        foreignBoardSeats: 2,
        eliminateForeignFinancing: true,
        addressCtoTies: true
      },
      effort: "Medium",
      timeframe: "6-12 months",
      impact: "High compliance, maintains some foreign investment"
    },
    {
      name: "Maximum Security",
      description: "Eliminate all major FOCI concerns",
      icon: Shield,
      changes: {
        easternStarOwnership: 10,
        foreignBoardSeats: 0,
        eliminateForeignFinancing: true,
        addressCtoTies: true
      },
      effort: "High",
      timeframe: "12-18 months",
      impact: "Complete risk elimination, may affect growth"
    },
    {
      name: "Balanced Approach",
      description: "Optimal balance of risk reduction and business continuity",
      icon: Target,
      changes: {
        easternStarOwnership: 20,
        foreignBoardSeats: 1,
        eliminateForeignFinancing: true,
        addressCtoTies: false
      },
      effort: "Medium",
      timeframe: "9-15 months",
      impact: "Significant risk reduction with business flexibility"
    }
  ];

  // Calculate impact in real-time
  useEffect(() => {
    const calculateImpact = () => {
      let riskReduction = 0;
      
      // Ownership impact (40 point potential reduction)
      const ownershipReduction = Math.max(0, (60 - mitigationSettings.easternStarOwnership)) / 60 * 40;
      
      // Board control impact (25 point potential reduction)
      const boardReduction = Math.max(0, (3 - mitigationSettings.foreignBoardSeats)) / 3 * 25;
      
      // Financial independence (15 point potential reduction)
      const financingReduction = mitigationSettings.eliminateForeignFinancing ? 15 : 0;
      
      // Personnel security (10 point potential reduction)
      const personnelReduction = mitigationSettings.addressCtoTies ? 10 : 0;
      
      riskReduction = ownershipReduction + boardReduction + financingReduction + personnelReduction;
      
      const newScore = Math.max(15, initialAnalysis.riskScore - riskReduction);
      const newLevel = newScore >= 70 ? 'HIGH' : newScore >= 40 ? 'MODERATE' : 'LOW';
      
      setMitigatedAnalysis({
        newRiskScore: Math.round(newScore),
        newRiskLevel: newLevel,
        riskReduction: Math.round(riskReduction),
        impactBreakdown: {
          ownership: Math.round(ownershipReduction),
          board: Math.round(boardReduction),
          financing: Math.round(financingReduction),
          personnel: Math.round(personnelReduction)
        }
      });
    };

    calculateImpact();
  }, [mitigationSettings, initialAnalysis.riskScore]);

  const applyAiSuggestion = (pathway: any) => {
    setMitigationSettings(pathway.changes);
    setShowSuggestions(false);
  };

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

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const currentScore = mitigatedAnalysis?.newRiskScore || initialAnalysis.riskScore;
  const currentLevel = mitigatedAnalysis?.newRiskLevel || initialAnalysis.riskLevel;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="text-gray-300 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analysis
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <Beaker className="h-6 w-6 mr-2 text-blue-400" />
              Risk Reduction Simulator
            </h1>
            <p className="text-gray-400">Explore "what-if" scenarios to reduce foreign influence risks</p>
          </div>
        </div>

        {/* AI Suggestions Toggle */}
        <Button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Brain className="h-4 w-4 mr-2" />
          AI Suggestions
          {showSuggestions ? <AlertCircle className="h-4 w-4 ml-2" /> : <Lightbulb className="h-4 w-4 ml-2" />}
        </Button>
      </div>

      {/* AI Suggestions Panel */}
      {showSuggestions && (
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-400" />
              AI-Recommended Pathways
            </CardTitle>
            <p className="text-gray-300 text-sm">
              CIPHER AI has analyzed optimal routes for risk reduction based on regulatory requirements and business impact
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiOptimalPathways.map((pathway, index) => (
                <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-600 hover:border-purple-400 transition-all">
                  <div className="flex items-center space-x-3 mb-3">
                    <pathway.icon className="h-6 w-6 text-purple-400" />
                    <div>
                      <h3 className="font-semibold text-white">{pathway.name}</h3>
                      <p className="text-xs text-gray-400">{pathway.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Effort:</span>
                      <Badge className={`text-xs ${getEffortColor(pathway.effort)}`}>
                        {pathway.effort}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Timeline:</span>
                      <span className="text-white text-xs">{pathway.timeframe}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-400 mb-3">{pathway.impact}</p>
                  
                  <Button
                    onClick={() => applyAiSuggestion(pathway)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-sm"
                    size="sm"
                  >
                    Apply This Pathway
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Score Comparison */}
      <div className="flex items-center space-x-8 justify-center">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Original Risk</p>
          <div className="text-xl font-bold text-red-400">{initialAnalysis.riskScore}</div>
          <Badge variant="destructive" className="text-xs">CRITICAL</Badge>
        </div>
        <div className="text-4xl text-gray-400">→</div>
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Projected Risk</p>
          <div className={`text-xl font-bold ${getRiskColor(currentLevel)}`}>{currentScore}</div>
          <Badge className={`text-xs ${currentLevel === 'LOW' ? 'bg-green-600 hover:bg-green-700' : currentLevel === 'MODERATE' ? 'bg-yellow-600' : 'bg-red-600'}`}>
            {currentLevel}
          </Badge>
        </div>
        {mitigatedAnalysis?.riskReduction > 0 && (
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">Risk Reduced</p>
            <div className="text-xl font-bold text-green-400">-{mitigatedAnalysis.riskReduction}</div>
            <Badge variant="outline" className="text-xs border-green-500 text-green-300">
              IMPROVEMENT
            </Badge>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Control Panel */}
        <div className="col-span-5 space-y-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Manual Risk Reduction Controls</CardTitle>
              <p className="text-sm text-gray-400">Fine-tune these factors to see how they impact the overall risk score</p>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Ownership Control */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <Building className="h-5 w-5 text-blue-400" />
                  <div>
                    <h3 className="font-semibold text-white">Foreign Ownership Reduction</h3>
                    <p className="text-xs text-gray-400">Reduce Eastern Star Holdings control</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Current: 60% (Critical Risk)</span>
                    <span className="text-sm font-semibold text-white">Target: {mitigationSettings.easternStarOwnership}%</span>
                  </div>
                  
                  <div className="space-y-2">
                    {[45, 30, 20, 10].map((percentage) => (
                      <button
                        key={percentage}
                        onClick={() => setMitigationSettings({...mitigationSettings, easternStarOwnership: percentage})}
                        className={`w-full text-left p-2 rounded text-sm transition-all ${
                          mitigationSettings.easternStarOwnership === percentage 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-600/50 text-gray-300 hover:bg-slate-600'
                        }`}
                      >
                        Reduce to {percentage}% {percentage <= 25 && '(Compliant)'}
                      </button>
                    ))}
                  </div>
                  
                  <div className="text-xs text-gray-400 mt-2">
                    <strong>Why this matters:</strong> Foreign ownership above 25% often triggers enhanced security reviews
                  </div>
                </div>
              </div>

              {/* Board Control */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Board Composition Changes</h3>
                    <p className="text-xs text-gray-400">Replace foreign directors with US citizens</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Current: 3/5 foreign directors</span>
                    <span className="text-sm font-semibold text-white">Target: {mitigationSettings.foreignBoardSeats}/5</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((seats) => (
                      <button
                        key={seats}
                        onClick={() => setMitigationSettings({...mitigationSettings, foreignBoardSeats: seats})}
                        className={`p-2 rounded text-sm transition-all ${
                          mitigationSettings.foreignBoardSeats === seats 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-slate-600/50 text-gray-300 hover:bg-slate-600'
                        }`}
                      >
                        {seats} foreign
                      </button>
                    ))}
                  </div>
                  
                  <div className="text-xs text-gray-400 mt-2">
                    <strong>Impact:</strong> Reducing foreign board control improves decision-making independence
                  </div>
                </div>
              </div>

              {/* Financial Independence */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    <div>
                      <h3 className="font-semibold text-white">Financial Independence</h3>
                      <p className="text-xs text-gray-400">Replace $10M foreign loan with domestic financing</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMitigationSettings({
                      ...mitigationSettings, 
                      eliminateForeignFinancing: !mitigationSettings.eliminateForeignFinancing
                    })}
                    className={`p-2 rounded-full transition-all ${
                      mitigationSettings.eliminateForeignFinancing 
                        ? 'bg-green-600 text-white' 
                        : 'bg-slate-600 text-gray-400 hover:bg-slate-500'
                    }`}
                  >
                    {mitigationSettings.eliminateForeignFinancing ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                  </button>
                </div>
                
                <div className="text-xs text-gray-400">
                  <strong>Current:</strong> $10M loan from Global Horizon Bank (Country X) with board observer rights<br/>
                  <strong>Action:</strong> {mitigationSettings.eliminateForeignFinancing ? 'Replace with US domestic financing' : 'Keep current foreign financing'}
                </div>
              </div>

              {/* Personnel Security */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-orange-400" />
                    <div>
                      <h3 className="font-semibold text-white">Key Personnel Security</h3>
                      <p className="text-xs text-gray-400">Address CTO's foreign government laboratory ties</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMitigationSettings({
                      ...mitigationSettings, 
                      addressCtoTies: !mitigationSettings.addressCtoTies
                    })}
                    className={`p-2 rounded-full transition-all ${
                      mitigationSettings.addressCtoTies 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-slate-600 text-gray-400 hover:bg-slate-500'
                    }`}
                  >
                    {mitigationSettings.addressCtoTies ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                  </button>
                </div>
                
                <div className="text-xs text-gray-400">
                  <strong>Issue:</strong> CTO Ivan Vorpatril has dual citizenship and previous employment at foreign government lab<br/>
                  <strong>Action:</strong> {mitigationSettings.addressCtoTies ? 'Implement security protocols & disclosure requirements' : 'No action taken'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Visualization */}
        <div className="col-span-7">
          <Card className="bg-slate-800/50 border-slate-700 h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-blue-400" />
                Real-Time Impact Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Overall Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">Risk Reduction Progress</h3>
                  <span className="text-2xl font-bold text-green-400">
                    -{mitigatedAnalysis?.riskReduction || 0} points
                  </span>
                </div>
                <Progress 
                  value={(mitigatedAnalysis?.riskReduction || 0) / 90 * 100} 
                  className="h-6"
                />
                <p className="text-sm text-gray-400">
                  Maximum possible reduction: 90 points (from critical reforms)
                </p>
              </div>

              {/* Impact Breakdown */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Impact by Category</h3>
                
                {[
                  { name: 'Foreign Ownership', icon: Building, current: mitigatedAnalysis?.impactBreakdown?.ownership || 0, max: 40, color: 'blue' },
                  { name: 'Board Control', icon: Users, current: mitigatedAnalysis?.impactBreakdown?.board || 0, max: 25, color: 'purple' },
                  { name: 'Financial Independence', icon: DollarSign, current: mitigatedAnalysis?.impactBreakdown?.financing || 0, max: 15, color: 'green' },
                  { name: 'Personnel Security', icon: User, current: mitigatedAnalysis?.impactBreakdown?.personnel || 0, max: 10, color: 'orange' }
                ].map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <category.icon className={`h-4 w-4 text-${category.color}-400`} />
                        <span className="text-white text-sm">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-300">
                        -{category.current} / -{category.max} max
                      </span>
                    </div>
                    <Progress 
                      value={(category.current / category.max) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>

              {/* Status Summary */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <h3 className="font-semibold text-white mb-2">Current Status</h3>
                <div className="space-y-2 text-sm">
                  {currentLevel === 'LOW' && (
                    <div className="flex items-center space-x-2 text-green-300">
                      <CheckCircle className="h-4 w-4" />
                      <span>Company would meet security compliance standards</span>
                    </div>
                  )}
                  {currentLevel === 'MODERATE' && (
                    <div className="flex items-center space-x-2 text-yellow-300">
                      <AlertCircle className="h-4 w-4" />
                      <span>Additional review required, but manageable risk level</span>
                    </div>
                  )}
                  {currentLevel === 'HIGH' && (
                    <div className="flex items-center space-x-2 text-red-300">
                      <AlertCircle className="h-4 w-4" />
                      <span>Still requires significant additional mitigation measures</span>
                    </div>
                  )}
                  
                  <div className="text-gray-400 mt-3">
                    <strong>Next Steps:</strong> {
                      currentLevel === 'LOW' 
                        ? 'Company can proceed with standard security protocols'
                        : currentLevel === 'MODERATE'
                        ? 'Implement monitoring agreements and periodic reviews'
                        : 'Continue reducing foreign influence before approval'
                    }
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MitigationLab;
