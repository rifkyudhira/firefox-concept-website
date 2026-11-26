# Firefox Concept Website

Responsive frontend based on the supplied desktop (1920px) and mobile (393px) designs. Built with Next.js App Router, TypeScript, Tailwind CSS, and Poppins from Google Fonts through `next/font/google`.

## Run locally

Requires Node.js 20.9 or later.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000.

```sh
npm run typecheck
npm run build
```

The build generates a static website in `out/`.

## Project structure

- `src/app/page.tsx`: page sections, navigation, feature carousel, history timeline, frontend form interactions.
- `src/app/globals.css`: Tailwind import, design tokens, section styling, mobile breakpoint at 767px.
- `src/app/layout.tsx`: metadata and Google Fonts setup.
- `public/images` and `public/icons`: supplied design assets.

## Design notes

Colors: canvas `#F6F4F8`, text `#110217`, purple `#4C1662`, lavender `#BB94EC`, orange `#FFB347`, section gradient `#280D61` → `#1D1234`.

The standalone AI illustration was absent, so `ai-illustration.jpg` is a crop from the supplied desktop reference. Replace it with an original export for the cleanest production asset. All other illustrations and logos use supplied individual assets.

The mobile menu, horizontal feature carousel, and four-year history timeline work locally. Download, donation, volunteer, and resource links open their relevant external destinations. Newsletter and AI forms validate inputs and explicitly show preview-only messages; they do not send or store submissions. Connect real services before production use. The AI copy reproduces the supplied concept and should receive product review before publication.

Setup follows the official Next.js installation guide: https://nextjs.org/docs/app/getting-started/installation and Tailwind CSS guide: https://tailwindcss.com/docs/installation/framework-guides/nextjs.

## Texture and motion

`overlay-grain.png` is the supplied Figma texture (its alpha already contains the 30% fill). A 0.35 overlay multiplier gives a restrained result without enlarging the grain. The hero uses the clean SVG gradient; the AI backdrop is softened separately from the foreground artwork.

Motion uses 420ms eased controls, 650ms card/timeline transitions, a 780ms eased carousel, and 850ms one-time viewport fades staggered by 90ms. `IntersectionObserver` disconnects from revealed components. Reduced-motion preferences disable animation and keep content visible; manual scrolling cancels carousel animation. Keyboard focus exposes feature details.

## Masthead sizing

Navbar + hero fill `min(100svh, 1128px)`. The 1128px cap follows the supplied desktop design so an expanded CSS viewport (such as browser zoom-out) does not stretch the masthead indefinitely. Desktop navbar height is 96px; mobile is 76px. Below 540px viewport height, the hero grows naturally to keep controls accessible. The artwork scales with the remaining hero area using container height units.

The mobile dropdown uses `display: none` on desktop to avoid affecting navbar alignment. Hero grain is overlay-composited on a white-backed gradient, faded at the upper edge, then multiplied onto the page canvas. AI grain uses a saturation mask so neutral areas stay clean. The community section uses the supplied half-circle gradient without added processing, bottom-aligned at its original aspect ratio on mobile.

## Responsive interactions

- Equal-height mobile feature cards with 64px icons and centered scroll snapping.
- Two-by-two mobile press-logo grid with matching color and opacity.
- Swipeable browser-history carousel; desktop timeline dots stay synchronized, with dots hidden on mobile.
- Vertical gestures over either carousel scroll the page.
- Staggered homepage entrance: navbar, gradient opacity, computer slide-up, then text and actions. Reduced-motion preferences are respected.
