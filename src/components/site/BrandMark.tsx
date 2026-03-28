import Link from 'next/link';

export function BrandMark() {
  return (
    <Link href="/" className="inline-flex min-w-0 items-center gap-2.5 text-left sm:gap-3">
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-[14px] bg-[#18263F] shadow-[0_14px_30px_rgba(24,38,63,0.18)] sm:h-11 sm:w-11 sm:rounded-[15px]">
        <svg
          viewBox="0 0 48 48"
          aria-hidden="true"
          className="h-10 w-10 sm:h-11 sm:w-11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="8" width="16" height="16" rx="6" stroke="#FFF7EC" strokeWidth="3.5" />
          <rect x="24" y="24" width="16" height="16" rx="6" stroke="#B98132" strokeWidth="3.5" />
          <path
            d="M24 16H27C31.4183 16 35 19.5817 35 24V24"
            stroke="#8DA79C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M24 32H21C16.5817 32 13 28.4183 13 24V24"
            stroke="#8DA79C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-serif text-[1.18rem] leading-none tracking-[-0.03em] text-[#18263F] sm:text-[1.4rem]">
          SyncWorkflow
        </span>
        <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-[#6B7380] sm:block">
          Website + intake systems
        </span>
      </span>
    </Link>
  );
}
