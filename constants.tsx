
import { NewsItem, Match, VideoItem, Team, AccessType, PollOption, StandingRow, Stadium } from './types';
import { Globe, MapPin, Users, Zap, Home, Calendar, FileText, Video, Image, Trophy } from 'lucide-react';
import React from 'react';

// Navigation Items
export const QUICK_ACCESS_ITEMS = [
  { label: AccessType.HOME, icon: <Home className="w-4 h-4" /> },
  { label: AccessType.SCHEDULE, icon: <Calendar className="w-4 h-4" /> },
  { label: AccessType.STANDINGS, icon: <Trophy className="w-4 h-4" /> },
  { label: AccessType.TEAMS, icon: <Users className="w-4 h-4" /> },
  { label: AccessType.NEWS, icon: <FileText className="w-4 h-4" /> },
  { label: AccessType.VIDEO, icon: <Video className="w-4 h-4" /> },
  { label: AccessType.GALLERY, icon: <Image className="w-4 h-4" /> },
];

const getPlaceholder = (w: number, h: number, text: string = 'WC26') => `https://placehold.co/${w}x${h}/e2e8f0/94a3b8?text=${text}`;

const BASE_TITLES = [
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
];

export const NEWS_DATA: NewsItem[] = Array.from({ length: 50 }).map((_, index) => {
    const base = BASE_TITLES[index % BASE_TITLES.length];
    return {
        id: (index + 1).toString(),
        title: index < 3 ? base.t : `${base.t} (Tin số #${index + 1})`,
        excerpt: 'Cập nhật những thông tin mới nhất về hành trình World Cup 2026.',
        image: getPlaceholder(600, 400, `NEWS-${index+1}`),
        time: `${Math.floor(Math.random() * 24) + 1} giờ trước`,
        category: base.c,
        isMain: index === 0,
    };
});

const SHIELD_ICON = 'https://cdn-icons-png.flaticon.com/512/10602/10602939.png'; 

const FLAG_MAP: Record<string, string> = {
    'Úc': 'https://flagcdn.com/w40/au.png', 'Iran': 'https://flagcdn.com/w40/ir.png', 'Nhật Bản': 'https://flagcdn.com/w40/jp.png', 'Jordan': 'https://flagcdn.com/w40/jo.png', 'Qatar': 'https://flagcdn.com/w40/qa.png', 'Ả Rập Xê Út': 'https://flagcdn.com/w40/sa.png', 'Hàn Quốc': 'https://flagcdn.com/w40/kr.png', 'Uzbekistan': 'https://flagcdn.com/w40/uz.png',
    'Algérie': 'https://flagcdn.com/w40/dz.png', 'Cabo Verde': 'https://flagcdn.com/w40/cv.png', 'Ai Cập': 'https://flagcdn.com/w40/eg.png', 'Ghana': 'https://flagcdn.com/w40/gh.png', 'Bờ Biển Ngà': 'https://flagcdn.com/w40/ci.png', 'Maroc': 'https://flagcdn.com/w40/ma.png', 'Sénégal': 'https://flagcdn.com/w40/sn.png', 'Nam Phi': 'https://flagcdn.com/w40/za.png', 'Tunisia': 'https://flagcdn.com/w40/tn.png',
    'Canada': 'https://flagcdn.com/w40/ca.png', 'Curaçao': 'https://flagcdn.com/w40/cw.png', 'Haiti': 'https://flagcdn.com/w40/ht.png', 'México': 'https://flagcdn.com/w40/mx.png', 'Panamá': 'https://flagcdn.com/w40/pa.png', 'Hoa Kỳ': 'https://flagcdn.com/w40/us.png',
    'Argentina': 'https://flagcdn.com/w40/ar.png', 'Brasil': 'https://flagcdn.com/w40/br.png', 'Colombia': 'https://flagcdn.com/w40/co.png', 'Ecuador': 'https://flagcdn.com/w40/ec.png', 'Paraguay': 'https://flagcdn.com/w40/py.png', 'Uruguay': 'https://flagcdn.com/w40/uy.png',
    'New Zealand': 'https://flagcdn.com/w40/nz.png',
    'Áo': 'https://flagcdn.com/w40/at.png', 'Bỉ': 'https://flagcdn.com/w40/be.png', 'Croatia': 'https://flagcdn.com/w40/hr.png', 'Anh': 'https://flagcdn.com/w40/gb-eng.png', 'Pháp': 'https://flagcdn.com/w40/fr.png', 'Đức': 'https://flagcdn.com/w40/de.png', 'Hà Lan': 'https://flagcdn.com/w40/nl.png', 'Na Uy': 'https://flagcdn.com/w40/no.png', 'Bồ Đào Nha': 'https://flagcdn.com/w40/pt.png', 'Scotland': 'https://flagcdn.com/w40/gb-sct.png', 'Tây Ban Nha': 'https://flagcdn.com/w40/es.png', 'Thụy Sĩ': 'https://flagcdn.com/w40/ch.png'
};

