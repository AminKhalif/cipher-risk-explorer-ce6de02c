
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileText, Target, Shield, Brain, ChevronDown, ChevronUp, Zap, Building, Users } from 'lucide-react';

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
      'shenyang-industrial': {
        name: 'Shenyang Industrial Holdings Co., Ltd.',
        risk: 'HIGH',
        category: 'Foreign Ownership',
        aiSummary: 'Chinese state-linked conglomerate with majority control - 60% voting shares creates critical national security vulnerability',
        quickFacts: [
          'Controls 60% voting shares (majority)',
          'Chinese state-owned enterprise',
          'Headquartered in Shenyang, China',
          'Potential government influence channel'
        ],
        detailedFindings: [
          'Holds controlling 60% voting share position, exceeding critical FOCI thresholds',
          'Classified as state-owned enterprise under Chinese government oversight',
          'Voting control enables influence over strategic corporate decisions, technology access, and business direction',
          'Concentration of control in single foreign SOE amplifies national security risk profile',
          'Parent company has documented ties to Chinese military-industrial complex'
        ],
        evidence: 'Ownership_Structure.txt - "Shenyang Industrial Holdings (China): 60% ownership (Voting Shares)"',
        concernArea: 'Foreign Ownership',
        aiExplanation: 'This represents a critical FOCI risk as the Chinese state-owned entity maintains controlling interest in a U.S. company with dual-use technology. The concentration of control exceeds all national security thresholds and creates direct channels for foreign government influence.',
        mitigationSuggestions: [
          'Reduce foreign ownership below 25% threshold',
          'Implement voting trust arrangements with U.S. trustees',
          'Establish security control agreements with government oversight',
          'Consider forced divestiture if national security requires'
        ],
        threatLevel: 'CRITICAL',
        confidence: 'HIGH',
        entityDetails: {
          fullName: 'Shenyang Industrial Holdings Co., Ltd.',
          jurisdiction: 'People\'s Republic of China',
          businessType: 'State-Owned Enterprise',
          established: '1999',
          ownership: '60% voting shares',
          marketCap: '$8.2B USD',
          employees: '45,000+'
        }
      },
      'li-xiaoping': {
        name: 'Li Xiaoping',
        risk: 'HIGH', 
        category: 'Foreign Control (Board/Management)',
        aiSummary: 'Chairman appointed by Chinese SOE with government background - direct foreign control channel',
        quickFacts: [
          'Chairman of the Board',
          'Appointed by Shenyang Industrial Holdings',
          'Chinese national with government ties',
          'Former municipal government official'
        ],
        detailedFindings: [
          'Serves as Chairman appointed by majority foreign shareholder Shenyang Industrial Holdings',
          'Chinese national with documented government service background',
          'Former Deputy Director of Shenyang Municipal Government Economic Development Committee',
          'Direct authority over board decisions, strategic planning, and corporate governance',
          'Access to sensitive technology information and business intelligence'
        ],
        evidence: 'Board_Composition.txt - "Li Xiaoping, Appointee of Shenyang Industrial Holdings, Chinese National"',
        concernArea: 'Foreign Control (Board/Management)',
        aiExplanation: 'Foreign nationals in chairman positions, especially those with government backgrounds appointed by foreign SOEs, represent direct foreign control channels. The combination of government service and SOE appointment creates multiple avenues for foreign influence.',
        mitigationSuggestions: [
          'Limit foreign board representation to minority positions',
          'Implement security agreements restricting access to sensitive information',
          'Require U.S. citizen chairman for companies with dual-use technology',
          'Establish independent board committees for critical decisions'
        ],
        threatLevel: 'HIGH',
        confidence: 'HIGH',
        entityDetails: {
          fullName: 'Li Xiaoping',
          nationality: 'Chinese',
          title: 'Chairman of the Board',
          appointedBy: 'Shenyang Industrial Holdings',
          background: 'Former Deputy Director, Shenyang Municipal Government',
          education: 'Beijing University (Economics), CCP Party School',
          tenure: '3 years'
        }
      },
      'wei-chen': {
        name: 'Wei Chen',
        risk: 'MEDIUM',
        category: 'Key Personnel Foreign Ties',
        aiSummary: 'Dual citizen CTO with Chinese government research background - technology access concerns',
        quickFacts: [
          'Chief Technology Officer',
          'Dual US/Chinese citizenship',
          'Former Beijing Advanced Technology Institute',
          'Holds US Secret clearance'
        ],
        detailedFindings: [
          'Dual citizen (US/China) serving as Chief Technology Officer with full technology access',
          'Former Senior Researcher at Beijing Advanced Technology Institute (government-affiliated)',
          'Direct access to company\'s dual-use technology and intellectual property development',
          'Key decision-maker for technical strategy, product development, and research direction',
          'Published research with Chinese government co-authors in sensitive technology areas'
        ],
        evidence: 'Key_Personnel.txt - "Wei Chen, Dual Citizen (US, China), Former Employee of Beijing Advanced Technology Institute"',
        concernArea: 'Key Personnel Foreign Ties',
        aiExplanation: 'While dual citizenship isn\'t inherently problematic, the combination with Chinese government research institute background in a CTO role creates potential channels for technology transfer. The position provides access to critical IP and strategic technology decisions.',
        mitigationSuggestions: [
          'Enhanced background investigation and periodic reviews',
          'Technology access restrictions for sensitive projects',
          'Regular security clearance review and monitoring',
          'Consider alternative reporting structure for critical technology development'
        ],
        threatLevel: 'MEDIUM',
        confidence: 'MEDIUM',
        entityDetails: {
          fullName: 'Wei Chen',
          nationality: 'Dual (US/Chinese)',
          title: 'Chief Technology Officer',
          background: 'Former Senior Researcher, Beijing Advanced Technology Institute',
          education: 'Tsinghua University (PhD Computer Science), MIT (Post-doc)',
          clearance: 'Secret (US)',
          tenure: '4 years'
        }
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

        {/* Entity Details */}
        {nodeDetails.entityDetails && (
          <div>
            <h3 className="font-semibold text-white mb-3 flex items-center text-sm">
              <Building className="h-4 w-4 mr-2 text-cyan-400" />
              Entity Information
            </h3>
            <div className="space-y-2">
              {Object.entries(nodeDetails.entityDetails).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-slate-700/20 rounded text-sm">
                  <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span className="text-gray-300 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
