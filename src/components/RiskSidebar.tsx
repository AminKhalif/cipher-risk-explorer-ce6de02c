
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, FileText, Target, Shield } from 'lucide-react';

interface RiskSidebarProps {
  selectedNode: string | null;
  analysisData: any;
  dossier: any;
}

const RiskSidebar: React.FC<RiskSidebarProps> = ({ selectedNode, analysisData, dossier }) => {
  const getNodeDetails = (nodeId: string) => {
    const nodeMap: Record<string, any> = {
      'eastern-star': {
        name: 'Eastern Star Holdings',
        risk: 'HIGH',
        category: 'Foreign Ownership',
        findings: [
          'Controls 60% voting shares - majority foreign ownership',
          'Country X entity with potential state ties',
          'Voting control enables corporate decision influence'
        ],
        evidence: 'Ownership_Structure.txt - "Eastern Star Holdings (Country X): 60% ownership (Voting Shares)"',
        concernArea: 'Foreign Ownership',
        explanation: 'This represents a critical FOCI risk as the foreign entity maintains controlling interest in a U.S. company with potential dual-use technology applications.'
      },
      'director-1': {
        name: 'Director 1',
        risk: 'HIGH', 
        category: 'Foreign Control (Board/Management)',
        findings: [
          'Appointee of majority foreign shareholder',
          'Country X national on U.S. company board',
          'Part of foreign-controlled board majority (3/5 seats)'
        ],
        evidence: 'Board_Composition.txt - "Director 1: Appointee of Eastern Star Holdings, National of Country X"',
        concernArea: 'Foreign Control (Board/Management)',
        explanation: 'Foreign nationals holding board positions, especially when appointed by foreign shareholders, can influence strategic decisions and access sensitive information.'
      },
      'cto': {
        name: 'Ivan Vorpatril (CTO)',
        risk: 'MEDIUM',
        category: 'Key Personnel Foreign Ties',
        findings: [
          'Dual citizen (US/Country X) in sensitive technical role',
          'Former employee of X State Innovations Lab',
          'Access to company\'s dual-use technology'
        ],
        evidence: 'Key_Personnel.txt - "CTO: Ivan Vorpatril, Dual Citizen (US, Country X), Former Employee of X State Innovations Lab"',
        concernArea: 'Key Personnel Foreign Ties',
        explanation: 'While dual citizenship isn\'t inherently problematic, the combination with foreign government lab experience in a CTO role warrants monitoring.'
      }
    };

    return nodeMap[nodeId] || null;
  };

  if (!selectedNode) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-400" />
            Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">Select an entity from the org chart to view detailed FOCI analysis</p>
          </div>
          
          {analysisData?.risks && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-white">Overall Risk Summary</h3>
              {analysisData.risks.map((risk: any, index: number) => (
                <div key={index} className="p-3 bg-slate-700/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{risk.type}</span>
                    <Badge variant={risk.severity === 'HIGH' ? 'destructive' : 'default'}>
                      {risk.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300">{risk.description}</p>
                </div>
              ))}
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
          <p className="text-gray-400">No detailed analysis available for this entity.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-blue-400" />
            {nodeDetails.name}
          </span>
          <Badge variant={nodeDetails.risk === 'HIGH' ? 'destructive' : 'default'}>
            {nodeDetails.risk} RISK
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-white mb-2 flex items-center">
            <FileText className="h-4 w-4 mr-2 text-blue-400" />
            AI Findings
          </h3>
          <ul className="space-y-2">
            {nodeDetails.findings.map((finding: string, index: number) => (
              <li key={index} className="text-sm text-gray-300 flex items-start">
                <div className="h-1.5 w-1.5 rounded-full bg-red-400 mt-2 mr-2 flex-shrink-0" />
                {finding}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-slate-700 pt-4">
          <h3 className="font-semibold text-white mb-2">Supporting Evidence</h3>
          <div className="p-3 bg-slate-700/30 rounded">
            <p className="text-sm text-gray-300 font-mono">{nodeDetails.evidence}</p>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-4">
          <h3 className="font-semibold text-white mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-2 text-blue-400" />
            FOCI Concern Category
          </h3>
          <Badge variant="outline" className="border-blue-500 text-blue-300">
            {nodeDetails.concernArea}
          </Badge>
        </div>

        <div className="border-t border-slate-700 pt-4">
          <h3 className="font-semibold text-white mb-2">AI Explanation</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {nodeDetails.explanation}
          </p>
        </div>

        <div className="border-t border-slate-700 pt-4">
          <p className="text-xs text-gray-400 text-center">
            Analysis powered by OpenAI • CIPHER Risk Assessment Engine
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskSidebar;
