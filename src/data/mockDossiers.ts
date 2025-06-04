
export interface MockDossier {
  id: string;
  name: string;
  description: string;
  dataPoints: {
    ownership: string[];
    board: string[];
    personnel: string[];
    financing: string[];
    contracts: string[];
  };
}

export const mockDossiers: Record<string, MockDossier> = {
  'red-october': {
    id: 'red-october',
    name: 'Red October Innovations',
    description: 'U.S. tech company with promising dual-use technology',
    dataPoints: {
      ownership: [
        'Eastern Star Holdings (Country X): 60% ownership (Voting Shares)',
        'US Founders Collective: 20% ownership',
        'US Angel Investors Group: 20% ownership'
      ],
      board: [
        'Director 1: Appointee of Eastern Star Holdings, National of Country X',
        'Director 2: Appointee of Eastern Star Holdings, National of Country X', 
        'Director 3: Appointee of Eastern Star Holdings, National of Country X',
        'Director 4: US Founder, US Citizen',
        'Director 5: Angel Investor Rep, US Citizen'
      ],
      personnel: [
        'CEO: John Doe, US Citizen',
        'CTO: Ivan Vorpatril, Dual Citizen (US, Country X), Former Employee of X State Innovations Lab (Country X)'
      ],
      financing: [
        'Loan: $10M from Global Horizon Bank (Country X Affiliated)',
        'Covenant: Global Horizon Bank holds board observer rights'
      ],
      contracts: [
        'Primary Revenue Source (70%): Licensing deal with TechForward Ltd. (Country X)'
      ]
    }
  },
  'liberty-defense': {
    id: 'liberty-defense',
    name: 'Liberty Defense Solutions',
    description: 'U.S. defense contractor with clean structure',
    dataPoints: {
      ownership: [
        'US Founders Group: 80% ownership (All US Citizens)',
        'US Venture Partners (Transparent US LPs): 20% ownership'
      ],
      board: [
        'Director 1: US Citizen, clean background',
        'Director 2: US Citizen, clean background',
        'Director 3: US Citizen, clean background',
        'Director 4: US Citizen, clean background',
        'Director 5: US Citizen, clean background'
      ],
      personnel: [
        'CEO: All US Citizens, clean background',
        'CTO: All US Citizens, clean background',
        'CFO: All US Citizens, clean background'
      ],
      financing: [
        'Primary Financing: US Domestic Bank Consortium. No foreign debt'
      ],
      contracts: [
        'Revenue Sources: 90% US DoD Contracts, 10% Sales to NATO allies'
      ]
    }
  }
};
