# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for SyncWorkflow, a tradeshow registration system company. The app features interactive prize wheel components, animated hero sections, and Supabase authentication.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Authentication**: Supabase (configured in `/src/lib/supabase.ts`)
- **Styling**: Tailwind CSS with custom CSS variables
- **Animations**: Custom CSS animations for prize wheels and hero sections
- **Prize Wheels**: Custom `PrizeWheel` component

### Project Structure
- `/src/app/` - App Router pages (layout.tsx contains global layout with Navbar, AnnouncementBar, Footer)
- `/src/components/` - Reusable components organized by type:
  - `auth/` - Authentication forms (SignInForm, SignUpForm)
  - `layout/` - Layout components (Navbar, Footer, AnnouncementBar)
  - `sections/` - Page sections (HeroSection with complex animations, ServicesSection, etc.)
  - `ui/` - Base UI components
- `/src/lib/` - Utilities and configurations
- `/src/styles/` - Custom CSS files (wheel.css for prize wheel styling)

### Key Components

**HeroSection** (`/src/components/sections/HeroSection.tsx`):
- Complex animated demo showing form completion, verification, and prize wheel
- Uses useEffect with setTimeout arrays for sequential animations
- Features both tablet and phone device mockups
- Includes interactive prize wheel using the custom `PrizeWheel` component

**PrizeWheel** (`/src/components/PrizeWheel.tsx`):
- Custom canvas-based prize wheel implementation
- Configurable segments, colors, animation durations
- Supports auto-spin and manual control

### Authentication
- Supabase client configured with environment variables
- Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Auth forms handle sign-in/sign-up with error states

### Styling Approach
- Tailwind CSS with custom CSS variables for brand colors (`--brand-blue`)
- Custom CSS classes for animations (recording-dot, viewfinder-grid, scrolling animations)
- Device mockups with realistic bezels and shadows
- Responsive design with mobile-first approach

### State Management
- Uses React useState and useEffect hooks
- No global state management library
- Component-level state for animations and form handling

## Development Notes

### Environment Setup
Create `.env.local` with Supabase configuration:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Animation Patterns
- Complex animations use arrays of setTimeout with cleanup in useEffect
- Animation states tracked with step-based state machines
- Cleanup functions important to prevent memory leaks

### Component Development
- Use 'use client' directive for components with interactivity
- Follow existing patterns for styling (Tailwind classes, CSS variables)
- Maintain TypeScript interfaces for props