
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Building, Users, DollarSign } from 'lucide-react';

interface DossierSelectionProps {
  onSelectDossier: (dossierId: string) => void;
}

const DossierSelection: React.FC<DossierSelectionProps> = ({ onSelectDossier }) => {
  const dossiers = [
    {
      id: 'red-october',
      name: 'Red October Innovations',
      description: 'U.S. tech company with promising dual-use technology',
      riskLevel: 'HIGH',
      riskColor: 'red',
      highlights: [
        '60% foreign ownership (Country X)',
        'Majority foreign board control',
        'Foreign financial dependencies',
        'Key personnel foreign ties'
      ],
      metrics: {
        ownership: '60% Foreign',
        board: '3/5 Foreign',
        revenue: '70% Foreign-dependent'
      }
    },
    {
      id: 'liberty-defense',
      name: 'Liberty Defense Solutions',
      description: 'U.S. defense contractor with clean structure',
      riskLevel: 'LOW',
      riskColor: 'green',
      highlights: [
        '100% domestic ownership',
        'All-American board composition',
        'Transparent financing structure',
        'Clean personnel backgrounds'
      ],
      metrics: {
        ownership: '100% Domestic',
        board: '5/5 US Citizens',
        revenue: '90% DoD Contracts'
      }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-white">Select Corporate Dossier</h1>
        <p className="text-xl text-gray-300">
          Choose a company profile for CIPHER AI analysis
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {dossiers.map((dossier) => (
          <Card key={dossier.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Building className="h-8 w-8 text-blue-400" />
                <Badge 
                  variant={dossier.riskColor === 'red' ? 'destructive' : 'default'}
                  className={dossier.riskColor === 'green' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {dossier.riskLevel} RISK
                </Badge>
              </div>
              <CardTitle className="text-2xl text-white">{dossier.name}</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                {dossier.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-400" />
                    Key Risk Indicators
                  </h4>
                  <ul className="space-y-1">
                    {dossier.highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-2 ${
                          dossier.riskColor === 'red' ? 'bg-red-400' : 'bg-green-400'
                        }`} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-slate-700 pt-4">
                  <h4 className="font-semibold text-white flex items-center mb-3">
                    <DollarSign className="h-4 w-4 mr-2 text-blue-400" />
                    Quick Metrics
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ownership:</span>
                      <span className="text-white">{dossier.metrics.ownership}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Board Control:</span>
                      <span className="text-white">{dossier.metrics.board}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="text-white">{dossier.metrics.revenue}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => onSelectDossier(dossier.id)}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 transition-all duration-300"
              >
                Analyze with CIPHER AI
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DossierSelection;
