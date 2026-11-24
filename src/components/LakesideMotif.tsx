import {EVENT_INFO} from '../data/eventInfo';

export function LakesideMotif() {
  return (
    <div
      aria-label="광교호수공원 산책로와 수면을 형상화한 안내 그래픽"
      className="relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-lg border border-line bg-surface p-6 sm:p-8"
    >
      <div className="flex items-center justify-between text-xs text-ink-faint">
        <span>{EVENT_INFO.organizer}</span>
        <span className="tabular-nums">2027. 04. 16.</span>
      </div>

      <div className="my-6 flex flex-1 items-center justify-center">
        <svg
          viewBox="0 0 420 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full max-w-[380px]"
          role="img"
          aria-hidden="true"
        >
          {/* 부드러운 봄 하늘과 호수 배경 면 */}
          <rect
            x="16"
            y="16"
            width="388"
            height="208"
            rx="8"
            fill="#F4F8F5"
            stroke="#DDE5DF"
            strokeWidth="1"
          />

          {/* 원경 능선 곡선 */}
          <path
            d="M16 146C78 124 134 114 198 126C262 138 330 116 404 94"
            stroke="#C6D6CB"
            strokeWidth="1.25"
          />
          <path
            d="M16 164C92 146 164 138 236 150C302 161 356 144 404 128"
            stroke="#9BB8A6"
            strokeWidth="1.25"
          />

          {/* 함께 걷는 산책로 주 곡선 */}
          <path
            d="M36 196C98 188 142 162 204 158C268 154 322 178 384 152"
            stroke="#1E563B"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M44 204C108 196 150 172 210 168C272 164 324 186 382 162"
            stroke="#1E563B"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            strokeLinecap="round"
            opacity="0.55"
          />

          {/* 잔잔한 호수 수면 파동선 */}
          <line
            x1="78"
            y1="184"
            x2="132"
            y2="184"
            stroke="#B6C9BC"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <line
            x1="258"
            y1="194"
            x2="334"
            y2="194"
            stroke="#B6C9BC"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <line
            x1="158"
            y1="205"
            x2="224"
            y2="205"
            stroke="#C6D6CB"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* 봄 햇살 원형 모티프 */}
          <circle
            cx="326"
            cy="64"
            r="22"
            fill="#EBF3EE"
            stroke="#B6C9BC"
            strokeWidth="1"
          />
          <circle cx="326" cy="64" r="10" fill="#1E563B" opacity="0.16" />

          {/* 여정 시작점과 도착점 마커 */}
          <circle cx="36" cy="196" r="4" fill="#FFFFFF" stroke="#1E563B" strokeWidth="2" />
          <circle cx="384" cy="152" r="4" fill="#1E563B" />
        </svg>
      </div>

      <div className="flex items-end justify-between border-t border-line pt-4">
        <div>
          <p className="text-xs text-ink-faint">장소</p>
          <p className="mt-1 font-display text-lg font-bold text-ink">
            {EVENT_INFO.location}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-faint">시간</p>
          <p className="mt-1 text-sm font-medium text-ink tabular-nums">
            {EVENT_INFO.timeOnly}
          </p>
        </div>
      </div>
    </div>
  );
}
