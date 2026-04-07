# AcresHOME Chamber Platform

**AcresHOME Chamber for Business and Economic Development, Inc.**
*"A Community Based Business & Economic Development Corporation"*

Full-stack community and business platform for the AcresHOME Chamber in Acres Homes, Houston TX.

**Live site:** chamber.chatmaninc.com  
**Contact:** info@acreshomechamber.com | (832) 433-7916 | 6112 Wheatley St., Houston TX 77091

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), TypeScript |
| Styling | Tailwind CSS v4, Radix UI |
| Backend | Supabase (Postgres + Auth + Storage) |
| Payments | Stripe Checkout |
| Email | Resend |
| Deployment | Vercel |

---

## Quick Start

### 1. Clone

```bash
git clone https://github.com/howardchatman/acres_homes_chamber.git
cd acres_homes_chamber
npm install
```

### 2. Environment

```bash
cp .env.local.example .env.local
# Fill in your Supabase, Stripe, and Resend keys
```

### 3. Supabase Setup

Run in your Supabase SQL Editor (in order):
1. `supabase/schema.sql` - creates all tables + RLS policies
2. `supabase/seed.sql` - adds sample events, classes, market dates

Set admin user:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
```

Auth redirect URLs in Supabase dashboard:
- Site URL: `https://chamber.chatmaninc.com`
- Redirect: `https://chamber.chatmaninc.com/auth/callback`

### 4. Stripe Setup

Create products in Stripe dashboard for membership tiers, add price IDs to `.env.local`.
Set webhook endpoint: `https://chamber.chatmaninc.com/api/stripe/webhook`

### 5. Run

```bash
npm run dev
# http://localhost:3000
```

---

## Project Structure

```
src/app/
  page.tsx                    Homepage
  about/                      About page
  contact/                    Contact page  
  membership/apply/           Membership application
  farmers-market/apply/       Vendor application
  marketplace/                Marketplace (Phase 2)
  programs/[slug]/register/   Class registration
  facility-request/           Facility booking
  events/                     Events listing
  watch-live/                 Live stream
  podcast/                    Podcast hub
  donate/                     Donations (Stripe)
  login/                      Auth
  dashboard/admin/            Admin dashboard
  dashboard/member/           Member dashboard
  api/                        Form handlers + Stripe

src/components/
  layout/navbar.tsx
  layout/footer.tsx
  ui/                         Button, Card, Input, etc.

src/lib/
  supabase/client.ts          Browser Supabase client
  supabase/server.ts          Server + admin client
  stripe.ts                   Stripe config + tier definitions

supabase/
  schema.sql                  All tables + RLS
  seed.sql                    Sample data
```

---

## Build Phases

### Phase 1 - MVP (Done)
- Homepage, About, Contact
- Membership signup + application
- Farmers Market vendor application
- Programs + class registration
- Facility request form
- Events listing
- Watch Live (embed-ready)
- Podcast (coming soon)
- Donations via Stripe
- Login / Auth (Supabase)
- Member dashboard
- Admin dashboard (all modules)
- API routes for all forms
- Supabase schema + RLS + seed data

### Phase 2 - Marketplace
- Vendor storefronts
- Product listings
- Cart + Stripe checkout
- Order management
- Vendor dashboard
- Member directory

### Phase 3 - Media & Growth
- Podcast episode management
- Event video archives
- Sponsor portal
- Email automation (Resend)
- Advanced reporting

---

## Deploy to Vercel

1. Push to GitHub (main branch)
2. Connect repo at vercel.com
3. Add all env vars in Vercel project settings
4. Set domain: `chamber.chatmaninc.com`

Vercel auto-deploys on every push to main.
