import Link from 'next/link';

import { BrandMark } from '@/components/site/BrandMark';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-2.5 sm:px-6 sm:pt-3 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-nowrap items-center justify-between gap-3 rounded-[24px] border border-[rgba(216,200,179,0.78)] bg-[rgba(246,240,231,0.9)] px-3.5 py-3 shadow-[0_18px_40px_rgba(24,38,63,0.08)] backdrop-blur-xl sm:rounded-full sm:px-5">
        <BrandMark />
        <nav className="ml-auto hidden items-center gap-1 rounded-full border border-[rgba(216,200,179,0.78)] bg-white/72 p-1 text-sm text-[#556174] md:flex">
          <Link
            href="/#what-we-improve"
            className="rounded-full px-3 py-2 transition-colors hover:bg-[#FFF7EC] hover:text-[#18263F]"
          >
            What I Fix
          </Link>
          <Link
            href="/#how-it-works"
            className="rounded-full px-3 py-2 transition-colors hover:bg-[#FFF7EC] hover:text-[#18263F]"
          >
            How It Works
          </Link>
          <Link
            href="/#web-team"
            className="rounded-full px-3 py-2 transition-colors hover:bg-[#FFF7EC] hover:text-[#18263F]"
          >
            Ongoing Support
          </Link>
          <Link
            href="/sample-review"
            className="rounded-full px-3 py-2 transition-colors hover:bg-[#FFF7EC] hover:text-[#18263F]"
          >
            Sample Review
          </Link>
        </nav>
        <div className="hidden min-h-10 items-center rounded-full border border-[rgba(216,200,179,0.78)] bg-white/72 px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#556174] xl:inline-flex">
          Private audit for small law firms
        </div>
        <Button
          asChild
          variant="brand"
          size="sm"
          className="ml-auto h-11 shrink-0 px-4 text-[13px] md:ml-0 md:h-10 md:px-5"
        >
          <Link href="/request-audit">
            <span>Free Audit</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
