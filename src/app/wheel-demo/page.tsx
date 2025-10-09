import Wheel from '@/components/wheel/Wheel';

const segments = [
  { label: 'Coffee', color: '#FFDC35' },
  { label: 'Sticker', color: '#03c4eb' },
  { label: '10% Off', color: '#f4f4f4' },
  { label: 'Try Again', color: '#ffffff' },
  { label: 'T-Shirt', color: '#ff6b6b' },
  { label: 'Mug', color: '#4ecdc4' },
  { label: 'Gift Card', color: '#45b7d1' },
  { label: 'Free Spin', color: '#96ceb4' },
];

export default function WheelDemoPage() {
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <h1 className="text-3xl font-semibold">Wheel Demo</h1>
      <Wheel skin="mahoney" segments={segments} />
    </div>
  );
}
