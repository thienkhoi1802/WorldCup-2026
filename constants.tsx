
import { NewsItem, Match, VideoItem, Team, AccessType, PollOption, StandingRow, Stadium } from './types';
import { Globe, MapPin, Users, Zap, Home, Calendar, FileText, Video, Image, Trophy } from 'lucide-react';
import React from 'react';

// Navigation Items - Focus on Pre-Tournament
export const QUICK_ACCESS_ITEMS = [
  { label: AccessType.HOME, icon: <Home className="w-4 h-4" /> },
  { label: AccessType.SCHEDULE, icon: <Calendar className="w-4 h-4" /> },
  { label: AccessType.STANDINGS, icon: <Trophy className="w-4 h-4" /> },
  { label: AccessType.TEAMS, icon: <Users className="w-4 h-4" /> },
  { label: AccessType.NEWS, icon: <FileText className="w-4 h-4" /> },
  { label: AccessType.VIDEO, icon: <Video className="w-4 h-4" /> },
  { label: AccessType.GALLERY, icon: <Image className="w-4 h-4" /> },
  { label: AccessType.STADIUMS, icon: <MapPin className="w-4 h-4" /> },
];

// DATA SOURCES
const TITLES_AND_CATS = [
    { t: "Vòng loại World Cup 2026 khu vực Châu Á: Việt Nam quyết đấu Indonesia", c: "Tiêu điểm" },
    { t: "FIFA chốt phương án 12 bảng đấu: Cuộc đua thể lực khốc liệt", c: "Tin nóng" },
    { t: "Chính thức: 16 sân vận động tại Bắc Mỹ đã sẵn sàng", c: "Hậu trường" },
    { t: "FIFA công bố giá vé đợt 1: Người hâm mộ than trời", c: "Vé & Du lịch" },
    { t: "Phân tích: Brazil khủng hoảng, Uruguay trỗi dậy", c: "Góc nhìn" },
    { t: "Đội tuyển Anh công bố mẫu áo đấu mới thập niên 90", c: "Bên lề" },
    { t: "HLV Troussier: 'Cơ hội chia đều cho các đội ĐNA'", c: "Phỏng vấn" },
    { t: "Sân Azteca bắt đầu tu sửa trị giá 150 triệu USD", c: "Sân bãi" },
    { t: "Mbappe: 'Tôi muốn giành quả bóng vàng trước 2026'", c: "Nhân vật" },
    { t: "Công nghệ bắt việt vị bán tự động sẽ áp dụng rộng rãi", c: "Công nghệ" },
    { t: "BXH FIFA: Việt Nam tăng 2 bậc, Nhật Bản số 1", c: "BXH" },
    { t: "Người hâm mộ Mỹ Latinh lên kế hoạch tiết kiệm tiền", c: "CĐV" },
    { t: "Ronaldo đặt mục tiêu dự World Cup tuổi 41", c: "Nhân vật" },
    { t: "Canada đối mặt khó khăn vì thiếu kinh phí", c: "Tài chính" },
    { t: "Top 5 tài năng trẻ hứa hẹn bùng nổ", c: "Sao mai" }
];

export const NEWS_DATA: NewsItem[] = TITLES_AND_CATS.map((item, index) => ({
  id: (index + 1).toString(),
  title: item.t,
  excerpt: index === 0 
    ? 'Trận đấu then chốt quyết định tấm vé đi tiếp vào vòng loại thứ 3. HLV và các cầu thủ đang chịu áp lực cực lớn từ người hâm mộ.'
    : 'Cập nhật những thông tin mới nhất về hành trình đến Bắc Mỹ 2026.',
  image: `https://picsum.photos/600/400?random=${index + 50}`,
  time: `${Math.floor(Math.random() * 24) + 1} giờ trước`,
  category: item.c,
  isMain: index === 0,
}));

// Generic Shield Icon for multi-team slots or TBD matches
const SHIELD_ICON = 'https://cdn-icons-png.flaticon.com/512/10602/10602939.png'; 

