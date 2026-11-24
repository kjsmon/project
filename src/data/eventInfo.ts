export interface EventInfo {
  readonly titleMain: string;
  readonly titleSub: string;
  readonly fullTitle: string;
  readonly company: string;
  readonly organizer: string;
  readonly department: string;
  readonly oneLineIntro: string;
  readonly aboutSentences: readonly [string, string];
  readonly dateOnly: string;
  readonly timeOnly: string;
  readonly dateTimeFull: string;
  readonly location: string;
  readonly audience: string;
  readonly contactTeam: string;
  readonly contactDetail: string;
  readonly disclaimer: string;
}

export const EVENT_INFO: EventInfo = {
  titleMain: '2027 봄 워크숍',
  titleSub: "'함께 걷는 하루'",
  fullTitle: "2027 봄 워크숍 '함께 걷는 하루'",
  company: '온담컴퍼니',
  organizer: '온담컴퍼니 경영지원팀',
  department: '경영지원팀',
  oneLineIntro: '봄날, 동료와 나란히 걷는 하루',
  aboutSentences: [
    "2027 봄 워크숍 '함께 걷는 하루'는 온담컴퍼니 경영지원팀이 주최하여 온담컴퍼니 전 직원이 한자리에 모이는 사내 행사입니다.",
    '2027년 4월 16일 금요일 광교호수공원에서 동료들과 나란히 걸으며 뜻깊은 하루를 함께합니다.',
  ],
  dateOnly: '2027년 4월 16일(금)',
  timeOnly: '09:30~16:00',
  dateTimeFull: '2027년 4월 16일(금) 09:30~16:00',
  location: '광교호수공원',
  audience: '온담컴퍼니 전 직원',
  contactTeam: '경영지원팀',
  contactDetail: '미정',
  disclaimer: '교육용 가상 행사입니다',
};

export interface NavItem {
  readonly id: 'hero' | 'about' | 'details' | 'contact';
  readonly label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  {id: 'hero', label: '첫 화면'},
  {id: 'about', label: '행사 소개'},
  {id: 'details', label: '핵심 정보'},
  {id: 'contact', label: '문의'},
];

export function formatEventSummaryText(): string {
  return [
    `행사명: ${EVENT_INFO.fullTitle}`,
    `주최: ${EVENT_INFO.organizer}`,
    `일시: ${EVENT_INFO.dateTimeFull}`,
    `장소: ${EVENT_INFO.location}`,
    `대상: ${EVENT_INFO.audience}`,
    `문의: ${EVENT_INFO.contactTeam} (연락처 ${EVENT_INFO.contactDetail})`,
  ].join('\n');
}
