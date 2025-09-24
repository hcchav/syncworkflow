import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/forms/ContactForm';
import { Check, Code, Palette, Shield, Zap, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Demo Page - All P0 Features',
  description: 'Demonstration of all P0 project setup features including Tailwind, shadcn/ui, forms, and brand colors.',
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-width py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brand-dark">
              P0 Setup Demo
            </h1>
            <Button variant="brand">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="container-width section-padding">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mb-6">
            Complete P0 Project Setup
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Demonstrating Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, 
            ESLint, Prettier, Husky, and all required dependencies working together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="brand" size="lg">
              Primary Action
            </Button>
            <Button variant="brandSecondary" size="lg">
              Secondary Action
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </section>

        {/* Brand Colors Showcase */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            Brand Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-brand-dark rounded-lg mx-auto mb-4"></div>
              <h3 className="font-semibold text-brand-dark">Dark</h3>
              <p className="text-sm text-gray-600">#171717</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-brand-white border-2 border-gray-200 rounded-lg mx-auto mb-4"></div>
              <h3 className="font-semibold text-brand-dark">White</h3>
              <p className="text-sm text-gray-600">#ffffff</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-lg mx-auto mb-4"></div>
              <h3 className="font-semibold text-brand-dark">Primary</h3>
              <p className="text-sm text-gray-600">#03c4eb</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-brand-secondary rounded-lg mx-auto mb-4"></div>
              <h3 className="font-semibold text-brand-dark">Secondary</h3>
              <p className="text-sm text-gray-600">#FFDC35</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-brand-light rounded-lg mx-auto mb-4"></div>
              <h3 className="font-semibold text-brand-dark">Light</h3>
              <p className="text-sm text-gray-600">#f4f4f4</p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            P0 Features Implemented
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card card-hover p-6">
              <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-2">
                Next.js 15 + TypeScript
              </h3>
              <p className="text-gray-600">
                Latest Next.js with App Router and full TypeScript support.
              </p>
            </div>

            <div className="card card-hover p-6">
              <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-2">
                Tailwind + shadcn/ui
              </h3>
              <p className="text-gray-600">
                Configured with brand colors and component library.
              </p>
            </div>

            <div className="card card-hover p-6">
              <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-2">
                ESLint + Prettier
              </h3>
              <p className="text-gray-600">
                Code quality and formatting with pre-commit hooks.
              </p>
            </div>

            <div className="card card-hover p-6">
              <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-2">
                Husky Pre-commit
              </h3>
              <p className="text-gray-600">
                Automated linting and type checking before commits.
              </p>
            </div>

            <div className="card card-hover p-6">
              <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-2">
                Environment Variables
              </h3>
              <p className="text-gray-600">
                Scaffold for Analytics, Resend, and Supabase keys.
              </p>
            </div>

            <div className="card card-hover p-6">
              <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-dark mb-2">
                Form Validation
              </h3>
              <p className="text-gray-600">
                React Hook Form + Zod for type-safe validation.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Demo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            Form Validation Demo
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Try submitting the form with invalid data to see Zod validation in action.
          </p>
          <ContactForm />
        </section>

        {/* Gradient Text Demo */}
        <section className="text-center">
          <h2 className="text-gradient text-4xl font-bold mb-4">
            Gradient Text Effect
          </h2>
          <p className="text-gray-600 mb-8">
            Custom utility classes for brand-consistent styling.
          </p>
          <div className="bg-brand-gradient text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Brand Gradient Background</h3>
            <p className="text-gray-200">
              All brand colors and utilities are working perfectly!
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white mt-16">
        <div className="container-width py-8">
          <div className="text-center">
            <p className="text-gray-300">
              P0 Project Setup Complete - All features implemented and tested.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