const getFlag = (name: string) => FLAG_MAP[name] || SHIELD_ICON;

export const ALL_TEAMS: Team[] = [
    // AFC (8)
    { id: 'afc-1', name: 'Úc', flag: getFlag('Úc'), region: 'AFC', isQualified: true, ranking: 24, displayColor: 'bg-yellow-600' },
    { id: 'afc-2', name: 'Iran', flag: getFlag('Iran'), region: 'AFC', isQualified: true, ranking: 20, displayColor: 'bg-green-700' },
    { id: 'afc-3', name: 'Nhật Bản', flag: getFlag('Nhật Bản'), region: 'AFC', isQualified: true, ranking: 18, displayColor: 'bg-blue-800' },
    { id: 'afc-4', name: 'Jordan', flag: getFlag('Jordan'), region: 'AFC', isQualified: true, ranking: 71, displayColor: 'bg-red-700' },
    { id: 'afc-5', name: 'Qatar', flag: getFlag('Qatar'), region: 'AFC', isQualified: true, ranking: 37, displayColor: 'bg-red-900' },
    { id: 'afc-6', name: 'Ả Rập Xê Út', flag: getFlag('Ả Rập Xê Út'), region: 'AFC', isQualified: true, ranking: 53, displayColor: 'bg-green-600' },
    { id: 'afc-7', name: 'Hàn Quốc', flag: getFlag('Hàn Quốc'), region: 'AFC', isQualified: true, ranking: 22, displayColor: 'bg-red-600' },
    { id: 'afc-8', name: 'Uzbekistan', flag: getFlag('Uzbekistan'), region: 'AFC', isQualified: true, ranking: 64, displayColor: 'bg-blue-500' },
    // CAF (9)
    { id: 'caf-1', name: 'Algérie', flag: getFlag('Algérie'), region: 'CAF', isQualified: true, ranking: 43, displayColor: 'bg-green-600' },
    { id: 'caf-2', name: 'Cabo Verde', flag: getFlag('Cabo Verde'), region: 'CAF', isQualified: true, ranking: 65, displayColor: 'bg-blue-700' },
    { id: 'caf-3', name: 'Ai Cập', flag: getFlag('Ai Cập'), region: 'CAF', isQualified: true, ranking: 36, displayColor: 'bg-red-700' },
    { id: 'caf-4', name: 'Ghana', flag: getFlag('Ghana'), region: 'CAF', isQualified: true, ranking: 68, displayColor: 'bg-yellow-500 text-black' },
    { id: 'caf-5', name: 'Bờ Biển Ngà', flag: getFlag('Bờ Biển Ngà'), region: 'CAF', isQualified: true, ranking: 38, displayColor: 'bg-orange-500' },
    { id: 'caf-6', name: 'Maroc', flag: getFlag('Maroc'), region: 'CAF', isQualified: true, ranking: 12, displayColor: 'bg-red-800' },
    { id: 'caf-7', name: 'Sénégal', flag: getFlag('Sénégal'), region: 'CAF', isQualified: true, ranking: 17, displayColor: 'bg-green-700' },
    { id: 'caf-8', name: 'Nam Phi', flag: getFlag('Nam Phi'), region: 'CAF', isQualified: true, ranking: 59, displayColor: 'bg-green-500' },
    { id: 'caf-9', name: 'Tunisia', flag: getFlag('Tunisia'), region: 'CAF', isQualified: true, ranking: 41, displayColor: 'bg-red-600' },
    // CONCACAF (6)
    { id: 'con-1', name: 'Canada', flag: getFlag('Canada'), region: 'CONCACAF', isQualified: true, ranking: 50, displayColor: 'bg-red-600' },
    { id: 'con-2', name: 'Curaçao', flag: getFlag('Curaçao'), region: 'CONCACAF', isQualified: true, ranking: 91, displayColor: 'bg-blue-600' },
    { id: 'con-3', name: 'Haiti', flag: getFlag('Haiti'), region: 'CONCACAF', isQualified: true, ranking: 90, displayColor: 'bg-blue-800' },
    { id: 'con-4', name: 'México', flag: getFlag('México'), region: 'CONCACAF', isQualified: true, ranking: 14, displayColor: 'bg-green-700' },
    { id: 'con-5', name: 'Panamá', flag: getFlag('Panamá'), region: 'CONCACAF', isQualified: true, ranking: 45, displayColor: 'bg-red-600' },
    { id: 'con-6', name: 'Hoa Kỳ', flag: getFlag('Hoa Kỳ'), region: 'CONCACAF', isQualified: true, ranking: 11, displayColor: 'bg-blue-900' },
    // CONMEBOL (6)
    { id: 'com-1', name: 'Argentina', flag: getFlag('Argentina'), region: 'CONMEBOL', isQualified: true, ranking: 1, displayColor: 'bg-blue-400' },
    { id: 'com-2', name: 'Brasil', flag: getFlag('Brasil'), region: 'CONMEBOL', isQualified: true, ranking: 5, displayColor: 'bg-yellow-400 text-black' },
    { id: 'com-3', name: 'Colombia', flag: getFlag('Colombia'), region: 'CONMEBOL', isQualified: true, ranking: 12, displayColor: 'bg-yellow-500 text-black' },
    { id: 'com-4', name: 'Ecuador', flag: getFlag('Ecuador'), region: 'CONMEBOL', isQualified: true, ranking: 31, displayColor: 'bg-yellow-600 text-black' },
    { id: 'com-5', name: 'Paraguay', flag: getFlag('Paraguay'), region: 'CONMEBOL', isQualified: true, ranking: 56, displayColor: 'bg-red-600' },
    { id: 'com-6', name: 'Uruguay', flag: getFlag('Uruguay'), region: 'CONMEBOL', isQualified: true, ranking: 15, displayColor: 'bg-blue-500' },
    // OFC (1)
    { id: 'ofc-1', name: 'New Zealand', flag: getFlag('New Zealand'), region: 'OFC', isQualified: true, ranking: 103, displayColor: 'bg-black' },
    // UEFA (12)
    { id: 'uef-1', name: 'Áo', flag: getFlag('Áo'), region: 'UEFA', isQualified: true, ranking: 25, displayColor: 'bg-red-600' },
    { id: 'uef-2', name: 'Bỉ', flag: getFlag('Bỉ'), region: 'UEFA', isQualified: true, ranking: 3, displayColor: 'bg-red-800' },
    { id: 'uef-3', name: 'Croatia', flag: getFlag('Croatia'), region: 'UEFA', isQualified: true, ranking: 10, displayColor: 'bg-red-600' },
    { id: 'uef-4', name: 'Anh', flag: getFlag('Anh'), region: 'UEFA', isQualified: true, ranking: 4, displayColor: 'bg-white text-black border-gray-200' },
    { id: 'uef-5', name: 'Pháp', flag: getFlag('Pháp'), region: 'UEFA', isQualified: true, ranking: 2, displayColor: 'bg-blue-900' },
    { id: 'uef-6', name: 'Đức', flag: getFlag('Đức'), region: 'UEFA', isQualified: true, ranking: 16, displayColor: 'bg-white text-black border-gray-200' },
    { id: 'uef-7', name: 'Hà Lan', flag: getFlag('Hà Lan'), region: 'UEFA', isQualified: true, ranking: 7, displayColor: 'bg-orange-500' },
    { id: 'uef-8', name: 'Na Uy', flag: getFlag('Na Uy'), region: 'UEFA', isQualified: true, ranking: 47, displayColor: 'bg-red-700' },
    { id: 'uef-9', name: 'Bồ Đào Nha', flag: getFlag('Bồ Đào Nha'), region: 'UEFA', isQualified: true, ranking: 6, displayColor: 'bg-red-800' },
    { id: 'uef-10', name: 'Scotland', flag: getFlag('Scotland'), region: 'UEFA', isQualified: true, ranking: 39, displayColor: 'bg-blue-900' },
    { id: 'uef-11', name: 'Tây Ban Nha', flag: getFlag('Tây Ban Nha'), region: 'UEFA', isQualified: true, ranking: 8, displayColor: 'bg-red-700' },
    { id: 'uef-12', name: 'Thụy Sĩ', flag: getFlag('Thụy Sĩ'), region: 'UEFA', isQualified: true, ranking: 19, displayColor: 'bg-red-600' }
];

