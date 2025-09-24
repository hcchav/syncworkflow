# SyncWorkflow - Next.js Project

A complete P0 project setup with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, and comprehensive tooling.

## 🚀 P0 Features Implemented

### ✅ Core Setup
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS v3** with custom brand colors
- **shadcn/ui** component library integration
- **PostCSS** configuration

### ✅ Brand Colors
- `#171717` - Dark
- `#ffffff` - White  
- `#03c4eb` - Primary (Blue)
- `#FFDC35` - Secondary (Yellow)
- `#f4f4f4` - Light Gray

### ✅ Code Quality & Tooling
- **ESLint** with TypeScript rules
- **Prettier** code formatting
- **Husky** pre-commit hooks
- **lint-staged** for staged file processing
- Type checking on commit

### ✅ Dependencies Installed
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `next-seo` - SEO optimization
- `@vercel/analytics` - Analytics integration
- `@hookform/resolvers` - Form validation resolvers

### ✅ Environment Variables Scaffold
- `ANALYTICS_ID` - Analytics configuration
- `RESEND_API_KEY` - Email service
- `SUPABASE_*` - Database keys
- `DATABASE_URL` - Database connection

## 🛠 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp env.example .env.local
# Edit .env.local with your actual values
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open your browser:**
- Main app: [http://localhost:3001](http://localhost:3001)
- Demo page: [http://localhost:3001/demo](http://localhost:3001/demo)
- Boat show: [http://localhost:3001/boat-show](http://localhost:3001/boat-show)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── demo/              # P0 features demo
│   ├── boat-show/         # Landing page
│   ├── globals.css        # Tailwind + shadcn/ui styles
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   └── templates/         # Page templates
└── lib/
    ├── utils.ts           # Utility functions
    └── supabase.ts        # Supabase client
```

## 🎨 Design System

### Brand Colors
```css
.bg-brand-dark      /* #171717 */
.bg-brand-white     /* #ffffff */
.bg-brand-primary   /* #03c4eb */
.bg-brand-secondary /* #FFDC35 */
.bg-brand-light     /* #f4f4f4 */
```

### Utility Classes
```css
.card              /* White card with shadow */
.card-hover        /* Hover effects */
.btn-primary       /* Primary button */
.btn-secondary     /* Secondary button */
.section-padding   /* Consistent spacing */
.container-width   /* Max-width container */
.text-gradient     /* Brand gradient text */
.bg-brand-gradient /* Brand gradient background */
```
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
