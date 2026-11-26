# Firefox Concept Website

A responsive Firefox and Mozilla landing-page concept that combines the nostalgia of early web browsing with a contemporary visual style. Built with Next.js, TypeScript, and Tailwind CSS, the project translates desktop and mobile designs into an interactive frontend experience.

## Overview

The page follows a story from Firefox’s beginnings to an AI-inspired browsing concept. It brings together browser features, press coverage, a visual history timeline, community participation, and a newsletter interface.

This is an independent design concept, not an official Mozilla product or website. The AI section presents a design exploration rather than a working AI service.

## Features

- **Responsive layout:** desktop navigation, a mobile menu, and layouts adapted for narrow screens.
- **Animated homepage entrance:** the navbar fades in, the gradient appears, the vintage computer slides upward, and the text and actions follow in sequence.
- **Feature carousel:** supplied SVG icons, staggered hover interactions, keyboard focus support, and equal-height mobile cards with neighboring cards visible.
- **Press coverage strip:** consistent logo color and opacity, arranged in a two-column grid on mobile.
- **Browser history carousel:** four milestones—2002, 2004, 2011, and 2017—with swipe navigation, keyboard controls, and synchronized desktop timeline indicators.
- **Community section:** volunteer and donation cards with the original half-circle gradient background.
- **Scroll reveals:** components fade into view with staggered timing. Reduced-motion preferences are respected.
- **Frontend forms:** labeled inputs, browser validation, and clear preview messages for the AI prompt and newsletter forms.

## Technology

| Area | Tools |
| --- | --- |
| Framework | Next.js App Router and React |
| Language | TypeScript |
| Styling | Tailwind CSS and custom responsive CSS |
| Typography | Poppins from Google Fonts via `next/font/google` |
| Motion | CSS animations, IntersectionObserver, and requestAnimationFrame |
| Output | Static export |

## Getting started

Requires Node.js 20.9 or later and npm.

```sh
git clone https://github.com/rifkyudhira/firefox-concept-website.git
cd firefox-concept-website
npm ci
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

To use another port:

```sh
npm run dev -- --port 3001
```

### Validation and build

```sh
npm run typecheck
npm run build
```

The production build creates a static site in `out/`, ready for a static hosting provider. Google Fonts access is needed when the font is first fetched during development or a build.

## Project structure

```text
src/app/
  layout.tsx          Page metadata and typography
  page.tsx            Page sections and interactive behavior
  globals.css         Design tokens, responsive layouts, and motion
public/
  icons/              Logos and interface icons used by the website
  images/             Illustrations, backgrounds, and texture assets
Icons/                Original supplied SVG assets
Images/               Original supplied images and design references
```

The original desktop and mobile references are available in `Images/desktop.jpg` and `Images/mobile.jpg`.

## Visual direction

The design pairs a light canvas with deep purple sections, warm orange actions, soft gradients, and restrained grain. Typography and artwork preserve a familiar Mozilla-inspired character while the layouts and motion give the page a contemporary feel.

| Color | Hex |
| --- | --- |
| Canvas | `#F6F4F8` |
| Primary text | `#110217` |
| Purple | `#4C1662` |
| Lavender | `#BB94EC` |
| Orange | `#FFB347` |
| Dark gradient | `#280D61` → `#1D1234` |

## Project status

The website is a frontend concept. Navigation, carousels, responsive layouts, and animations are implemented. Download, donation, volunteer, and resource actions link to external destinations.

The AI and newsletter forms do not send or store submissions; they need backend integrations to become functional services. The AI illustration currently uses a crop of the supplied desktop reference.

Mozilla, Firefox, and the featured publication names and logos belong to their respective owners. Their appearance here is part of the design concept.

## Author

Designed and developed by [Maulana Rifky Yudhira](https://github.com/rifkyudhira).
