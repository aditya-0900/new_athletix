export interface PlayerStats {
  matches: number;
  runs: number;
  wickets: number;
  average: number;
  strikeRate: number;
  recentForm: number[];
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  category: string;
  logo: string;
}

export interface Sponsor {
  id: string;
  name: string;
  industry: string;
  logo: string;
  description: string;
}

export interface Recommendation {
  title: string;
  description: string;
  category: 'Technique' | 'Fitness' | 'Mental' | 'Nutrition';
}
