export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-brand-dark mb-8">
          Tailwind CSS Test Page
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Test Card 1 */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-brand-primary mb-4">
              Brand Primary Color
            </h2>
            <p className="text-gray-600 mb-4">
              This card tests the brand-primary color and card utility class.
            </p>
            <button className="btn-primary">
              Primary Button
            </button>
          </div>
          
          {/* Test Card 2 */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-brand-secondary mb-4">
              Brand Secondary Color
            </h2>
            <p className="text-gray-600 mb-4">
              This card tests the brand-secondary color.
            </p>
            <button className="btn-secondary">
              Secondary Button
            </button>
          </div>
          
          {/* Test Card 3 */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-brand-dark mb-4">
              Brand Dark Color
            </h2>
            <p className="text-gray-600 mb-4">
              This card tests the brand-dark color and hover effects.
            </p>
            <button className="btn-outline">
              Outline Button
            </button>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-brand-gradient text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Brand Gradient Background
          </h2>
          <p className="text-gray-200">
            This section tests the brand gradient background utility class.
          </p>
        </div>
        
        <div className="mt-8 text-center">
          <h2 className="text-gradient text-3xl font-bold mb-4">
            Gradient Text
          </h2>
          <p className="text-gray-600">
            This tests the gradient text utility class.
          </p>
        </div>
      </div>
    </div>
  );
}
