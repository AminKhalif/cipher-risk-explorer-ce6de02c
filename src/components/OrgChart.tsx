
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, DollarSign, AlertTriangle, Brain, Zap } from 'lucide-react';

interface OrgChartProps {
  dossierId: string;
  analysisData: any;
  onNodeSelect: (nodeId: string | null) => void;
  selectedNode: string | null;
}

const OrgChart: React.FC<OrgChartProps> = ({ dossierId, analysisData, onNodeSelect, selectedNode }) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const orgData = useMemo(() => {
    if (dossierId === 'red-october') {
      return {
        company: {
          id: 'company',
          name: 'Red October Innovations',
          type: 'company',
          risk: 'HIGH',
          details: 'U.S. tech company with dual-use technology',
          pulse: true
        },
        entities: [
          {
            id: 'eastern-star',
            name: 'Eastern Star Holdings',
            type: 'shareholder',
            risk: 'HIGH',
            ownership: '60%',
            country: 'Country X',
            details: 'Foreign entity with controlling stake',
            threat: 'CRITICAL'
          },
          {
            id: 'us-founders',
            name: 'US Founders Collective',
            type: 'shareholder', 
            risk: 'LOW',
            ownership: '20%',
            country: 'USA',
            details: 'Domestic founding group'
          },
          {
            id: 'us-angels',
            name: 'US Angel Investors',
            type: 'shareholder',
            risk: 'LOW', 
            ownership: '20%',
            country: 'USA',
            details: 'Domestic angel investor group'
          }
        ],
        board: [
          {
            id: 'director-1',
            name: 'Director 1',
            type: 'board',
            risk: 'HIGH',
            appointedBy: 'Eastern Star Holdings',
            nationality: 'Country X',
            details: 'Foreign-appointed board member',
            influence: 'MAJOR'
          },
          {
            id: 'director-2', 
            name: 'Director 2',
            type: 'board',
            risk: 'HIGH',
            appointedBy: 'Eastern Star Holdings',
            nationality: 'Country X',
            details: 'Foreign-appointed board member',
            influence: 'MAJOR'
          },
          {
            id: 'director-3',
            name: 'Director 3', 
            type: 'board',
            risk: 'HIGH',
            appointedBy: 'Eastern Star Holdings',
            nationality: 'Country X',
            details: 'Foreign-appointed board member',
            influence: 'MAJOR'
          },
          {
            id: 'director-4',
            name: 'Director 4',
            type: 'board',
            risk: 'LOW',
            appointedBy: 'US Founders',
            nationality: 'USA',
            details: 'US founder representative'
          },
          {
            id: 'director-5',
            name: 'Director 5',
            type: 'board', 
            risk: 'LOW',
            appointedBy: 'US Angels',
            nationality: 'USA',
            details: 'US investor representative'
          }
        ],
        executives: [
          {
            id: 'ceo',
            name: 'John Doe (CEO)',
            type: 'executive',
            risk: 'LOW',
            nationality: 'USA',
            details: 'US citizen chief executive'
          },
          {
            id: 'cto',
            name: 'Ivan Vorpatril (CTO)',
            type: 'executive', 
            risk: 'MEDIUM',
            nationality: 'USA/Country X',
            details: 'Dual citizen with foreign ties',
            concern: 'DUAL_CITIZENSHIP'
          }
        ]
      };
    } else {
      return {
        company: {
          id: 'company',
          name: 'Liberty Defense Solutions',
          type: 'company',
          risk: 'LOW',
          details: 'Clean U.S. defense contractor'
        },
        entities: [
          {
            id: 'us-founders-group',
            name: 'US Founders Group',
            type: 'shareholder',
            risk: 'LOW',
            ownership: '80%',
            country: 'USA', 
            details: 'Domestic founding group'
          },
          {
            id: 'us-venture',
            name: 'US Venture Partners',
            type: 'shareholder',
            risk: 'LOW',
            ownership: '20%',
            country: 'USA',
            details: 'Transparent US limited partners'
          }
        ],
        board: [
          {
            id: 'board-1',
            name: 'Board Member 1',
            type: 'board',
            risk: 'LOW',
            nationality: 'USA',
            details: 'US citizen with clean background'
          },
          {
            id: 'board-2',
            name: 'Board Member 2', 
            type: 'board',
            risk: 'LOW',
            nationality: 'USA',
            details: 'US citizen with clean background'
          },
          {
            id: 'board-3',
            name: 'Board Member 3',
            type: 'board',
            risk: 'LOW', 
            nationality: 'USA',
            details: 'US citizen with clean background'
          }
        ],
        executives: [
          {
            id: 'liberty-ceo',
            name: 'CEO',
            type: 'executive',
            risk: 'LOW',
            nationality: 'USA',
            details: 'US citizen executive'
          },
          {
            id: 'liberty-cto',
            name: 'CTO',
            type: 'executive',
            risk: 'LOW', 
            nationality: 'USA',
            details: 'US citizen executive'
          }
        ]
      };
    }
  }, [dossierId]);

  const getRiskGlow = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'shadow-red-500/50 shadow-2xl';
      case 'MEDIUM': return 'shadow-yellow-500/50 shadow-xl';
      case 'LOW': return 'shadow-green-500/30 shadow-lg';
      default: return 'shadow-gray-500/30 shadow-lg';
    }
  };

  const getRiskBorder = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'border-red-500 bg-gradient-to-br from-red-900/30 to-red-800/20';
      case 'MEDIUM': return 'border-yellow-500 bg-gradient-to-br from-yellow-900/30 to-yellow-800/20';
      case 'LOW': return 'border-green-500 bg-gradient-to-br from-green-900/30 to-green-800/20';
      default: return 'border-gray-500 bg-gradient-to-br from-gray-900/30 to-gray-800/20';
    }
  };

  const getRiskPulse = (risk: string, isPulsing?: boolean) => {
    if (!isPulsing) return '';
    switch (risk) {
      case 'HIGH': return 'animate-pulse';
      default: return '';
    }
  };

  const getConnectionLines = () => {
    const lines = [];
    
    // Ownership lines from shareholders to company
    orgData.entities.forEach((entity, index) => {
      if (entity.risk === 'HIGH') {
        lines.push(
          <div 
            key={`line-${entity.id}`}
            className="absolute bg-red-500 opacity-60 animate-pulse"
            style={{
              width: '3px',
              height: '60px',
              top: '200px',
              left: `${240 + index * 140}px`,
              transformOrigin: 'bottom',
              transform: 'rotate(-45deg)'
            }}
          />
        );
      }
    });

    return lines;
  };

  const NodeCard = ({ node, icon: Icon, size = 'normal' }: { node: any, icon: any, size?: 'normal' | 'large' }) => (
    <div 
      className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-110 ${
        getRiskBorder(node.risk)
      } ${getRiskGlow(node.risk)} ${getRiskPulse(node.risk, node.pulse)} ${
        selectedNode === node.id ? 'ring-4 ring-blue-400 scale-105' : ''
      } ${size === 'large' ? 'p-6' : 'p-4'} rounded-xl backdrop-blur-sm border-2`}
      onClick={() => onNodeSelect(selectedNode === node.id ? null : node.id)}
    >
      {/* Threat indicator for high-risk nodes */}
      {node.threat === 'CRITICAL' && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center animate-bounce">
          <AlertTriangle className="h-3 w-3 text-white" />
        </div>
      )}
      
      {/* AI analysis indicator */}
      {node.risk !== 'LOW' && (
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <Brain className="h-3 w-3 text-white" />
        </div>
      )}

      <div className="text-center space-y-3">
        <div className="relative">
          <Icon className={`mx-auto text-blue-400 ${size === 'large' ? 'h-8 w-8' : 'h-6 w-6'}`} />
          {node.influence === 'MAJOR' && (
            <Zap className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
          )}
        </div>
        
        <div>
          <h3 className={`font-semibold text-white ${size === 'large' ? 'text-lg' : 'text-sm'} mb-1`}>
            {node.name}
          </h3>
          
          {node.ownership && (
            <div className={`text-cyan-300 font-bold ${size === 'large' ? 'text-base' : 'text-xs'} mb-2`}>
              {node.ownership}
            </div>
          )}
          
          {node.nationality && (
            <p className={`text-gray-300 ${size === 'large' ? 'text-sm' : 'text-xs'} mb-2`}>
              {node.nationality}
            </p>
          )}
          
          <Badge 
            variant={node.risk === 'HIGH' ? 'destructive' : node.risk === 'LOW' ? 'default' : 'default'}
            className={`text-xs transition-all duration-300 ${
              node.risk === 'LOW' ? 'bg-green-600 hover:bg-green-700' : 
              node.risk === 'HIGH' ? 'bg-red-600 animate-pulse' : 'bg-yellow-600'
            }`}
          >
            {node.risk} RISK
          </Badge>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
    </div>
  );

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-blue-400" />
            Corporate Structure Analysis
          </span>
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-blue-400 animate-pulse" />
            <span className="text-sm text-gray-400">AI Powered</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 relative overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 opacity-30" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
        }} />

        {/* Connection lines */}
        <div className="absolute inset-0 pointer-events-none">
          {getConnectionLines()}
        </div>

        <div className="relative space-y-12">
          {/* Company Center - Larger and more prominent */}
          <div className="flex justify-center">
            <div className="relative">
              <NodeCard node={orgData.company} icon={Building} size="large" />
              
              {/* Animated threat waves for high-risk company */}
              {orgData.company.risk === 'HIGH' && (
                <>
                  <div className="absolute inset-0 border-2 border-red-500/50 rounded-xl animate-ping" />
                  <div className="absolute inset-0 border-2 border-red-500/30 rounded-xl animate-ping" style={{ animationDelay: '0.5s' }} />
                </>
              )}
            </div>
          </div>

          {/* Ownership Structure */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <DollarSign className="h-6 w-6 mr-3 text-cyan-400" />
              Ownership Structure
              <div className="ml-4 h-px bg-gradient-to-r from-cyan-400 to-transparent flex-1" />
            </h3>
            <div className="grid grid-cols-3 gap-8">
              {orgData.entities.map((entity, index) => (
                <div key={entity.id} className="relative">
                  <NodeCard node={entity} icon={Building} />
                  
                  {/* Ownership percentage connector */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      entity.risk === 'HIGH' ? 'bg-red-600 text-white animate-pulse' : 
                      'bg-blue-600 text-white'
                    }`}>
                      {entity.ownership}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Board of Directors */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Users className="h-6 w-6 mr-3 text-purple-400" />
              Board of Directors
              <div className="ml-4 h-px bg-gradient-to-r from-purple-400 to-transparent flex-1" />
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {orgData.board.map((member, index) => (
                <div key={member.id} className="relative">
                  <NodeCard node={member} icon={Users} />
                  
                  {/* Board seat indicator */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      member.risk === 'HIGH' ? 'bg-red-600 text-white' : 'bg-slate-600 text-white'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Personnel */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-3 text-orange-400" />
              Key Personnel
              <div className="ml-4 h-px bg-gradient-to-r from-orange-400 to-transparent flex-1" />
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {orgData.executives.map((exec) => (
                <div key={exec.id} className="relative">
                  <NodeCard node={exec} icon={Users} />
                  
                  {/* Special concern indicators */}
                  {exec.concern === 'DUAL_CITIZENSHIP' && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <Badge variant="outline" className="border-yellow-500 text-yellow-300 text-xs">
                        Dual Citizenship
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive guide */}
        <div className="mt-8 p-6 bg-gradient-to-r from-slate-700/40 to-slate-600/40 rounded-xl border border-slate-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Brain className="h-5 w-5 text-blue-400 animate-pulse" />
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">AI Analysis Complete:</span> Click any entity for detailed FOCI assessment
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-red-500"></div>
                <span className="text-red-400">CRITICAL</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-yellow-500"></div>
                <span className="text-yellow-400">MEDIUM</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span className="text-green-400">LOW</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrgChart;
