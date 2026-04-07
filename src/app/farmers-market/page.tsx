import Link from "next/link";
import { Leaf, MapPin, Clock, CalendarDays, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farmers Market",
  description:
    "Visit the Acres Homes Farmers Market every Saturday at 6112 Wheatley St., Houston TX. Fresh produce, local goods, and community connection.",
};

const vendorCategories = [
  "Fresh Produce & Vegetables", "Fruits & Berries", "Herbs & Plants",
  "Baked Goods & Pastries", "Prepared Foods", "Honey & Preserves",
  "Handmade Crafts", "Health & Wellness Products", "Local Art",
  "Clothing & Accessories", "Specialty Foods", "Beverages",
];

const rules = [
  "All products must be grown, produced, or crafted by the vendor.",
  "Vendors must comply with applicable Texas health and safety regulations.",
  "Proof of any required permits or licenses must be submitted with your application.",
  "Booth setup must be completed before the market opens.",
  "Vendors are responsible for their own tent, tables, and display equipment.",
  "All waste must be cleaned up and removed by the vendor.",
  "Vendors must maintain their assigned booth space throughout market hours.",
  "The chamber reserves the right to reject applications that do not meet standards.",
];

const faqs = [
  { q: "When is the farmers market?", a: "The Acres Homes Farmers Market is held every Saturday from 8:00 AM to 2:00 PM at 6112 Wheatley St., Houston TX 77091." },
  { q: "Is it free to attend as a visitor?", a: "Yes! The farmers market is free and open to the public. Come shop, eat, and connect with your community." },
  { q: "How do I become a vendor?", a: "Submit a vendor application through our online form. Applications are reviewed on a rolling basis and you will be notified of approval within 7-10 business days." },
  { q: "What can vendors sell?", a: "We welcome fresh produce, prepared foods, baked goods, crafts, plants, health products, and more. All items must be produced or crafted by the vendor." },
  { q: "Are permits required?", a: "If you sell prepared foods, you may need a Texas food handler certificate or cottage food permit. Upload any applicable permits with your application." },
];

export default function FarmersMarketPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Farmers Market</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Acres Homes <span className="text-[#c41230]">Farmers Market</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mb-6">
            Every Saturday. Fresh produce, local goods, and community connection at the heart of Acres Homes.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <CalendarDays className="h-5 w-5 text-[#c41230]" />
              <span className="text-sm font-medium">Every Saturday</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <Clock className="h-5 w-5 text-[#c41230]" />
              <span className="text-sm font-medium">8:00 AM – 2:00 PM</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <MapPin className="h-5 w-5 text-[#c41230]" />
              <span className="text-sm font-medium">6112 Wheatley St., Houston TX</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="red" size="lg"><Link href="/farmers-market/apply">Apply to be a Vendor</Link></Button>
            <Button asChild size="lg" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#1a1a1a]">
              <a href="https://maps.google.com/?q=6112+Wheatley+St+Houston+TX+77091" target="_blank" rel="noopener noreferrer">
                Get Directions
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Fresh, Local, Community</h2>
              <p className="text-[#6b6560] mb-4 leading-relaxed">
                The Acres Homes Farmers Market is a weekly gathering that brings together local growers,
                food producers, artisans, and the community. Every Saturday, the market comes alive with
                fresh produce, handmade goods, prepared foods, and the energy of Acres Homes.
              </p>
              <p className="text-[#6b6560] mb-6 leading-relaxed">
                Shopping at the farmers market means supporting local families and entrepreneurs directly.
                It is a place to find fresh, quality products and connect with the people who grow and make them.
              </p>
              <div className="bg-[#f9f6f2] rounded-xl p-5 border border-[#e0d8ce]">
                <h3 className="font-bold text-[#1a1a1a] mb-3">Market Info</h3>
                <ul className="space-y-2 text-sm text-[#3d3d3d]">
                  <li className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#c41230]" /><strong>When:</strong>&nbsp;Every Saturday, year-round</li>
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#c41230]" /><strong>Hours:</strong>&nbsp;8:00 AM – 2:00 PM</li>
                  <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#c41230]" /><strong>Location:</strong>&nbsp;6112 Wheatley St., Houston TX 77091</li>
                  <li className="flex items-center gap-2"><Leaf className="h-4 w-4 text-[#c41230]" /><strong>Admission:</strong>&nbsp;Free and open to the public</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">What You Can Find</h3>
              <div className="grid grid-cols-2 gap-2">
                {vendorCategories.map((cat, i) => (
                  <div key={cat} className="flex items-center gap-2 p-3 bg-[#f9f6f2] rounded-lg border border-[#e0d8ce] text-sm text-[#3d3d3d]">
                    <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-[#c41230]" : "bg-[#1a1a1a]"}`} />
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Opportunity */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-[#c41230]/20 text-[#c41230] text-sm font-semibold px-3 py-1 rounded-full mb-4">Become a Vendor</div>
                <h2 className="text-3xl font-bold mb-3">Sell at the Acres Homes Farmers Market</h2>
                <p className="text-white/75 mb-6 leading-relaxed">
                  Bring your products to a growing community marketplace. Whether you grow fresh produce,
                  bake artisan goods, or craft handmade products — there is a booth for you at the Acres Homes Farmers Market.
                </p>
                <Button asChild variant="red" size="lg"><Link href="/farmers-market/apply">Apply to Vend <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
              </div>
              <div className="space-y-3">
                {[
                  "Direct access to a community customer base",
                  "Weekly recurring sales opportunity",
                  "Affordable booth fees",
                  "Support from chamber staff",
                  "Pathway to marketplace storefront listing",
                  "Opportunity to grow a loyal local following",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#c41230] shrink-0" />
                    <span className="text-white/85 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 text-center">Vendor Rules & Standards</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-[#f9f6f2] rounded-lg border border-[#e0d8ce]">
                <span className="w-6 h-6 rounded-full bg-[#c41230] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-[#3d3d3d] leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.q}>
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#1a1a1a] mb-2">{faq.q}</h3>
                  <p className="text-[#6b6560] text-sm leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
