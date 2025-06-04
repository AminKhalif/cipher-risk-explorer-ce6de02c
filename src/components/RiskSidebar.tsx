
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileText, Target, Shield, Brain, ChevronDown, ChevronUp, Zap } from 'lucide-react';

interface RiskSidebarProps {
  selectedNode: string | null;
  analysisData: any;
  dossier: any;
}

const RiskSidebar: React.FC<RiskSidebarProps> = ({ selectedNode, analysisData, dossier }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getNodeDetails = (nodeId: string) => {
    const nodeMap: Record<string, any> = {
      'eastern-star': {
        name: 'Eastern Star Holdings',
        risk: 'HIGH',
        category: 'Foreign Ownership',
        aiSummary: 'Majority foreign control detected - 60% voting shares held by Country X entity',
        quickFacts: [
          'Controls 60% voting shares',
          'Country X jurisdiction',
          'Potential state influence'
        ],
        detailedFindings: [
          'Controls 60% voting shares - majority foreign ownership creating potential national security vulnerability',
          'Country X entity with unclear beneficial ownership structure',
          'Voting control enables influence over strategic corporate decisions, technology access, and business direction',
          'Concentration of control in single foreign entity amplifies FOCI risk profile'
        ],
        evidence: 'Ownership_Structure.txt - "Eastern Star Holdings (Country X): 60% ownership (Voting Shares)"',
        concernArea: 'Foreign Ownership',
        aiExplanation: 'This represents a critical FOCI risk as the foreign entity maintains controlling interest in a U.S. company with potential dual-use technology applications. The concentration of control exceeds typical national security thresholds.',
        mitigationSuggestions: [
          'Reduce foreign ownership below 25%',
          'Implement voting trust arrangements',
          'Establish security control agreements'
        ],
        threatLevel: 'CRITICAL',
        confidence: 'HIGH'
      },
      'director-1': {
        name: 'Director 1',
        risk: 'HIGH', 
        category: 'Foreign Control (Board/Management)',
        aiSummary: 'Foreign-appointed board member with potential influence over sensitive decisions',
        quickFacts: [
          'Appointed by Eastern Star',
          'Country X national',
          'Part of foreign majority (3/5)'
        ],
        detailedFindings: [
          'Appointee of majority foreign shareholder Eastern Star Holdings',
          'Country X national serving on board of U.S. technology company',
          'Part of foreign-controlled board majority (3 out of 5 seats)',
          'Access to strategic planning, technology roadmaps, and sensitive business information'
        ],
        evidence: 'Board_Composition.txt - "Director 1: Appointee of Eastern Star Holdings, National of Country X"',
        concernArea: 'Foreign Control (Board/Management)',
        aiExplanation: 'Foreign nationals holding board positions, especially when appointed by foreign shareholders, can influence strategic decisions and access sensitive information. The foreign board majority creates significant governance risks.',
        mitigationSuggestions: [
          'Limit foreign board representation',
          'Implement security agreements',
          'Restrict access to sensitive information'
        ],
        threatLevel: 'HIGH',
        confidence: 'HIGH'
      },
      'cto': {
        name: 'Ivan Vorpatril (CTO)',
        risk: 'MEDIUM',
        category: 'Key Personnel Foreign Ties',
        aiSummary: 'Dual citizen CTO with foreign government laboratory background',
        quickFacts: [
          'Dual US/Country X citizen',
          'Former X State Lab employee',
          'Controls technical operations'
        ],
        detailedFindings: [
          'Dual citizen (US/Country X) in Chief Technology Officer role',
          'Former employee of X State Innovations Lab (potential government ties)',
          'Direct access to company\'s dual-use technology and intellectual property',
          'Key decision-maker for technical strategy and product development'
        ],
        evidence: 'Key_Personnel.txt - "CTO: Ivan Vorpatril, Dual Citizen (US, Country X), Former Employee of X State Innovations Lab"',
        concernArea: 'Key Personnel Foreign Ties',
        aiExplanation: 'While dual citizenship isn\'t inherently problematic, the combination with foreign government laboratory experience in a CTO role creates potential channels for technology transfer and requires monitoring.',
        mitigationSuggestions: [
          'Background investigation',
          'Technology access restrictions',
          'Regular security clearance review'
        ],
        threatLevel: 'MEDIUM',
        confidence: 'MEDIUM'
      }
    };

    return nodeMap[nodeId] || null;
  };

  const QuickFactItem = ({ fact, icon: Icon }: { fact: string, icon?: any }) => (
    <div className="flex items-center space-x-2 p-2 bg-slate-700/30 rounded text-sm">
      {Icon && <Icon className="h-3 w-3 text-blue-400 flex-shrink-0" />}
      <span className="text-gray-300">{fact}</span>
    </div>
  );

  if (!selectedNode) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-400 animate-pulse" />
            AI Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Target className="h-16 w-16 mx-auto mb-4 text-blue-400/50" />
            <h3 className="text-lg font-semibold text-white mb-2">Select an Entity</h3>
            <p className="text-gray-400 mb-6">Click any node in the org chart to view detailed AI analysis</p>
          </div>
          
          {analysisData?.risks && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                  Key AI Findings
                </h3>
                <Badge variant="outline" className="border-blue-500 text-blue-300">
                  {analysisData.risks.length} Risks Detected
                </Badge>
              </div>
              
              {analysisData.risks.slice(0, 3).map((risk: any, index: number) => (
                <div key={index} className="p-4 bg-gradient-to-r from-slate-700/40 to-slate-600/30 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white text-sm">{risk.type}</span>
                    <Badge variant={risk.severity === 'HIGH' ? 'destructive' : 'default'} className="text-xs">
                      {risk.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{risk.description}</p>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <p className="text-xs text-gray-500">Click nodes above for detailed AI reasoning</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  const nodeDetails = getNodeDetails(selectedNode);
  
  if (!nodeDetails) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">No analysis available for this entity.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-400" />
            AI Analysis
          </span>
          <Badge 
            variant={nodeDetails.risk === 'HIGH' ? 'destructive' : nodeDetails.risk === 'MEDIUM' ? 'default' : 'default'}
            className={`${nodeDetails.risk === 'LOW' ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            {nodeDetails.threatLevel || nodeDetails.risk}
          </Badge>
        </CardTitle>
        <p className="text-gray-400 text-sm">{nodeDetails.name}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* AI Summary - Always visible */}
        <div className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/20 rounded-lg border border-blue-500/30">
          <div className="flex items-start space-x-3">
            <Brain className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white mb-2 text-sm">AI Assessment</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{nodeDetails.aiSummary}</p>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div>
          <h3 className="font-semibold text-white mb-3 flex items-center text-sm">
            <Zap className="h-4 w-4 mr-2 text-yellow-400" />
            Key Facts
          </h3>
          <div className="space-y-2">
            {nodeDetails.quickFacts.map((fact: string, index: number) => (
              <QuickFactItem key={index} fact={fact} />
            ))}
          </div>
        </div>

        {/* Expandable Detailed Analysis */}
        <div className="border-t border-slate-700 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection('detailed')}
            className="w-full justify-between p-3 hover:bg-slate-700/50"
          >
            <span className="flex items-center text-sm">
              <FileText className="h-4 w-4 mr-2 text-blue-400" />
              Detailed AI Findings
            </span>
            {expandedSections.detailed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {expandedSections.detailed && (
            <div className="mt-3 space-y-2">
              {nodeDetails.detailedFindings.map((finding: string, index: number) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-slate-700/20 rounded">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-300 leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Evidence Section */}
        <div className="border-t border-slate-700 pt-4">
          <h3 className="font-semibold text-white mb-3 text-sm">Supporting Evidence</h3>
          <div className="p-3 bg-slate-700/30 rounded border-l-4 border-blue-500">
            <p className="text-sm text-gray-300 font-mono leading-relaxed">{nodeDetails.evidence}</p>
          </div>
        </div>

        {/* FOCI Category */}
        <div className="border-t border-slate-700 pt-4">
          <h3 className="font-semibold text-white mb-3 flex items-center text-sm">
            <Shield className="h-4 w-4 mr-2 text-blue-400" />
            FOCI Category
          </h3>
          <Badge variant="outline" className="border-blue-500 text-blue-300 w-full justify-center py-2">
            {nodeDetails.concernArea}
          </Badge>
        </div>

        {/* Expandable AI Explanation */}
        <div className="border-t border-slate-700 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection('explanation')}
            className="w-full justify-between p-3 hover:bg-slate-700/50"
          >
            <span className="flex items-center text-sm">
              <Brain className="h-4 w-4 mr-2 text-blue-400" />
              AI Reasoning
            </span>
            {expandedSections.explanation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {expandedSections.explanation && (
            <div className="mt-3 p-4 bg-gradient-to-r from-slate-700/30 to-slate-600/20 rounded-lg">
              <p className="text-sm text-gray-300 leading-relaxed">{nodeDetails.aiExplanation}</p>
            </div>
          )}
        </div>

        {/* Mitigation Suggestions */}
        <div className="border-t border-slate-700 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection('mitigation')}
            className="w-full justify-between p-3 hover:bg-slate-700/50"
          >
            <span className="flex items-center text-sm">
              <Shield className="h-4 w-4 mr-2 text-green-400" />
              Mitigation Options
            </span>
            {expandedSections.mitigation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {expandedSections.mitigation && (
            <div className="mt-3 space-y-2">
              {nodeDetails.mitigationSuggestions.map((suggestion: string, index: number) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-green-900/20 rounded border-l-2 border-green-500">
                  <Shield className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-300">{suggestion}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confidence & Analysis Meta */}
        <div className="border-t border-slate-700 pt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">AI Confidence: {nodeDetails.confidence}</span>
            <span className="text-gray-500">CIPHER Engine v2.1</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskSidebar;
