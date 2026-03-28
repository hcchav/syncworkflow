import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="eyebrow">Privacy</p>
      <h1 className="mt-4 font-serif text-5xl text-[hsl(221,45%,18%)]">Privacy policy</h1>
      <div className="prose prose-neutral mt-8 max-w-none text-[hsl(221,16%,34%)]">
        <p>
          SyncWorkflow uses submitted information to review audit requests, deliver private audit
          links, and understand funnel performance.
        </p>
        <p>
          Personalized review pages are intended to be private-style pages. They are not listed in
          public navigation and are marked noindex.
        </p>
        <p>
          If you submit an email address to receive a full audit, that address may be used to send
          the requested audit and to reply to your request.
        </p>
      </div>
    </main>
  );
}