// HELPER: Map flags (Simplified for mock data consistency)
const FLAG_MAP: Record<string, string> = {
    'Mexico': 'https://flagcdn.com/w40/mx.png',
    'South Africa': 'https://flagcdn.com/w40/za.png',
    'Korea Republic': 'https://flagcdn.com/w40/kr.png',
    'Canada': 'https://flagcdn.com/w40/ca.png',
    'USA': 'https://flagcdn.com/w40/us.png',
    'Paraguay': 'https://flagcdn.com/w40/py.png',
    'Qatar': 'https://flagcdn.com/w40/qa.png',
    'Switzerland': 'https://flagcdn.com/w40/ch.png',
    'Brazil': 'https://flagcdn.com/w40/br.png',
    'Morocco': 'https://flagcdn.com/w40/ma.png',
    'Haiti': 'https://flagcdn.com/w40/ht.png',
    'Scotland': 'https://flagcdn.com/w40/gb-sct.png',
    'Australia': 'https://flagcdn.com/w40/au.png',
    'Germany': 'https://flagcdn.com/w40/de.png',
    'Curaçao': 'https://flagcdn.com/w40/cw.png',
    'Netherlands': 'https://flagcdn.com/w40/nl.png',
    'Japan': 'https://flagcdn.com/w40/jp.png',
    "Côte d'Ivoire": 'https://flagcdn.com/w40/ci.png',
    'Ecuador': 'https://flagcdn.com/w40/ec.png',
    'Tunisia': 'https://flagcdn.com/w40/tn.png',
    'Spain': 'https://flagcdn.com/w40/es.png',
    'Cabo Verde': 'https://flagcdn.com/w40/cv.png',
    'Belgium': 'https://flagcdn.com/w40/be.png',
    'Egypt': 'https://flagcdn.com/w40/eg.png',
    'Saudi Arabia': 'https://flagcdn.com/w40/sa.png',
    'Uruguay': 'https://flagcdn.com/w40/uy.png',
    'IR Iran': 'https://flagcdn.com/w40/ir.png',
    'New Zealand': 'https://flagcdn.com/w40/nz.png',
    'France': 'https://flagcdn.com/w40/fr.png',
    'Senegal': 'https://flagcdn.com/w40/sn.png',
    'Norway': 'https://flagcdn.com/w40/no.png',
    'Argentina': 'https://flagcdn.com/w40/ar.png',
    'Algeria': 'https://flagcdn.com/w40/dz.png',
    'Austria': 'https://flagcdn.com/w40/at.png',
    'Jordan': 'https://flagcdn.com/w40/jo.png',
    'Portugal': 'https://flagcdn.com/w40/pt.png',
    'England': 'https://flagcdn.com/w40/gb-eng.png',
    'Croatia': 'https://flagcdn.com/w40/hr.png',
    'Ghana': 'https://flagcdn.com/w40/gh.png',
    'Panama': 'https://flagcdn.com/w40/pa.png',
    'Uzbekistan': 'https://flagcdn.com/w40/uz.png',
    'Colombia': 'https://flagcdn.com/w40/co.png'
};

const getFlag = (teamName: string) => FLAG_MAP[teamName] || SHIELD_ICON;

