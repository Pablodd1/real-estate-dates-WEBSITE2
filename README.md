# Real Estate Dates

A dating app landing page for real estate professionals. Built with React, TypeScript, Tailwind CSS, and GSAP animations.

## Live Demo

**[https://loqwcpch24v4y.kimi.show](https://loqwcpch24v4y.kimi.show)**

## Features

- **Gold particle system** — Canvas-based animated gold dust
- **Custom cursor** — Gold ring cursor with hover expansion (desktop)
- **Text decode animation** — Matrix-style character decode for the title
- **Draggable profile cards** — Swipe left/right with GSAP Draggable physics
- **3D tilt cards** — Mouse-follow perspective tilt on feature cards
- **Horizontal scroll pinning** — Pinned scroll section for "How It Works"
- **GSAP scroll animations** — Every section animates on scroll
- **Fully responsive** — Mobile, tablet, and desktop optimized

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- GSAP (animations + ScrollTrigger + Draggable)
- Lenis (smooth scroll)
- Lucide React (icons)

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
  components/
    Logo.tsx           # House-heart logo icon
    Navigation.tsx     # Fixed nav with mobile hamburger menu
    Footer.tsx         # Minimal footer
    GoldParticles.tsx  # Canvas particle system
    CustomCursor.tsx   # Custom gold cursor
    TextDecode.tsx     # Character decode animation
  sections/
    HeroSection.tsx      # Splash/login-style hero
    DiscoverSection.tsx  # Swipeable profile cards
    HowItWorksSection.tsx # 8-step horizontal/vertical timeline
    FeaturesSection.tsx   # 8 feature cards with 3D tilt
    DownloadSection.tsx   # App download CTA with phone mockup
```

## License

MIT
# Deployed to GitHub Pages
