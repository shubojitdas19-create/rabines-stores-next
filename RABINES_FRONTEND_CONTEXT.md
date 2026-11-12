RABINES STORES - FRONTEND ARCHITECTURE & AI CONTEXT

CRITICAL DIRECTIVE FOR AI / VERCEL v0: You are acting as an expert Frontend UI/UX Designer and Engineer. Your ONLY job is to design and output modern, premium, highly interactive frontend code (React/Next.js + Tailwind CSS + Framer Motion/Lucide Icons). DO NOT write backend logic, API routes, or database connections. Use static mock data and pure UI states to demonstrate the frontend.

1. BUSINESS PROFILE: "RABINES STORES"

Understand the Client: Rabines Stores (based in Howrah, West Bengal) is a B2B and technical B2C supplier of industrial hardware and CNC (Computer Numerical Control) machine tooling.

What they sell: CNC Tool Holders (e.g., CNMG12), CNC Shaft Jaws, Special Jaws, Boring Bars, Inserts, and industrial lathe accessories.

Target Audience: Machinists, manufacturing factory owners, and heavy-duty lathe operators. They buy based on precise technical specifications, compatibility, and material durability.

Vibe/Tone: High-trust, engineered, precise, heavy-duty, and professional.

2. DESIGN SYSTEM & AESTHETIC DIRECTIVES

Theme: "Machined Steel & Safety Orange." Use deep steel blues/slate grays for backgrounds, carbon black for contrast, and high-visibility safety orange for critical Calls to Action (CTAs). Avoid florid prose or overly soft UI elements.

Corners: Use --radius (0.375rem) for slightly sharper, more precise component corners.

Typography: Modern Sans-Serif for headings/body. Must use Monospace (font-mono) strictly for technical specs, part numbers, SKUs, and exact dimensions to give an "engineered" feel.

Layout & Responsiveness:

Ultra-Wide Support: The UI must not look boxed in on large displays. Use edge-to-edge sections with inner containers spanning up to max-w-[1800px] or 2xl:px-24.

Mobile Excellence: Mobile UI must feel like a native app. Use bottom sheets, smooth hamburger drawers, and sticky bottom bars for CTAs.

Animations: The site must feel alive but professional. Use smooth fade-ups, subtle scaling on product cards, and smooth micro-interactions on buttons.

3. KEY USER EXPERIENCE (UX) FLOWS

Because this is industrial equipment, the buying flow is unique:

Dual Conversion: Every product must have TWO primary actions:

Add to Cart (Standard e-commerce flow for single pieces/retail).

Quote via WhatsApp (For bulk B2B orders. It should grab the current product SKU and open a pre-filled WhatsApp message to 9002156266).

Technical Clarity: Specs matter more than marketing copy. Tool sizing, grades, and compatibility must be front and center in highly readable UI tables. Product cards MUST prioritize exact specifications over descriptions.

4. PROPOSED DIRECTORY STRUCTURE

rabines-stores-next
├── src
│   ├── app
│   │   ├── cart
│   │   ├── checkout
│   │   ├── shop
│   │   │   ├── [slug]       # Product details with robust spec tables
│   │   │   └── page.tsx     # Filterable by Tool Type, Material, and Machine Type
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx         # Homepage featuring Categories, Fast-Moving Spares, and WhatsApp CTA
│   ├── components
│   │   ├── rabines          # Store-specific components (e.g., SpecTable, WhatsAppQuoteBtn)
│   │   └── ui               # Reusable Radix UI components (Button, Input, Table)
│   ├── lib
│   │   └── utils.ts


5. PAGES TO DESIGN

Please generate the components and layouts for the following pages using the rules above:

A. The Homepage

Hero Section: Full-width, high-impact industrial imagery. Big typography, clear CTAs.

Categories Grid: E.g., Turning Tools, Milling Tools, Chuck Jaws.

Fast-Moving Spares: A horizontal scroll/carousel of top products.

Trust Section: Badges for "All India Delivery", "Industrial Grade", "Bulk Pricing".

B. Product Detail Page (PDP)

Image Gallery: Large, clear product images.

Specification Table (SpecTable): A beautiful, high-contrast table showing precise measurements, material, and insert compatibility.

Sticky CTA Bar: On mobile, the "Add to Cart" and "WhatsApp" buttons must stick to the bottom of the screen.

C. Shop / Catalog Page

Sidebar Filters: Filter by Tool Type, Material Grade, and Size.

Product Grid: Responsive grid that looks dense and professional on PC, and clear on mobile.

FINAL REMINDER TO AI: Output clean, modular, highly animated frontend code. Focus entirely on the aesthetic, the CSS, the animations, and the layout. Do NOT write backends.