# Laimartx Mama & Baby

Modern responsive e-commerce MVP for a Uganda-based mother, baby, and menstrual care package business.

## Features

- Mobile-first homepage, shop, package detail, cart, checkout, order confirmation, tracking, about, contact, privacy, and terms pages
- Floating WhatsApp support button plus product-level and checkout WhatsApp order summaries
- Local cart and demo order tracking using browser storage
- Admin login placeholder, dashboard, order search/filter, status updates, product add/delete controls, and sales metrics
- Payment placeholders for Mobile Money, Pesapal, Flutterwave, card, and Pay on Delivery
- Sample products, sample orders, and Supabase/PostgreSQL schema
- Brand settings in `lib/brand.ts` and product data in `lib/products.ts`

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase/PostgreSQL
- Vercel-ready project structure

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Update `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_WHATSAPP_NUMBER=256700000000
```

4. Run the app:

```bash
pnpm dev
```

5. Open `http://localhost:3000`.

## Supabase Setup

Create a Supabase project, open the SQL editor, and run `supabase/schema.sql`.

For production, add:

- Supabase Auth for `/admin/login`
- Row Level Security policies for admin-only product/order management
- Supabase Storage bucket for uploaded product images
- Payment webhook tables for Pesapal and Flutterwave confirmations

## Payment Placeholders

`lib/payments.ts` defines the MVP payment intent structure.

- Mobile Money: manual confirmation by admin
- Pay on Delivery: service-area confirmation before dispatch
- Pesapal and Flutterwave: redirect/webhook placeholders ready for provider credentials

## Editing The Store

- Brand name, contact details, WhatsApp number, and delivery note: `lib/brand.ts`
- Categories and sample packages: `lib/products.ts`
- Sample orders and statuses: `lib/orders.ts`
- Colors: `tailwind.config.ts` and `app/globals.css`

## Deployment

Deploy on Vercel, add the same environment variables, and connect Supabase when ready. The app works as an MVP with sample data first, then can be migrated to Supabase-backed reads and writes.

### Vercel Dashboard Deployment

1. Push this folder to a GitHub repository.
2. Open Vercel and choose **Add New Project**.
3. Import the GitHub repository.
4. Keep these project settings:

- Framework Preset: Next.js
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output Directory: `.next`

5. Add the environment variables below in **Settings → Environment Variables**.
6. Deploy the project.

### Vercel CLI Deployment

```bash
pnpm dlx vercel login
pnpm dlx vercel
pnpm dlx vercel --prod
```

For non-interactive CLI deploys, create a Vercel token and run:

```bash
set VERCEL_TOKEN=your-token
pnpm dlx vercel --token %VERCEL_TOKEN%
pnpm dlx vercel --prod --token %VERCEL_TOKEN%
```

On macOS/Linux shells:

```bash
export VERCEL_TOKEN=your-token
pnpm dlx vercel --token "$VERCEL_TOKEN"
pnpm dlx vercel --prod --token "$VERCEL_TOKEN"
```

Add these environment variables in Vercel Project Settings:

```bash
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_WHATSAPP_NUMBER=256700000000
```
