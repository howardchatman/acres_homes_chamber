import Link from "next/link";
import { ShoppingBag, Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Shop local products and services from Acres Homes vendors and chamber members. Support local businesses in Houston TX.",
};

// TODO: Pull vendors/products from Supabase in Phase 2
// This is the Phase 1 placeholder — marketplace launches in Phase 2

export default function MarketplacePage() {
  return (
    <div>
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Marketplace</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Shop <span className="text-[#c41230]">Local.</span> Support Acres Homes.
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            Browse products and services from local vendors and chamber members. Everything sold here supports a local Acres Homes business.
          </p>
        </div>
      </section>

      {/* Coming Soon / Phase 2 */}
      <section className="py-24 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-[#c41230]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-[#c41230]" />
          </div>
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Marketplace Launching Soon</h2>
          <p className="text-[#6b6560] text-lg mb-6 leading-relaxed">
            The AcresHOME Marketplace is coming in Phase 2. Local vendors will be able to create storefronts and list products for sale.
            Community members will be able to shop and support Acres Homes businesses directly online.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="red" size="lg">
              <Link href="/farmers-market/apply">
                <Store className="h-5 w-5 mr-2" /> Apply to Become a Vendor
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/membership">
                Join the Chamber <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it will work */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8 text-center">How the Marketplace Will Work</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Vendors Apply", description: "Local businesses and farmers market vendors apply and get approved for a storefront." },
              { step: "2", title: "List Products", description: "Vendors upload products, descriptions, pricing, and photos to their storefront." },
              { step: "3", title: "Community Shops", description: "Residents browse the marketplace, add items to cart, and checkout securely through Stripe." },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 rounded-xl bg-[#f9f6f2] border border-[#e0d8ce]">
                <div className="w-12 h-12 bg-[#c41230] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-[#6b6560] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
