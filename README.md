# RENOX One — Premium Product Website

## Project Overview
This project is a premium frontend product website concept for the Renox One smartphone. The website provides an immersive, cinematic presentation featuring a scroll-driven video storytelling experience, interactive 3D-style gallery, real-time configurator, cart experience, and dynamic WhatsApp ordering flow. 

**Note**: This is a **frontend-only** project intended for demonstration and UI/UX presentation.

## Live Demo
Live demo: [Add deployment URL here]

## Key Features
- **Cinematic Scroll-Scrubbed Hero Video**: High-performance video tied to scroll position via GSAP.
- **Responsive Product Gallery**: Premium, dark-mode visual storytelling of product specifications.
- **Real-Time Configurator**: Select storage configurations and premium add-ons with dynamic price updates.
- **Cart Experience**: Persistent client-side cart leveraging local storage.
- **Dynamic WhatsApp Order Flow**: Client-side parsing that builds a prefilled order message for seamless customer ordering via WhatsApp.
- **Accessibility & Performance**: Uses native HTML5 elements combined with optimized animations and strict Next.js Image handling overrides where necessary.

## Technology Stack
- **Framework**: Next.js 16.2.10 (App Router)
- **Library**: React 19.2
- **Styling**: TailwindCSS v4 with PostCSS
- **Animations**: GSAP (ScrollTrigger) & Framer Motion
- **Icons**: Lucide React
- **Validation**: Zod & React Hook Form
- **State Management**: Zustand
- **Language**: TypeScript

## Project Structure
```text
├── public/                 # Static media and product assets
│   ├── gallery-*.png       # Product gallery photos
│   └── renox-one-hero-scroll.mp4 # Cinematic hero video
├── src/
│   ├── app/                # Next.js App Router pages (cart, order, policies)
│   ├── components/         # Reusable React components (hero, product, layout)
│   ├── data/               # Product configurations and add-on data
│   └── lib/                # Shared utilities (WhatsApp logic, price formatting)
├── .gitignore              # Git ignore configuration
├── eslint.config.mjs       # ESLint rules
├── next.config.ts          # Next.js build configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm (or yarn/pnpm)

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/daud-hayat-8183/renox-one-website.git
cd renox-one-website
npm install
```

## Scripts
- `npm run dev`: Starts the Next.js development server at `http://localhost:3000`.
- `npm run build`: Creates an optimized production build of the application.
- `npm run start`: Starts the application in production mode (requires a successful build first).
- `npm run lint`: Runs ESLint to check for code quality and errors.

## Product Configuration
The website offers the following official Renox One configurations:
- **12GB + 256GB** — Rs. 129,999
- **16GB + 512GB** — Rs. 149,999

### Add-ons
- Renox Acoustic Pods
- Renox Shield Case
- 65W SuperCharge Adapter

## WhatsApp Ordering
The checkout process utilizes a purely frontend-driven WhatsApp order flow. It constructs a secure, prefilled message string containing the user's selected variant, color, add-ons, and total price. This string is then encoded via `encodeURIComponent()` and opens in a new tab directing the user to the official WhatsApp contact.
- **No Backend Required**: Zero external APIs or databases are queried.
- **No Payment Processing**: This project does not contain a payment gateway or handle sensitive financial data.

## Assets
All product imagery and hero media are stored locally within the `public/` directory. All assets are highly optimized and fall safely below GitHub's file-size limits. 

## Security and Privacy
- This project is **frontend-only** and does not include a backend database, payment gateway, or authentication system.
- All checkout and configurator logic remains locally in the user's browser.
- **Never commit `.env` files, API keys, tokens, or private credentials.** 

## Deployment
Uploading this repository to GitHub publishes the source code but does not automatically deploy a live website. Given the Next.js foundation, deploying to a service like [Vercel](https://vercel.com/) is recommended for out-of-the-box support for the Next.js App Router and edge caching. 

## Disclaimer
Renox One pricing, availability, hardware specifications, warranty terms, and product claims are concept/demo content unless commercially verified. The technical specifications and visual renders do not imply a certified or released consumer product.

## License
All rights reserved.

## Contact
For product inquiries, you can reach out via:
- WhatsApp: +92 329 5129250
- Instagram: @daud_hayat_
- Email: daudhayat51@gmail.com
