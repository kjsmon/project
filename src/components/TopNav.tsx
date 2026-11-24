import {EVENT_INFO, NAV_ITEMS, type NavItem} from '../data/eventInfo';

interface TopNavProps {
  activeSection: NavItem['id'];
  onNavigate: (sectionId: NavItem['id']) => void;
}

export function TopNav({activeSection, onNavigate}: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between gap-4 px-4 sm:h-16 sm:gap-8 sm:px-8">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('hero');
          }}
          className="font-display text-base font-bold tracking-tight text-ink whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine sm:text-lg"
        >
          {EVENT_INFO.company}
        </a>

        <nav
          aria-label="페이지 영역 이동"
          className="flex items-center gap-3 overflow-x-auto sm:gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                aria-current={isActive ? 'location' : undefined}
                className={`relative inline-flex min-h-[44px] items-center text-[13px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine sm:text-sm ${
                  isActive
                    ? 'text-pine'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-2.5 h-[1.5px] bg-pine transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center shrink-0 md:flex">
          <button
            type="button"
            onClick={() => onNavigate('details')}
            className="min-h-[40px] cursor-pointer rounded-md bg-pine px-4 py-2 text-xs font-medium text-white transition-colors duration-150 hover:bg-pine-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine whitespace-nowrap shrink-0"
          >
            핵심 정보 보기
          </button>
        </div>
      </div>
    </header>
  );
}