export const UPCOMING_MATCHES: Match[] = [
  // --- GROUP STAGE ---
  { id: 'm1', date: '12/06', time: '02:00', homeTeam: 'Mexico', awayTeam: 'South Africa', homeFlag: getFlag('Mexico'), awayFlag: getFlag('South Africa'), round: 'Bảng A', stadium: 'Mexico City Stadium', status: 'upcoming' },
  { id: 'm2', date: '12/06', time: '09:00', homeTeam: 'Korea Republic', awayTeam: 'DEN/MKD/CZE/IRL', homeFlag: getFlag('Korea Republic'), awayFlag: SHIELD_ICON, round: 'Bảng A', stadium: 'Guadalajara Stadium', status: 'upcoming' },
  
  { id: 'm3', date: '13/06', time: '02:00', homeTeam: 'Canada', awayTeam: 'ITA/NIR/WAL/BIH', homeFlag: getFlag('Canada'), awayFlag: SHIELD_ICON, round: 'Bảng B', stadium: 'Toronto Stadium', status: 'upcoming' },
  { id: 'm4', date: '13/06', time: '08:00', homeTeam: 'USA', awayTeam: 'Paraguay', homeFlag: getFlag('USA'), awayFlag: getFlag('Paraguay'), round: 'Bảng D', stadium: 'Los Angeles Stadium', status: 'upcoming' },

  { id: 'm5', date: '14/06', time: '02:00', homeTeam: 'Qatar', awayTeam: 'Switzerland', homeFlag: getFlag('Qatar'), awayFlag: getFlag('Switzerland'), round: 'Bảng B', stadium: 'San Francisco Bay Area', status: 'upcoming' },
  { id: 'm6', date: '14/06', time: '05:00', homeTeam: 'Brazil', awayTeam: 'Morocco', homeFlag: getFlag('Brazil'), awayFlag: getFlag('Morocco'), round: 'Bảng C', stadium: 'NY/NJ Stadium', status: 'upcoming' },
  { id: 'm7', date: '14/06', time: '08:00', homeTeam: 'Haiti', awayTeam: 'Scotland', homeFlag: getFlag('Haiti'), awayFlag: getFlag('Scotland'), round: 'Bảng C', stadium: 'Boston Stadium', status: 'upcoming' },
  { id: 'm8', date: '14/06', time: '11:00', homeTeam: 'Australia', awayTeam: 'TUR/ROU/SVK/KOS', homeFlag: getFlag('Australia'), awayFlag: SHIELD_ICON, round: 'Bảng D', stadium: 'BC Place Vancouver', status: 'upcoming' },

  { id: 'm9', date: '15/06', time: '00:00', homeTeam: 'Germany', awayTeam: 'Curaçao', homeFlag: getFlag('Germany'), awayFlag: getFlag('Curaçao'), round: 'Bảng E', stadium: 'Houston Stadium', status: 'upcoming' },
  { id: 'm10', date: '15/06', time: '03:00', homeTeam: 'Netherlands', awayTeam: 'Japan', homeFlag: getFlag('Netherlands'), awayFlag: getFlag('Japan'), round: 'Bảng F', stadium: 'Dallas Stadium', status: 'upcoming' },
  { id: 'm11', date: '15/06', time: '06:00', homeTeam: "Côte d'Ivoire", awayTeam: 'Ecuador', homeFlag: getFlag("Côte d'Ivoire"), awayFlag: getFlag('Ecuador'), round: 'Bảng E', stadium: 'Philadelphia Stadium', status: 'upcoming' },
  { id: 'm12', date: '15/06', time: '09:00', homeTeam: 'UKR/SWE/POL/ALB', awayTeam: 'Tunisia', homeFlag: SHIELD_ICON, awayFlag: getFlag('Tunisia'), round: 'Bảng F', stadium: 'Monterrey Stadium', status: 'upcoming' },
  { id: 'm13', date: '15/06', time: '23:00', homeTeam: 'Spain', awayTeam: 'Cabo Verde', homeFlag: getFlag('Spain'), awayFlag: getFlag('Cabo Verde'), round: 'Bảng H', stadium: 'Atlanta Stadium', status: 'upcoming' },

  { id: 'm14', date: '16/06', time: '02:00', homeTeam: 'Belgium', awayTeam: 'Egypt', homeFlag: getFlag('Belgium'), awayFlag: getFlag('Egypt'), round: 'Bảng G', stadium: 'Seattle Stadium', status: 'upcoming' },
  { id: 'm15', date: '16/06', time: '05:00', homeTeam: 'Saudi Arabia', awayTeam: 'Uruguay', homeFlag: getFlag('Saudi Arabia'), awayFlag: getFlag('Uruguay'), round: 'Bảng H', stadium: 'Miami Stadium', status: 'upcoming' },
  { id: 'm16', date: '16/06', time: '08:00', homeTeam: 'IR Iran', awayTeam: 'New Zealand', homeFlag: getFlag('IR Iran'), awayFlag: getFlag('New Zealand'), round: 'Bảng G', stadium: 'Los Angeles Stadium', status: 'upcoming' },

  { id: 'm17', date: '17/06', time: '02:00', homeTeam: 'France', awayTeam: 'Senegal', homeFlag: getFlag('France'), awayFlag: getFlag('Senegal'), round: 'Bảng I', stadium: 'NY/NJ Stadium', status: 'upcoming' },
  { id: 'm18', date: '17/06', time: '05:00', homeTeam: 'BOL/SUR/IRQ', awayTeam: 'Norway', homeFlag: SHIELD_ICON, awayFlag: getFlag('Norway'), round: 'Bảng I', stadium: 'Boston Stadium', status: 'upcoming' },
  { id: 'm19', date: '17/06', time: '08:00', homeTeam: 'Argentina', awayTeam: 'Algeria', homeFlag: getFlag('Argentina'), awayFlag: getFlag('Algeria'), round: 'Bảng J', stadium: 'Kansas City Stadium', status: 'upcoming' },
  { id: 'm20', date: '17/06', time: '11:00', homeTeam: 'Austria', awayTeam: 'Jordan', homeFlag: getFlag('Austria'), awayFlag: getFlag('Jordan'), round: 'Bảng J', stadium: 'San Francisco Bay Area', status: 'upcoming' },

  { id: 'm21', date: '18/06', time: '00:00', homeTeam: 'Portugal', awayTeam: 'NCL/JAM/COD', homeFlag: getFlag('Portugal'), awayFlag: SHIELD_ICON, round: 'Bảng K', stadium: 'Houston Stadium', status: 'upcoming' },
  { id: 'm22', date: '18/06', time: '03:00', homeTeam: 'England', awayTeam: 'Croatia', homeFlag: getFlag('England'), awayFlag: getFlag('Croatia'), round: 'Bảng L', stadium: 'Dallas Stadium', status: 'upcoming' },
  { id: 'm23', date: '18/06', time: '06:00', homeTeam: 'Ghana', awayTeam: 'Panama', homeFlag: getFlag('Ghana'), awayFlag: getFlag('Panama'), round: 'Bảng L', stadium: 'Toronto Stadium', status: 'upcoming' },
  { id: 'm24', date: '18/06', time: '09:00', homeTeam: 'Uzbekistan', awayTeam: 'Colombia', homeFlag: getFlag('Uzbekistan'), awayFlag: getFlag('Colombia'), round: 'Bảng K', stadium: 'Mexico City Stadium', status: 'upcoming' },
  { id: 'm25', date: '18/06', time: '23:00', homeTeam: 'DEN/MKD/CZE/IRL', awayTeam: 'South Africa', homeFlag: SHIELD_ICON, awayFlag: getFlag('South Africa'), round: 'Bảng A', stadium: 'Atlanta Stadium', status: 'upcoming' },

  // ... (Skipping some mid-group matches for brevity in code, focusing on flow to knockouts)
  // Representative matches for subsequent dates
  { id: 'm30', date: '19/06', time: '08:00', homeTeam: 'Mexico', awayTeam: 'Korea Republic', homeFlag: getFlag('Mexico'), awayFlag: getFlag('Korea Republic'), round: 'Bảng A', stadium: 'Guadalajara Stadium', status: 'upcoming' },
  { id: 'm40', date: '25/06', time: '05:00', homeTeam: 'Morocco', awayTeam: 'Haiti', homeFlag: getFlag('Morocco'), awayFlag: getFlag('Haiti'), round: 'Bảng C', stadium: 'Atlanta Stadium', status: 'upcoming' },
  { id: 'm50', date: '27/06', time: '07:00', homeTeam: 'Uruguay', awayTeam: 'Spain', homeFlag: getFlag('Uruguay'), awayFlag: getFlag('Spain'), round: 'Bảng H', stadium: 'Guadalajara Stadium', status: 'upcoming' },

  // --- ROUND OF 32 ---
  { id: 'r32_1', date: '29/06', time: '02:00', homeTeam: '2A', awayTeam: '2B', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/32', stadium: 'Los Angeles Stadium', status: 'upcoming' },
  { id: 'r32_2', date: '30/06', time: '00:00', homeTeam: '1C', awayTeam: '2F', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/32', stadium: 'Houston Stadium', status: 'upcoming' },
  { id: 'r32_3', date: '01/07', time: '00:00', homeTeam: '2E', awayTeam: '2I', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/32', stadium: 'Dallas Stadium', status: 'upcoming' },
  { id: 'r32_4', date: '02/07', time: '03:00', homeTeam: '1G', awayTeam: '3AEHIJ', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/32', stadium: 'Seattle Stadium', status: 'upcoming' },
  { id: 'r32_5', date: '03/07', time: '02:00', homeTeam: '1H', awayTeam: '2J', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/32', stadium: 'Los Angeles Stadium', status: 'upcoming' },
  { id: 'r32_6', date: '04/07', time: '08:30', homeTeam: '1K', awayTeam: '3DEIJL', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/32', stadium: 'Kansas City Stadium', status: 'upcoming' },

  // --- ROUND OF 16 ---
  { id: 'r16_1', date: '05/07', time: '00:00', homeTeam: 'W73', awayTeam: 'W75', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/16', stadium: 'Houston Stadium', status: 'upcoming' },
  { id: 'r16_2', date: '06/07', time: '03:00', homeTeam: 'W76', awayTeam: 'W78', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/16', stadium: 'NY/NJ Stadium', status: 'upcoming' },
  { id: 'r16_3', date: '07/07', time: '02:00', homeTeam: 'W83', awayTeam: 'W84', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/16', stadium: 'Dallas Stadium', status: 'upcoming' },
  { id: 'r16_4', date: '08/07', time: '03:00', homeTeam: 'W85', awayTeam: 'W87', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/16', stadium: 'BC Place Vancouver', status: 'upcoming' },

  // --- QUARTER-FINALS ---
  { id: 'qf_1', date: '10/07', time: '03:00', homeTeam: 'W89', awayTeam: 'W90', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Tứ kết', stadium: 'Boston Stadium', status: 'upcoming' },
  { id: 'qf_2', date: '11/07', time: '02:00', homeTeam: 'W93', awayTeam: 'W94', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Tứ kết', stadium: 'Los Angeles Stadium', status: 'upcoming' },
  { id: 'qf_3', date: '12/07', time: '04:00', homeTeam: 'W91', awayTeam: 'W92', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Tứ kết', stadium: 'Miami Stadium', status: 'upcoming' },
  { id: 'qf_4', date: '12/07', time: '08:00', homeTeam: 'W95', awayTeam: 'W96', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Tứ kết', stadium: 'Kansas City Stadium', status: 'upcoming' },

  // --- SEMI-FINALS ---
  { id: 'sf_1', date: '15/07', time: '02:00', homeTeam: 'W97', awayTeam: 'W98', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Bán kết', stadium: 'Dallas Stadium', status: 'upcoming' },
  { id: 'sf_2', date: '16/07', time: '02:00', homeTeam: 'W99', awayTeam: 'W100', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Bán kết', stadium: 'Atlanta Stadium', status: 'upcoming' },

  // --- 3RD PLACE ---
  { id: '3rd', date: '19/07', time: '04:00', homeTeam: 'RU101', awayTeam: 'RU102', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Tranh hạng 3', stadium: 'Miami Stadium', status: 'upcoming' },

  // --- FINAL ---
  { id: 'final', date: '20/07', time: '02:00', homeTeam: 'W101', awayTeam: 'W102', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Chung kết', stadium: 'NY/NJ Stadium', status: 'upcoming' },
];

export const MATCH_STATS_MOCK = {
  possession: [45, 55],
  shots: [12, 15],
  shotsOnTarget: [4, 6],
  corners: [3, 8],
  fouls: [14, 10],
  passes: [350, 420],
};

export const MATCH_EVENTS_MOCK = [
  { time: "12'", type: "goal", team: "home", player: "Cầu thủ A" },
  { time: "34'", type: "card-yellow", team: "away", player: "Cầu thủ B" },
  { time: "45+2'", type: "goal", team: "away", player: "Cầu thủ C" },
  { time: "67'", type: "sub", team: "home", player: "Cầu thủ D (in)" },
  { time: "88'", type: "card-red", team: "away", player: "Cầu thủ E" },
];

export const MATCH_LINEUPS_MOCK = {
  home: ["GK", "DF 1", "DF 2", "DF 3", "DF 4", "MF 1", "MF 2", "MF 3", "FW 1", "FW 2", "FW 3"],
  away: ["GK", "DF 1", "DF 2", "DF 3", "DF 4", "MF 1", "MF 2", "MF 3", "FW 1", "FW 2", "FW 3"]
};

// 12 GROUPS MOCK DATA (48 TEAMS) - UPDATED BASED ON USER SCREENSHOTS
export const WC_GROUPS_MOCK: Record<string, StandingRow[]> = {
    'A': [
        { rank: 1, team: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Nam Phi', flag: 'https://flagcdn.com/w40/za.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Cộng hòa Hàn Quốc', flag: 'https://flagcdn.com/w40/kr.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'ĐAN MẠCH/MKD/CZE/IRL', flag: SHIELD_ICON, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ],
    'B': [
        { rank: 1, team: 'Canada', flag: 'https://flagcdn.com/w40/ca.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Qatar', flag: 'https://flagcdn.com/w40/qa.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Thụy Sĩ', flag: 'https://flagcdn.com/w40/ch.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'ITA/NIR/WAL/BIH', flag: SHIELD_ICON, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ],
    'C': [
        { rank: 1, team: 'Brazil', flag: 'https://flagcdn.com/w40/br.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Ma-rốc', flag: 'https://flagcdn.com/w40/ma.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Haiti', flag: 'https://flagcdn.com/w40/ht.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'Scotland', flag: 'https://flagcdn.com/w40/gb-sct.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ],
    'D': [
        { rank: 1, team: 'Hoa Kỳ', flag: 'https://flagcdn.com/w40/us.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Paraguay', flag: 'https://flagcdn.com/w40/py.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Úc', flag: 'https://flagcdn.com/w40/au.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'TUR/ROU/SVK/KOS', flag: SHIELD_ICON, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ],
    'E': [
        { rank: 1, team: 'Đức', flag: 'https://flagcdn.com/w40/de.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Curaçao', flag: 'https://flagcdn.com/w40/cw.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Bờ Biển Ngà', flag: 'https://flagcdn.com/w40/ci.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'Ecuador', flag: 'https://flagcdn.com/w40/ec.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ],
    'F': [
        { rank: 1, team: 'Hà Lan', flag: 'https://flagcdn.com/w40/nl.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Nhật Bản', flag: 'https://flagcdn.com/w40/jp.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Tunisia', flag: 'https://flagcdn.com/w40/tn.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'UKR/SWE/POL/ALB', flag: SHIELD_ICON, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ],
    'G': [
        { rank: 1, team: 'Bỉ', flag: 'https://flagcdn.com/w40/be.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Ai Cập', flag: 'https://flagcdn.com/w40/eg.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Iran', flag: 'https://flagcdn.com/w40/ir.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'New Zealand', flag: 'https://flagcdn.com/w40/nz.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ],
    'H': [
        { rank: 1, team: 'Tây ban nha', flag: 'https://flagcdn.com/w40/es.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Cabo Verde', flag: 'https://flagcdn.com/w40/cv.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Ả Rập Xê Út', flag: 'https://flagcdn.com/w40/sa.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'Uruguay', flag: 'https://flagcdn.com/w40/uy.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ],
    'I': [
        { rank: 1, team: 'BOL/SUR/IRQ', flag: SHIELD_ICON, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Pháp', flag: 'https://flagcdn.com/w40/fr.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Senegal', flag: 'https://flagcdn.com/w40/sn.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'Na Uy', flag: 'https://flagcdn.com/w40/no.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ],
    'J': [
        { rank: 1, team: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Áo', flag: 'https://flagcdn.com/w40/at.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'Jordan', flag: 'https://flagcdn.com/w40/jo.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ],
    'K': [
        { rank: 1, team: 'NCL/JAM/COD', flag: SHIELD_ICON, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Bồ Đào Nha', flag: 'https://flagcdn.com/w40/pt.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Uzbekistan', flag: 'https://flagcdn.com/w40/uz.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'Colombia', flag: 'https://flagcdn.com/w40/co.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ],
    'L': [
        { rank: 1, team: 'nước Anh', flag: 'https://flagcdn.com/w40/gb-eng.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 2, team: 'Croatia', flag: 'https://flagcdn.com/w40/hr.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 3, team: 'Ghana', flag: 'https://flagcdn.com/w40/gh.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] },
        { rank: 4, team: 'Panama', flag: 'https://flagcdn.com/w40/pa.png', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-'] }
    ]
};

export const VIDEO_HIGHLIGHTS: VideoItem[] = [
  { id: 'v1', title: 'Highlight: Việt Nam 2-0 Philippines | Mỹ Đình nổ tung', thumbnail: 'https://picsum.photos/300/500?random=20', duration: '10:45' },
  { id: 'v2', title: 'Siêu phẩm đá phạt của Messi vào lưới Ecuador', thumbnail: 'https://picsum.photos/300/500?random=21', duration: '0:50' },
  { id: 'v3', title: 'Review SVĐ MetLife: Nơi tổ chức chung kết 2026', thumbnail: 'https://picsum.photos/300/500?random=22', duration: '5:15' },
  { id: 'v4', title: 'Phỏng vấn HLV Kim Sang Sik trước trận quyết đấu', thumbnail: 'https://picsum.photos/300/500?random=23', duration: '3:00' },
  { id: 'v5', title: 'Top 10 bàn thắng đẹp nhất vòng loại tháng 3', thumbnail: 'https://picsum.photos/300/500?random=24', duration: '4:20' },
];

export const POPULAR_TEAMS: Team[] = [
  { id: 'vn', name: 'Việt Nam', flag: 'https://flagcdn.com/w40/vn.png', region: 'AFC', isQualified: false }, // Not qualified yet based on prompt
  { id: 'br', name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png', region: 'CONMEBOL', isQualified: true },
  { id: 'ar', name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png', region: 'CONMEBOL', isQualified: true },
  { id: 'gb-eng', name: 'Anh', flag: 'https://flagcdn.com/w40/gb-eng.png', region: 'UEFA', isQualified: true },
  { id: 'fr', name: 'Pháp', flag: 'https://flagcdn.com/w40/fr.png', region: 'UEFA', isQualified: true },
  { id: 'de', name: 'Đức', flag: 'https://flagcdn.com/w40/de.png', region: 'UEFA', isQualified: true },
  { id: 'jp', name: 'Nhật Bản', flag: 'https://flagcdn.com/w40/jp.png', region: 'AFC', isQualified: true },
  { id: 'pt', name: 'Bồ Đào Nha', flag: 'https://flagcdn.com/w40/pt.png', region: 'UEFA', isQualified: true },
];

// DATA BASED ON PROMPT: 42 QUALIFIED TEAMS + Vietnam (for local relevance)
export const ALL_TEAMS: Team[] = [
  // --- CONCACAF (6) ---
  { id: 'us', name: 'USA', flag: 'https://flagcdn.com/w40/us.png', region: 'CONCACAF', isQualified: true, ranking: 11, playerCount: 26, group: 'Group D', participations: 11, displayColor: 'bg-blue-700' },
  { id: 'ca', name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png', region: 'CONCACAF', isQualified: true, ranking: 50, playerCount: 26, group: 'Group B', participations: 2, displayColor: 'bg-red-600' },
  { id: 'mx', name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png', region: 'CONCACAF', isQualified: true, ranking: 14, playerCount: 26, group: 'Group A', participations: 17, displayColor: 'bg-green-600' },
  { id: 'ht', name: 'Haiti', flag: 'https://flagcdn.com/w40/ht.png', region: 'CONCACAF', isQualified: true, ranking: 90, playerCount: 23, group: 'Group F', participations: 2, displayColor: 'bg-blue-900' },
  { id: 'cw', name: 'Curaçao', flag: 'https://flagcdn.com/w40/cw.png', region: 'CONCACAF', isQualified: true, ranking: 88, playerCount: 23, group: 'Group E', participations: 0, displayColor: 'bg-blue-500' },
  { id: 'pa', name: 'Panama', flag: 'https://flagcdn.com/w40/pa.png', region: 'CONCACAF', isQualified: true, ranking: 44, playerCount: 24, group: 'Group C', participations: 1, displayColor: 'bg-red-700' },

  // --- AFC (8) ---
  { id: 'au', name: 'Australia', flag: 'https://flagcdn.com/w40/au.png', region: 'AFC', isQualified: true, ranking: 24, playerCount: 26, group: 'Group D', participations: 6, displayColor: 'bg-yellow-500 text-black' },
  { id: 'ir', name: 'Iran', flag: 'https://flagcdn.com/w40/ir.png', region: 'AFC', isQualified: true, ranking: 20, playerCount: 26, group: 'Group E', participations: 6, displayColor: 'bg-red-800' },
  { id: 'jp', name: 'Nhật Bản', flag: 'https://flagcdn.com/w40/jp.png', region: 'AFC', isQualified: true, ranking: 18, playerCount: 26, group: 'Group E', participations: 7, displayColor: 'bg-blue-900' },
  { id: 'jo', name: 'Jordan', flag: 'https://flagcdn.com/w40/jo.png', region: 'AFC', isQualified: true, ranking: 71, playerCount: 23, group: 'Group G', participations: 0, displayColor: 'bg-white text-black' },
  { id: 'kr', name: 'Hàn Quốc', flag: 'https://flagcdn.com/w40/kr.png', region: 'AFC', isQualified: true, ranking: 22, playerCount: 26, group: 'Group H', participations: 11, displayColor: 'bg-red-500' },
  { id: 'uz', name: 'Uzbekistan', flag: 'https://flagcdn.com/w40/uz.png', region: 'AFC', isQualified: true, ranking: 66, playerCount: 24, group: 'Group A', participations: 0, displayColor: 'bg-blue-500' },
  { id: 'sa', name: 'Saudi Arabia', flag: 'https://flagcdn.com/w40/sa.png', region: 'AFC', isQualified: true, ranking: 53, playerCount: 25, group: 'Group B', participations: 6, displayColor: 'bg-green-700' },
  { id: 'qa', name: 'Qatar', flag: 'https://flagcdn.com/w40/qa.png', region: 'AFC', isQualified: true, ranking: 37, playerCount: 26, group: 'Group A', participations: 1, displayColor: 'bg-red-900' },
  { id: 'vn', name: 'Việt Nam', flag: 'https://flagcdn.com/w40/vn.png', region: 'AFC', isQualified: false, ranking: 115, playerCount: 30, group: 'Play-off', participations: 0, displayColor: 'bg-red-600' }, // Included for local interest

  // --- CONMEBOL (6) ---
  { id: 'ar', name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png', region: 'CONMEBOL', isQualified: true, ranking: 1, playerCount: 26, group: 'Group J', participations: 18, displayColor: 'bg-sky-400 text-black' },
  { id: 'br', name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png', region: 'CONMEBOL', isQualified: true, ranking: 5, playerCount: 26, group: 'Group C', participations: 22, displayColor: 'bg-yellow-400 text-black' },
  { id: 'co', name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png', region: 'CONMEBOL', isQualified: true, ranking: 12, playerCount: 26, group: 'Group K', participations: 6, displayColor: 'bg-yellow-500 text-black' },
  { id: 'ec', name: 'Ecuador', flag: 'https://flagcdn.com/w40/ec.png', region: 'CONMEBOL', isQualified: true, ranking: 31, playerCount: 25, group: 'Group L', participations: 4, displayColor: 'bg-yellow-600 text-black' },
  { id: 'py', name: 'Paraguay', flag: 'https://flagcdn.com/w40/py.png', region: 'CONMEBOL', isQualified: true, ranking: 56, playerCount: 24, group: 'Group I', participations: 8, displayColor: 'bg-red-600' },
  { id: 'uy', name: 'Uruguay', flag: 'https://flagcdn.com/w40/uy.png', region: 'CONMEBOL', isQualified: true, ranking: 15, playerCount: 26, group: 'Group H', participations: 14, displayColor: 'bg-sky-500 text-black' },

  // --- UEFA (12) ---
  { id: 'gb-eng', name: 'Anh', flag: 'https://flagcdn.com/w40/gb-eng.png', region: 'UEFA', isQualified: true, ranking: 4, playerCount: 26, group: 'Group F', participations: 16, displayColor: 'bg-white text-black' },
  { id: 'fr', name: 'Pháp', flag: 'https://flagcdn.com/w40/fr.png', region: 'UEFA', isQualified: true, ranking: 2, playerCount: 26, group: 'Group G', participations: 16, displayColor: 'bg-blue-800' },
  { id: 'hr', name: 'Croatia', flag: 'https://flagcdn.com/w40/hr.png', region: 'UEFA', isQualified: true, ranking: 10, playerCount: 26, group: 'Group K', participations: 6, displayColor: 'bg-red-600' },
  { id: 'no', name: 'Na Uy', flag: 'https://flagcdn.com/w40/no.png', region: 'UEFA', isQualified: true, ranking: 47, playerCount: 24, group: 'Group L', participations: 3, displayColor: 'bg-red-700' },
  { id: 'pt', name: 'Bồ Đào Nha', flag: 'https://flagcdn.com/w40/pt.png', region: 'UEFA', isQualified: true, ranking: 6, playerCount: 26, group: 'Group J', participations: 8, displayColor: 'bg-red-800' },
  { id: 'nl', name: 'Hà Lan', flag: 'https://flagcdn.com/w40/nl.png', region: 'UEFA', isQualified: true, ranking: 7, playerCount: 26, group: 'Group A', participations: 11, displayColor: 'bg-orange-500 text-black' },
  { id: 'de', name: 'Đức', flag: 'https://flagcdn.com/w40/de.png', region: 'UEFA', isQualified: true, ranking: 16, playerCount: 26, group: 'Group B', participations: 20, displayColor: 'bg-gray-800' },
  { id: 'ch', name: 'Thụy Sĩ', flag: 'https://flagcdn.com/w40/ch.png', region: 'UEFA', isQualified: true, ranking: 19, playerCount: 25, group: 'Group C', participations: 12, displayColor: 'bg-red-600' },
  { id: 'gb-sct', name: 'Scotland', flag: 'https://flagcdn.com/w40/gb-sct.png', region: 'UEFA', isQualified: true, ranking: 39, playerCount: 24, group: 'Group D', participations: 8, displayColor: 'bg-blue-900' },
  { id: 'es', name: 'Tây Ban Nha', flag: 'https://flagcdn.com/w40/es.png', region: 'UEFA', isQualified: true, ranking: 8, playerCount: 26, group: 'Group E', participations: 16, displayColor: 'bg-red-500' },
  { id: 'at', name: 'Austria', flag: 'https://flagcdn.com/w40/at.png', region: 'UEFA', isQualified: true, ranking: 25, playerCount: 25, group: 'Group J', participations: 7, displayColor: 'bg-red-600' },
  { id: 'be', name: 'Belgium', flag: 'https://flagcdn.com/w40/be.png', region: 'UEFA', isQualified: true, ranking: 3, playerCount: 26, group: 'Group G', participations: 14, displayColor: 'bg-red-900' },

  // --- OFC (1) ---
  { id: 'nz', name: 'New Zealand', flag: 'https://flagcdn.com/w40/nz.png', region: 'OFC', isQualified: true, ranking: 104, playerCount: 23, group: 'Group H', participations: 2, displayColor: 'bg-black' },

  // --- CAF (9) ---
  { id: 'eg', name: 'Ai Cập', flag: 'https://flagcdn.com/w40/eg.png', region: 'CAF', isQualified: true, ranking: 36, playerCount: 25, group: 'Group I', participations: 3, displayColor: 'bg-red-700' },
  { id: 'sn', name: 'Senegal', flag: 'https://flagcdn.com/w40/sn.png', region: 'CAF', isQualified: true, ranking: 17, playerCount: 26, group: 'Group K', participations: 3, displayColor: 'bg-green-700' },
  { id: 'za', name: 'Nam Phi', flag: 'https://flagcdn.com/w40/za.png', region: 'CAF', isQualified: true, ranking: 59, playerCount: 24, group: 'Group L', participations: 3, displayColor: 'bg-yellow-500 text-black' },
  { id: 'cv', name: 'Cabo Verde', flag: 'https://flagcdn.com/w40/cv.png', region: 'CAF', isQualified: true, ranking: 65, playerCount: 23, group: 'Group H', participations: 0, displayColor: 'bg-blue-900' },
  { id: 'ma', name: 'Morocco', flag: 'https://flagcdn.com/w40/ma.png', region: 'CAF', isQualified: true, ranking: 13, playerCount: 26, group: 'Group F', participations: 6, displayColor: 'bg-red-700' },
  { id: 'ci', name: 'Bờ Biển Ngà', flag: 'https://flagcdn.com/w40/ci.png', region: 'CAF', isQualified: true, ranking: 38, playerCount: 25, group: 'Group D', participations: 3, displayColor: 'bg-orange-600' },
  { id: 'dz', name: 'Algeria', flag: 'https://flagcdn.com/w40/dz.png', region: 'CAF', isQualified: true, ranking: 43, playerCount: 25, group: 'Group J', participations: 4, displayColor: 'bg-green-600' },
  { id: 'tn', name: 'Tunisia', flag: 'https://flagcdn.com/w40/tn.png', region: 'CAF', isQualified: true, ranking: 41, playerCount: 24, group: 'Group A', participations: 6, displayColor: 'bg-red-600' },
  { id: 'gh', name: 'Ghana', flag: 'https://flagcdn.com/w40/gh.png', region: 'CAF', isQualified: true, ranking: 68, playerCount: 24, group: 'Group B', participations: 4, displayColor: 'bg-white text-black' },
];

export const POLL_OPTIONS: PollOption[] = [
  { id: 'p1', label: 'Việt Nam đi tiếp', votes: 1250 },
  { id: 'p2', label: 'Việt Nam bị loại', votes: 430 },
  { id: 'p3', label: 'Cần phép màu', votes: 800 },
];

// HOST STADIUMS DATA
export const HOST_STADIUMS: Stadium[] = [
  { id: 's1', name: 'Estadio Azteca', city: 'Mexico City', capacity: '87,523', image: 'https://picsum.photos/400/250?random=90' },
  { id: 's2', name: 'MetLife Stadium', city: 'New York/NJ', capacity: '82,500', image: 'https://picsum.photos/400/250?random=91' },
  { id: 's3', name: 'SoFi Stadium', city: 'Los Angeles', capacity: '70,240', image: 'https://picsum.photos/400/250?random=92' },
  { id: 's4', name: 'AT&T Stadium', city: 'Dallas', capacity: '80,000', image: 'https://picsum.photos/400/250?random=93' },
];