const createEmptyStanding = (team: string, flag: string): StandingRow => ({
    rank: 0, team, flag, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, points: 0, gd: '0', form: ['-', '-', '-', '-', '-']
});

export const WC_GROUPS_MOCK: Record<string, StandingRow[]> = {
    'A': [
        createEmptyStanding('México', getFlag('México')),
        createEmptyStanding('Nam Phi', getFlag('Nam Phi')),
        createEmptyStanding('Hàn Quốc', getFlag('Hàn Quốc')),
        createEmptyStanding('Thắng nhánh D Châu Âu', SHIELD_ICON)
    ],
    'B': [
        createEmptyStanding('Canada', getFlag('Canada')),
        createEmptyStanding('Thắng nhánh A Châu Âu', SHIELD_ICON),
        createEmptyStanding('Qatar', getFlag('Qatar')),
        createEmptyStanding('Thụy Sĩ', getFlag('Thụy Sĩ'))
    ],
    'C': [
        createEmptyStanding('Brasil', getFlag('Brasil')),
        createEmptyStanding('Maroc', getFlag('Maroc')),
        createEmptyStanding('Haiti', getFlag('Haiti')),
        createEmptyStanding('Scotland', getFlag('Scotland'))
    ],
    'D': [
        createEmptyStanding('Hoa Kỳ', getFlag('Hoa Kỳ')),
        createEmptyStanding('Paraguay', getFlag('Paraguay')),
        createEmptyStanding('Úc', getFlag('Úc')),
        createEmptyStanding('Thắng nhánh C Châu Âu', SHIELD_ICON)
    ],
    'E': [
        createEmptyStanding('Đức', getFlag('Đức')),
        createEmptyStanding('Curaçao', getFlag('Curaçao')),
        createEmptyStanding('Bờ Biển Ngà', getFlag('Bờ Biển Ngà')),
        createEmptyStanding('Ecuador', getFlag('Ecuador'))
    ],
    'F': [
        createEmptyStanding('Hà Lan', getFlag('Hà Lan')),
        createEmptyStanding('Nhật Bản', getFlag('Nhật Bản')),
        createEmptyStanding('Thắng nhánh B Châu Âu', SHIELD_ICON),
        createEmptyStanding('Tunisia', getFlag('Tunisia'))
    ],
    'G': [
        createEmptyStanding('Bỉ', getFlag('Bỉ')),
        createEmptyStanding('Ai Cập', getFlag('Ai Cập')),
        createEmptyStanding('Iran', getFlag('Iran')),
        createEmptyStanding('New Zealand', getFlag('New Zealand'))
    ],
    'H': [
        createEmptyStanding('Tây Ban Nha', getFlag('Tây Ban Nha')),
        createEmptyStanding('Cabo Verde', getFlag('Cabo Verde')),
        createEmptyStanding('Ả Rập Xê Út', getFlag('Ả Rập Xê Út')),
        createEmptyStanding('Uruguay', getFlag('Uruguay'))
    ],
    'I': [
        createEmptyStanding('Pháp', getFlag('Pháp')),
        createEmptyStanding('Sénégal', getFlag('Sénégal')),
        createEmptyStanding('Thắng nhánh 2 liên lục địa', SHIELD_ICON),
        createEmptyStanding('Na Uy', getFlag('Na Uy'))
    ],
    'J': [
        createEmptyStanding('Argentina', getFlag('Argentina')),
        createEmptyStanding('Algérie', getFlag('Algérie')),
        createEmptyStanding('Áo', getFlag('Áo')),
        createEmptyStanding('Jordan', getFlag('Jordan'))
    ],
    'K': [
        createEmptyStanding('Bồ Đào Nha', getFlag('Bồ Đào Nha')),
        createEmptyStanding('Thắng nhánh 1 liên lục địa', SHIELD_ICON),
        createEmptyStanding('Uzbekistan', getFlag('Uzbekistan')),
        createEmptyStanding('Colombia', getFlag('Colombia'))
    ],
    'L': [
        createEmptyStanding('Anh', getFlag('Anh')),
        createEmptyStanding('Croatia', getFlag('Croatia')),
        createEmptyStanding('Ghana', getFlag('Ghana')),
        createEmptyStanding('Panamá', getFlag('Panamá'))
    ]
};

