import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="eyebrow">Terms</p>
      <h1 className="mt-4 font-serif text-5xl text-[hsl(221,45%,18%)]">Terms of use</h1>
      <div className="prose prose-neutral mt-8 max-w-none text-[hsl(221,16%,34%)]">
        <p>
          SyncWorkflow provides website and intake audits plus related implementation services.
        </p>
        <p>
          Materials shared through private review links are for the intended recipient and may be
          updated or removed without notice.
        </p>
        <p>
          Any recommendations are based on publicly visible workflows unless otherwise stated.
        </p>
      </div>
    </main>
  );
}
