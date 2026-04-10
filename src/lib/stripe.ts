import Stripe from "stripe";

// Lazy — only instantiated when called, not at module load / build time
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-03-31.basil",
    typescript: true,
  });
}

export const MEMBERSHIP_TIERS = [
  {
    id: "community",
    name: "Community Member",
    price: 99,
    priceId: process.env.STRIPE_PRICE_COMMUNITY_MEMBER,
    description: "Perfect for getting started with the chamber",
    features: [
      "Directory listing",
      "Community newsletter",
      "Event invitations",
      "Networking access",
    ],
  },
  {
    id: "standard",
    name: "Standard Business Member",
    price: 250,
    priceId: process.env.STRIPE_PRICE_STANDARD_BUSINESS,
    description: "Full chamber membership for local businesses",
    features: [
      "Everything in Community",
      "Featured business listing",
      "Marketplace storefront access",
      "Social media promotion",
      "1 free event booth per year",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Chamber Partner",
    price: 500,
    priceId: process.env.STRIPE_PRICE_PREMIUM_PARTNER,
    description: "Enhanced visibility and partnership benefits",
    features: [
      "Everything in Standard",
      "Homepage featured placement",
      "Priority listing in directory",
      "Dedicated chamber liaison",
      "2 free event booths per year",
      "Logo on chamber materials",
    ],
  },
  {
    id: "sponsor",
    name: "Sponsor Level",
    price: 1000,
    priceId: process.env.STRIPE_PRICE_SPONSOR,
    description: "Top-tier sponsorship and maximum community impact",
    features: [
      "Everything in Premium",
      "Naming rights for community events",
      "Annual recognition ceremony",
      "Dedicated sponsor page",
      "Custom partnership packages",
      "Tax-deductible contribution",
    ],
  },
];
