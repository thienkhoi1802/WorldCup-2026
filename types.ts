
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  time: string;
  category: string; // New: Category for visual tags
  isMain?: boolean;
}

export interface Match {
  id: string;
  homeTeam: string;
  homeFlag: string;
  awayTeam: string;
  awayFlag: string;
  time: string;
  date: string;
  stadium?: string;
  isQualifier?: boolean; 
  round?: string;
  status?: 'finished' | 'upcoming' | 'live'; // New status for tabs
  score?: string; // For finished matches
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
}

export interface Team {
  id: string;
  name: string;
  flag: string;
  region?: string; // AFC, UEFA, CONCACAF, CONMEBOL, CAF, OFC
  isQualified?: boolean; // New: Status for WC qualification
  ranking?: number; // FIFA Ranking
  playerCount?: number; // Registered players
  group?: string; // e.g. "Group A"
  participations?: number; // Number of WC participations
  displayColor?: string; // Tailwind bg class for the card background
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  capacity: string;
  image: string;
}

export enum AccessType {
  HOME = 'Trang chủ',
  SCHEDULE = 'Lịch thi đấu',
  STANDINGS = 'Bảng xếp hạng',
  TEAMS = 'Đội tuyển',
  NEWS = 'Tin tức',
  VIDEO = 'Video',
  GALLERY = 'Hình ảnh',
  STADIUMS = 'Sân vận động',
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface StandingRow {
  rank: number;
  team: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number; // Goals For
  ga: number; // Goals Against
  gd: string; // Goal Difference
  points: number;
  form: string[]; // ['W', 'D', 'L', 'W', 'W']
}
