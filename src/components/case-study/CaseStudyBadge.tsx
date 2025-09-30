'use client';

interface CaseStudyBadgeProps {
  text: string;
}

export default function CaseStudyBadge({ text }: CaseStudyBadgeProps) {
  return (
    <div className="inline-flex items-center px-4 py-2 bg-[#03c4eb]/10 text-[#03c4eb] rounded-full text-sm font-semibold mb-6">
      <span className="w-2 h-2 bg-[#03c4eb] rounded-full mr-2"></span>
      {text}
    </div>
  );
}
