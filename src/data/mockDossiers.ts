
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
        'Shenyang Industrial Holdings (China): 60% ownership (Voting Shares)',
        'US Founders Collective: 20% ownership',
        'US Angel Investors Group: 20% ownership'
      ],
      board: [
        'Director 1: Li Xiaoping, Appointee of Shenyang Industrial Holdings, Chinese National',
        'Director 2: Wang Mingwei, Appointee of Shenyang Industrial Holdings, Chinese National', 
        'Director 3: Zhang Huawei, Appointee of Shenyang Industrial Holdings, Chinese National',
        'Director 4: John Smith, US Founder, US Citizen',
        'Director 5: Sarah Johnson, Angel Investor Rep, US Citizen'
      ],
      personnel: [
        'CEO: John Doe, US Citizen',
        'CTO: Wei Chen, Dual Citizen (US, China), Former Employee of Beijing Advanced Technology Institute'
      ],
      financing: [
        'Loan: $10M from Bank of China International',
        'Covenant: Bank of China International holds board observer rights'
      ],
      contracts: [
        'Primary Revenue Source (70%): Licensing deal with Shenzhen TechForward Ltd. (China)'
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
        'Director 1: Michael Thompson, US Citizen, clean background',
        'Director 2: Jennifer Davis, US Citizen, clean background',
        'Director 3: Robert Wilson, US Citizen, clean background',
        'Director 4: Lisa Anderson, US Citizen, clean background',
        'Director 5: David Miller, US Citizen, clean background'
      ],
      personnel: [
        'CEO: James Harrison, US Citizen, clean background',
        'CTO: Emily Rodriguez, US Citizen, clean background',
        'CFO: Thomas Brown, US Citizen, clean background'
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
