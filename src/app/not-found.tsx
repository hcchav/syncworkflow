import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="eyebrow">Not found</p>
      <h1 className="mt-4 font-serif text-5xl text-[hsl(221,45%,18%)]">This page is not available.</h1>
      <p className="mt-5 text-lg leading-8 text-[hsl(221,16%,34%)]">
        The link may be expired, incorrect, or no longer active.
      </p>
      <div className="mt-8">
        <Button asChild variant="brand" size="lg">
          <Link href="/">Back to homepage</Link>
        </Button>
      </div>
    </main>
  );
}
