import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(216,200,179,0.82)] bg-[rgba(255,253,249,0.72)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-[#5A6576] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-serif text-[1.35rem] leading-none tracking-[-0.03em] text-[#18263F]">
            SyncWorkflow
          </p>
          <p>Free audits and ongoing website, intake, and workflow support for small law firms.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-[#18263F]">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-[#18263F]">
            Terms
          </Link>
          <Link href="/sample-review" className="hover:text-[#18263F]">
            Sample Review
          </Link>
          <Link href="/request-audit" className="hover:text-[#18263F]">
            Get A Free Audit
          </Link>
        </div>
      </div>
    </footer>
  );
}
