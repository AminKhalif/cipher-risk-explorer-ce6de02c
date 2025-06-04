
import React, { useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, DollarSign, AlertTriangle } from 'lucide-react';

interface OrgChartProps {
  dossierId: string;
  analysisData: any;
  onNodeSelect: (nodeId: string | null) => void;
  selectedNode: string | null;
}

const OrgChart: React.FC<OrgChartProps> = ({ dossierId, analysisData, onNodeSelect, selectedNode }) => {
  const orgData = useMemo(() => {
    if (dossierId === 'red-october') {
      return {
        company: {
          id: 'company',
          name: 'Red October Innovations',
          type: 'company',
          risk: 'HIGH',
          details: 'U.S. tech company with dual-use technology'
        },
        entities: [
          {
            id: 'eastern-star',
            name: 'Eastern Star Holdings',
            type: 'shareholder',
            risk: 'HIGH',
            ownership: '60%',
            country: 'Country X',
            details: 'Foreign entity with controlling stake'
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
            details: 'Foreign-appointed board member'
          },
          {
            id: 'director-2', 
            name: 'Director 2',
            type: 'board',
            risk: 'HIGH',
            appointedBy: 'Eastern Star Holdings',
            nationality: 'Country X',
            details: 'Foreign-appointed board member'
          },
          {
            id: 'director-3',
            name: 'Director 3', 
            type: 'board',
            risk: 'HIGH',
            appointedBy: 'Eastern Star Holdings',
            nationality: 'Country X',
            details: 'Foreign-appointed board member'
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
            details: 'Dual citizen with foreign ties'
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'border-red-500 bg-red-900/20';
      case 'MEDIUM': return 'border-yellow-500 bg-yellow-900/20';
      case 'LOW': return 'border-green-500 bg-green-900/20';
      default: return 'border-gray-500 bg-gray-900/20';
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'destructive';
      case 'MEDIUM': return 'default';
      case 'LOW': return 'default';
      default: return 'default';
    }
  };

  const NodeCard = ({ node, icon: Icon }: { node: any, icon: any }) => (
    <Card 
      className={`cursor-pointer transition-all duration-200 transform hover:scale-105 ${
        getRiskColor(node.risk)
      } ${selectedNode === node.id ? 'ring-2 ring-blue-400' : ''}`}
      onClick={() => onNodeSelect(selectedNode === node.id ? null : node.id)}
    >
      <CardContent className="p-4 text-center">
        <Icon className="h-6 w-6 mx-auto mb-2 text-blue-400" />
        <h3 className="font-semibold text-white text-sm mb-1">{node.name}</h3>
        {node.ownership && (
          <p className="text-xs text-gray-300 mb-2">{node.ownership}</p>
        )}
        {node.nationality && (
          <p className="text-xs text-gray-400 mb-2">{node.nationality}</p>
        )}
        <Badge 
          variant={getRiskBadgeColor(node.risk)}
          className={`text-xs ${node.risk === 'LOW' ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          {node.risk}
        </Badge>
      </CardContent>
    </Card>
  );

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Building className="h-5 w-5 mr-2 text-blue-400" />
          Corporate Structure Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
          {/* Company Center */}
          <div className="flex justify-center">
            <NodeCard node={orgData.company} icon={Building} />
          </div>

          {/* Shareholders */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-blue-400" />
              Ownership Structure
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {orgData.entities.map((entity) => (
                <NodeCard key={entity.id} node={entity} icon={Building} />
              ))}
            </div>
          </div>

          {/* Board of Directors */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-400" />
              Board of Directors
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {orgData.board.map((member) => (
                <NodeCard key={member.id} node={member} icon={Users} />
              ))}
            </div>
          </div>

          {/* Key Executives */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-blue-400" />
              Key Personnel
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {orgData.executives.map((exec) => (
                <NodeCard key={exec.id} node={exec} icon={Users} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
          <p className="text-sm text-gray-300 text-center">
            Click on any entity to view detailed FOCI analysis • Color coding: 
            <span className="text-red-400 ml-2">HIGH</span>
            <span className="text-yellow-400 ml-2">MEDIUM</span> 
            <span className="text-green-400 ml-2">LOW</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrgChart;
