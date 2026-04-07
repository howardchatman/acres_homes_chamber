import Link from "next/link";
import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chamber Membership",
  description:
    "Join the AcresHOME Chamber and gain visibility, networking, marketplace access, and community support for your business in Acres Homes, Houston TX.",
};

const tiers = [
  {
    id: "community",
    name: "Community Member",
    price: 99,
    period: "/ year",
    description: "Perfect for getting started with the chamber community.",
    features: [
      "Chamber directory listing",
      "Community newsletter",
      "Event invitations",
      "Networking access",
    ],
    cta: "Join as Community Member",
    popular: false,
  },
  {
    id: "standard",
    name: "Standard Business Member",
    price: 250,
    period: "/ year",
    description: "Full chamber membership for local businesses.",
    features: [
      "Everything in Community",
      "Featured business listing",
      "Marketplace storefront access",
      "Social media promotion",
      "1 free event booth per year",
      "Member dashboard access",
    ],
    cta: "Join as Standard Member",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Chamber Partner",
    price: 500,
    period: "/ year",
    description: "Enhanced visibility and partnership benefits.",
    features: [
      "Everything in Standard",
      "Homepage featured placement",
      "Priority directory listing",
      "Dedicated chamber liaison",
      "2 free event booths per year",
      "Logo on chamber materials",
    ],
    cta: "Join as Premium Partner",
    popular: false,
  },
  {
    id: "sponsor",
    name: "Sponsor Level",
    price: 1000,
    period: "/ year",
    description: "Top-tier sponsorship for maximum community impact.",
    features: [
      "Everything in Premium",
      "Naming rights for community events",
      "Annual recognition ceremony",
      "Dedicated sponsor page",
      "Custom partnership packages",
      "Tax-deductible contribution",
    ],
    cta: "Become a Sponsor",
    popular: false,
  },
];

const benefits = [
  { title: "Business Visibility", description: "Your business listed in our directory and promoted through chamber channels." },
  { title: "Marketplace Storefront", description: "Create a storefront page and list products or services in the community marketplace." },
  { title: "Networking", description: "Access exclusive member mixers, forums, and business development sessions." },
  { title: "Event Participation", description: "Participate in chamber events, festivals, and community programming." },
  { title: "Farmers Market Priority", description: "Priority vendor access to the Acres Homes Farmers Market." },
  { title: "Facility Access", description: "Discounted rates on chamber facility bookings for your events." },
  { title: "Community Credibility", description: "Display the AcresHOME Chamber seal on your marketing materials." },
  { title: "Advocacy Support", description: "The chamber advocates for your business interests in the community." },
];

export default function MembershipPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Chamber Membership</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Join the <span className="text-[#c41230]">AcresHOME</span> Chamber
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            Connect your business to a thriving network of local entrepreneurs, community programs, and customers in Acres Homes.
          </p>
          <div className="mt-6">
            <Button asChild variant="red" size="lg">
              <Link href="/membership/apply">Apply for Membership</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Why Join the Chamber?</h2>
            <p className="text-[#6b6560] max-w-xl mx-auto">
              Chamber membership puts your business in front of the community and connects you to resources that help you grow.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={benefit.title} className="flex items-start gap-3 p-4 rounded-xl bg-[#f9f6f2] border border-[#e0d8ce]">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${i % 2 === 0 ? "bg-[#c41230]" : "bg-[#1a1a1a]"}`}>
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a1a] text-sm mb-1">{benefit.title}</h3>
                  <p className="text-[#6b6560] text-xs leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Membership Tiers</h2>
            <p className="text-[#6b6560]">Choose the level of membership that fits your business and goals.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <Card key={tier.id} className={`relative hover:shadow-xl transition-shadow ${tier.popular ? "border-2 border-[#c41230]" : ""}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c41230] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-3 w-3" /> Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="pt-2">
                    <span className="text-3xl font-bold text-[#1a1a1a]">${tier.price}</span>
                    <span className="text-[#6b6560] text-sm">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-[#3d3d3d]">
                        <CheckCircle2 className="h-4 w-4 text-[#c41230] shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={tier.popular ? "red" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    <Link href={`/membership/apply?tier=${tier.id}`}>{tier.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Who can join the chamber?", a: "Any business, vendor, or organization operating in or serving the Acres Homes community is welcome to apply for membership." },
              { q: "How long does the application take?", a: "Applications are reviewed within 5-7 business days. You will receive an email notification once your application is approved." },
              { q: "Is my payment secure?", a: "Yes. All payments are processed securely through Stripe. We do not store your payment details." },
              { q: "Can I upgrade my membership tier?", a: "Absolutely. You can upgrade your membership at any time. Contact us or use your member dashboard to request an upgrade." },
              { q: "Do I need a physical storefront?", a: "No. Home-based businesses, freelancers, and service providers are all welcome to join." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-[#e0d8ce] p-6 bg-[#f9f6f2]">
                <h3 className="font-bold text-[#1a1a1a] mb-2">{faq.q}</h3>
                <p className="text-[#6b6560] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-[#c41230] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-white/85 text-lg mb-8">
            Submit your application today and get your business connected to the Acres Homes community.
          </p>
          <Button asChild variant="white" size="xl">
            <Link href="/membership/apply">Start Your Application</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
