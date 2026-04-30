# SAKIB.STUDIO

A premium frontend engineer portfolio built with cutting-edge technologies to showcase immersive 3D experiences, modern UI systems, and interactive web applications.

## Features

- ✨ **3D Hero Scene** - Interactive particle effects and rotating 3D objects using Three.js and React Three Fiber
- 🎨 **Modern UI** - Clean, glassmorphic design with Tailwind CSS and smooth animations
- 🚀 **Smooth Scrolling** - Lenis-powered smooth scroll for enhanced user experience
- ⚡ **Performance** - Next.js 16 with Turbopack for lightning-fast builds
- 🎭 **Animations** - GSAP and Framer Motion for fluid, professional animations
- 📱 **Responsive** - Fully responsive design for all screen sizes
- 🔗 **API Route** - SOS emergency endpoint for rapid response features

## Tech Stack

- **Framework:** Next.js 16.2.4
- **UI Library:** React 19.2.4
- **3D Graphics:** Three.js, @react-three/fiber, @react-three/drei
- **Styling:** Tailwind CSS 4, PostCSS
- **Animations:** GSAP 3.15, Framer Motion 12.38, Lenis 1.3
- **Icons:** Lucide React, React Icons
- **TypeScript:** Full type safety

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd sakib-studio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── api/
│       └── sos/route.ts   # Emergency API endpoint
├── components/            # React components
│   ├── Hero.tsx          # Hero section with 3D scene
│   ├── HeroScene.tsx     # Three.js 3D scene
│   ├── Navbar.tsx        # Navigation bar with scroll effects
│   ├── Projects.tsx      # Portfolio projects showcase
│   ├── Skills.tsx        # Tech stack display
│   ├── About.tsx         # About section
│   ├── Contact.tsx       # Contact CTA
│   └── logo/
│       └── IconLogo.tsx  # Branding logo
├── styles/               # Global styles
│   ├── globals.css       # Main stylesheet
│   ├── theme.css         # Design tokens
│   ├── base.css          # Base utilities
│   ├── components.css    # Component styles
│   └── animations.css    # Animation definitions
├── gsap/                 # GSAP utilities
│   ├── gsap.ts          # GSAP setup with plugins
│   └── useLenis.ts      # Lenis smooth scroll hook
├── hooks/                # React hooks
├── lib/                  # Utility functions
├── config/               # Configuration files
├── store/                # State management
└── types/                # TypeScript types
```

## Key Features

### Scroll-Triggered Navbar
The navbar becomes visible with blur and border effects as you scroll down the page, creating a sophisticated progressive reveal effect.

### 3D Hero Scene
Interactive Three.js scene with:
- Animated particle system
- Rotating icosahedron core object
- Auto-rotating orbit controls
- Pointer-events-none to preserve page scrolling

### Smooth Scrolling
Integrated Lenis for physics-based smooth scrolling that works seamlessly with the Lenis scroll hook and GSAP ScrollTrigger.

### Responsive Design
Mobile-first approach with Tailwind breakpoints ensuring perfect display on all devices.

## Development

### Code Quality
- ESLint configured for TypeScript and React
- Type-safe with TypeScript 5
- Tailwind CSS for utility-first styling

### Building
```bash
npm run build
```

The build output is optimized and ready for production deployment.

## Performance Optimization

- Next.js 16 with Turbopack for fast builds
- Image optimization through Next.js Image component
- Code splitting and lazy loading
- CSS minification and optimization

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

This project is part of SAKIB.STUDIO. All rights reserved.

## Contact

For inquiries or collaborations, visit [sakib.studio](https://sakib.studio) or reach out via email.