export const UPCOMING_MATCHES: Match[] = [
  // Vòng Bảng
  { id: 'm1', date: 'Thứ Sáu, 12/06/2026', time: '02:00', homeTeam: 'México', awayTeam: 'Nam Phi', homeFlag: getFlag('México'), awayFlag: getFlag('Nam Phi'), round: 'Bảng A', stadium: 'Estadio Azteca', status: 'upcoming' },
  { id: 'm2', date: 'Thứ Sáu, 12/06/2026', time: '09:00', homeTeam: 'Hàn Quốc', awayTeam: 'Na Uy', homeFlag: getFlag('Hàn Quốc'), awayFlag: getFlag('Na Uy'), round: 'Bảng A', stadium: 'Guadalajara Stadium', status: 'upcoming' },
  { id: 'm3', date: 'Thứ Bảy, 13/06/2026', time: '02:00', homeTeam: 'Canada', awayTeam: 'Thụy Sĩ', homeFlag: getFlag('Canada'), awayFlag: getFlag('Thụy Sĩ'), round: 'Bảng B', stadium: 'Toronto Stadium', status: 'upcoming' },
  { id: 'm4', date: 'Chủ Nhật, 14/06/2026', time: '05:00', homeTeam: 'Brasil', awayTeam: 'Maroc', homeFlag: getFlag('Brasil'), awayFlag: getFlag('Maroc'), round: 'Bảng C', stadium: 'MetLife Stadium', status: 'upcoming' },
  
  // Vòng 1/32
  { id: 'm32-1', date: 'Thứ Hai, 29/06/2026', time: '02:00', homeTeam: 'Đội nhất Bảng A', awayTeam: 'Đội nhì Bảng B', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/32', stadium: 'SoFi Stadium', status: 'upcoming' },
  { id: 'm32-2', date: 'Thứ Ba, 30/06/2026', time: '00:00', homeTeam: 'Đội nhất Bảng C', awayTeam: 'Đội nhì Bảng F', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/32', stadium: 'Houston Stadium', status: 'upcoming' },

  // Vòng 1/16
  { id: 'm16-1', date: 'Chủ Nhật, 05/07/2026', time: '00:00', homeTeam: 'Thắng Trận 73', awayTeam: 'Thắng Trận 75', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Vòng 1/16', stadium: 'Philadelphia Stadium', status: 'upcoming' },

  // Tứ kết
  { id: 'mqf-1', date: 'Thứ Sáu, 10/07/2026', time: '03:00', homeTeam: 'Thắng Trận 89', awayTeam: 'Thắng Trận 90', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Tứ kết', stadium: 'Boston Stadium', status: 'upcoming' },

  // Bán kết
  { id: 'msf-1', date: 'Thứ Tư, 15/07/2026', time: '02:00', homeTeam: 'Thắng Trận 97', awayTeam: 'Thắng Trận 98', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Bán kết', stadium: 'Dallas Stadium', status: 'upcoming' },

  // Tranh hạng 3
  { id: 'm3rd', date: 'Chủ Nhật, 19/07/2026', time: '04:00', homeTeam: 'Thua Bán kết 1', awayTeam: 'Thua Bán kết 2', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Tranh hạng 3', stadium: 'Miami Stadium', status: 'upcoming' },

  // Chung kết
  { id: 'mfin', date: 'Thứ Hai, 20/07/2026', time: '02:00', homeTeam: 'Thắng Bán kết 1', awayTeam: 'Thắng Bán kết 2', homeFlag: SHIELD_ICON, awayFlag: SHIELD_ICON, round: 'Chung kết', stadium: 'MetLife Stadium', status: 'upcoming' },
];

export const MATCH_STATS_MOCK = {
  possession: [45, 55], shots: [12, 15], shotsOnTarget: [4, 6], corners: [3, 8], fouls: [14, 10], passes: [350, 420],
};

export const MATCH_LINEUPS_MOCK = {
  home: ["Thủ môn A", "Hậu vệ B", "Hậu vệ C", "Hậu vệ D", "Tiền vệ E", "Tiền vệ F", "Tiền vệ G", "Tiền vệ H", "Tiền đạo I", "Tiền đạo J", "Tiền đạo K"],
  away: ["Thủ môn L", "Hậu vệ M", "Hậu vệ N", "Hậu vệ O", "Tiền vệ P", "Tiền vệ Q", "Tiền vệ R", "Tiền vệ S", "Tiền đạo T", "Tiền đạo U", "Tiền đạo V"]
};

export const MATCH_EVENTS_MOCK = [
  { time: "12'", type: "goal", team: "home", player: "Cầu thủ A" },
  { time: "34'", type: "card-yellow", team: "away", player: "Cầu thủ B" },
  { time: "45+2'", type: "goal", team: "away", player: "Cầu thủ C" },
];

export const VIDEO_HIGHLIGHTS: VideoItem[] = Array.from({ length: 7 }).map((_, i) => ({
    id: `v${i}`, title: `Highlight: Video khoảnh khắc số ${i + 1} | World Cup 2026`, thumbnail: getPlaceholder(300, 500, 'VIDEO'), duration: `${Math.floor(Math.random() * 10)}:45`
}));

export const POPULAR_TEAMS: Team[] = [
  { id: 'vn', name: 'Việt Nam', flag: 'https://flagcdn.com/w40/vn.png', region: 'AFC', isQualified: false },
  { id: 'br', name: 'Brasil', flag: getFlag('Brasil'), region: 'CONMEBOL', isQualified: true },
  { id: 'ar', name: 'Argentina', flag: getFlag('Argentina'), region: 'CONMEBOL', isQualified: true },
  { id: 'gb-eng', name: 'Anh', flag: getFlag('Anh'), region: 'UEFA', isQualified: true },
];

export const POLL_OPTIONS: PollOption[] = [
  { id: 'p1', label: 'Việt Nam đi tiếp', votes: 1250 },
  { id: 'p2', label: 'Việt Nam bị loại', votes: 430 },
  { id: 'p3', label: 'Cần phép màu', votes: 800 },
];

export const HOST_STADIUMS: Stadium[] = [
  { id: 's1', name: 'Estadio Azteca', city: 'Mexico City', capacity: '87,523', image: getPlaceholder(400, 250, 'AZTECA') },
  { id: 's2', name: 'MetLife Stadium', city: 'New York/NJ', capacity: '82,500', image: getPlaceholder(400, 250, 'METLIFE') },
  { id: 's3', name: 'SoFi Stadium', city: 'Los Angeles', capacity: '70,240', image: getPlaceholder(400, 250, 'SOFI') },
  { id: 's4', name: 'AT&T Stadium', city: 'Dallas', capacity: '80,000', image: getPlaceholder(400, 250, 'AT&T') },
];
