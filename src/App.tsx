import {useEffect, useState} from 'react';
import {ArrowDown, ArrowUp, Check, Copy} from 'lucide-react';
import {LakesideMotif} from './components/LakesideMotif';
import {TopNav} from './components/TopNav';
import {
  EVENT_INFO,
  NAV_ITEMS,
  formatEventSummaryText,
  type NavItem,
} from './data/eventInfo';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavItem['id']>('hero');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );

        if (visible.length > 0) {
          const id = visible[0].target.id as NavItem['id'];
          setActiveSection(id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));

    const handleScrollBottom = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom < 48) {
        setActiveSection('contact');
      } else if (window.scrollY < 40) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScrollBottom, {passive: true});

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollBottom);
    };
  }, []);

  const handleNavigate = (sectionId: NavItem['id']) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const handleCopySummary = async () => {
    const summaryText = formatEventSummaryText();
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = summaryText;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  const coreThreeInfo = [
    {
      label: '일시',
      value: EVENT_INFO.dateTimeFull,
      isNumeric: true,
    },
    {
      label: '장소',
      value: EVENT_INFO.location,
      isNumeric: false,
    },
    {
      label: '대상',
      value: EVENT_INFO.audience,
      isNumeric: false,
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-pine focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        본문 바로가기
      </a>

      <TopNav activeSection={activeSection} onNavigate={handleNavigate} />

      <main>
        {/* 1. 첫 화면 */}
        <section
          id="hero"
          aria-labelledby="hero-heading"
          className="scroll-mt-16 border-b border-line"
        >
          <div className="mx-auto max-w-[1080px] px-4 py-12 sm:px-8 sm:py-20 lg:py-24">
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <p className="text-xs font-medium text-ink-faint sm:text-sm">
                    <span>{EVENT_INFO.organizer}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>사내 행사 안내</span>
                  </p>

                  <h1
                    id="hero-heading"
                    className="mt-5 font-display text-[2.15rem] leading-[1.22] font-bold tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.35rem]"
                  >
                    <span className="block">{EVENT_INFO.titleMain}</span>
                    <span className="mt-1.5 block text-pine">
                      {EVENT_INFO.titleSub}
                    </span>
                  </h1>

                  <p className="mt-6 max-w-xl text-base leading-[1.75] text-ink-muted sm:text-[1.0625rem]">
                    {EVENT_INFO.oneLineIntro}
                  </p>
                </div>

                <div className="mt-9">
                  <dl className="grid grid-cols-1 gap-4 border-y border-line py-5 sm:grid-cols-2 sm:gap-8">
                    <div>
                      <dt className="text-xs font-medium text-ink-faint">날짜</dt>
                      <dd className="mt-1.5 text-base font-semibold text-ink tabular-nums sm:text-[1.0625rem]">
                        {EVENT_INFO.dateOnly}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-ink-faint">장소</dt>
                      <dd className="mt-1.5 text-base font-semibold text-ink sm:text-[1.0625rem]">
                        {EVENT_INFO.location}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleNavigate('details')}
                      className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-md bg-pine px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-pine-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine whitespace-nowrap shrink-0"
                    >
                      <span>핵심 정보 확인하기</span>
                      <ArrowDown className="h-4 w-4" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate('about')}
                      className="inline-flex min-h-[44px] cursor-pointer items-center px-2 py-2.5 text-sm font-medium text-ink-muted underline-offset-4 transition-colors duration-150 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine whitespace-nowrap shrink-0"
                    >
                      행사 소개 읽기
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <LakesideMotif />
              </div>
            </div>
          </div>
        </section>

        {/* 2. 행사 소개 */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="scroll-mt-16 border-b border-line bg-surface"
        >
          <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-8 sm:py-20">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <h2
                  id="about-heading"
                  className="font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]"
                >
                  01. 행사 소개
                </h2>
                <p className="mt-2.5 text-xs text-ink-faint sm:text-sm">
                  {EVENT_INFO.fullTitle}
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="max-w-2xl space-y-5 text-base leading-[1.85] text-ink sm:text-[1.0625rem]">
                  <p>{EVENT_INFO.aboutSentences[0]}</p>
                  <p className="text-ink-muted">{EVENT_INFO.aboutSentences[1]}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 핵심 정보 */}
        <section
          id="details"
          aria-labelledby="details-heading"
          className="scroll-mt-16 border-b border-line"
        >
          <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-8 sm:py-20">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h2
                  id="details-heading"
                  className="font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]"
                >
                  02. 핵심 정보
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  일시, 장소, 대상 정보를 한눈에 확인하실 수 있습니다.
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  aria-live="polite"
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-md border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:border-pine hover:text-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine whitespace-nowrap shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-pine" aria-hidden="true" />
                      <span>행사 요약이 복사되었습니다</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                      <span>핵심 정보 복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-line bg-surface">
              <dl className="grid grid-cols-1 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
                {coreThreeInfo.map((item) => (
                  <div key={item.label} className="px-6 py-6 sm:px-7 sm:py-7">
                    <dt className="text-xs font-medium text-ink-faint sm:text-sm">
                      {item.label}
                    </dt>
                    <dd
                      className={`mt-2.5 text-base font-semibold leading-snug text-ink sm:text-lg ${
                        item.isNumeric ? 'tabular-nums' : ''
                      }`}
                    >
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <dl className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-line bg-canvas/60 px-6 py-4 sm:px-7">
                <dt className="text-xs font-medium text-ink-faint sm:text-sm">
                  주최
                </dt>
                <dd className="text-sm font-semibold text-ink sm:text-base">
                  {EVENT_INFO.organizer}
                </dd>
              </dl>
            </div>
          </div>
        </section>

        {/* 4. 문의 */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="scroll-mt-16 bg-surface"
        >
          <div className="mx-auto max-w-[1080px] px-4 py-14 sm:px-8 sm:py-20">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <h2
                  id="contact-heading"
                  className="font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]"
                >
                  03. 문의
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  행사 관련 문의 담당 부서입니다.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-lg border border-line bg-canvas px-6 py-6 sm:px-8 sm:py-7">
                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                    <div>
                      <dt className="text-xs font-medium text-ink-faint">
                        문의 부서
                      </dt>
                      <dd className="mt-2 text-lg font-semibold text-ink">
                        {EVENT_INFO.contactTeam}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-ink-faint">
                        연락처
                      </dt>
                      <dd className="mt-2 text-lg font-semibold text-ink-muted">
                        {EVENT_INFO.contactDetail}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-canvas">
        <div className="mx-auto max-w-[1080px] px-4 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="text-sm text-ink-muted">
              <span className="font-medium text-ink">{EVENT_INFO.fullTitle}</span>
              <span className="mx-2 text-line-strong" aria-hidden="true">
                ·
              </span>
              <span>{EVENT_INFO.organizer}</span>
            </div>

            <button
              type="button"
              onClick={() => handleNavigate('hero')}
              className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine whitespace-nowrap shrink-0"
            >
              <span>맨 위로</span>
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <p className="text-xs font-medium text-ink-faint">
              {EVENT_INFO.disclaimer}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
