"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";
import { Suspense } from "react";

const businessCategories = [
  "Food & Beverage", "Retail", "Health & Wellness", "Beauty & Personal Care",
  "Professional Services", "Construction & Trades", "Technology", "Education & Training",
  "Arts & Entertainment", "Agriculture & Farming", "Transportation", "Real Estate",
  "Nonprofit / Community Organization", "Other",
];

function ApplyForm() {
  const searchParams = useSearchParams();
  const initialTier = searchParams.get("tier") || "standard";
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tier, setTier] = useState(initialTier);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/membership/apply", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <CheckCircle2 className="h-16 w-16 text-[#c41230] mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Application Submitted!</h2>
        <p className="text-[#6b6560] mb-6">
          Thank you for applying to join the AcresHOME Chamber. We will review your application and contact you within 5-7 business days at the email address you provided.
        </p>
        <p className="text-[#6b6560] text-sm">Questions? Email <a href="mailto:info@acreshomechamber.com" className="text-[#c41230] hover:underline">info@acreshomechamber.com</a></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Business Info */}
      <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
        <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Business Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="business_name">Business Name *</Label>
            <Input id="business_name" name="business_name" required placeholder="Your Business Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact_name">Contact Person *</Label>
            <Input id="contact_name" name="contact_name" required placeholder="Full Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Business Email *</Label>
            <Input id="email" name="email" type="email" required placeholder="business@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" name="phone" type="tel" required placeholder="(xxx) xxx-xxxx" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address">Business Address *</Label>
            <Input id="address" name="address" required placeholder="Street, City, State, ZIP" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website (optional)</Label>
            <Input id="website" name="website" type="url" placeholder="https://yourbusiness.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="social_links">Social Media Links (optional)</Label>
            <Input id="social_links" name="social_links" placeholder="Instagram, Facebook, etc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Business Category *</Label>
            <Select name="category" required onValueChange={() => {}}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {businessCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="years_in_business">Years in Business</Label>
            <Input id="years_in_business" name="years_in_business" type="number" min="0" placeholder="e.g. 3" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="description">Business Description *</Label>
            <Textarea id="description" name="description" required rows={4} placeholder="Describe what your business does, who you serve, and what makes you unique." />
          </div>
        </div>
      </div>

      {/* Membership Tier */}
      <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
        <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Membership Tier</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { id: "community", label: "Community Member", price: "$99/yr" },
            { id: "standard", label: "Standard Business", price: "$250/yr" },
            { id: "premium", label: "Premium Partner", price: "$500/yr" },
            { id: "sponsor", label: "Sponsor Level", price: "$1,000/yr" },
          ].map((t) => (
            <label
              key={t.id}
              className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${tier === t.id ? "border-[#c41230] bg-[#c41230]/5" : "border-[#e0d8ce] hover:border-[#c41230]/40"}`}
            >
              <input
                type="radio"
                name="membership_tier"
                value={t.id}
                checked={tier === t.id}
                onChange={() => setTier(t.id)}
                className="sr-only"
              />
              <span className="font-semibold text-sm text-[#1a1a1a] text-center">{t.label}</span>
              <span className="text-[#c41230] font-bold mt-1">{t.price}</span>
            </label>
          ))}
        </div>
        <input type="hidden" name="membership_tier" value={tier} />
      </div>

      {/* Logo Upload */}
      <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
        <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Business Logo</h2>
        <div className="space-y-2">
          <Label htmlFor="logo">Upload Your Logo (PNG, JPG — max 5MB)</Label>
          <Input id="logo" name="logo" type="file" accept="image/*" className="cursor-pointer" />
          <p className="text-xs text-[#6b6560]">Your logo will be displayed in the chamber directory and marketplace.</p>
        </div>
      </div>

      {/* Agreement */}
      <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
        <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Agreement</h2>
        <div className="flex items-start gap-3">
          <Checkbox id="agree" name="agree" required />
          <Label htmlFor="agree" className="text-sm text-[#3d3d3d] font-normal leading-relaxed cursor-pointer">
            I agree to the AcresHOME Chamber membership terms and conditions. I understand my application will be reviewed and I will be contacted with next steps including payment processing. Membership fees are due upon approval.
          </Label>
        </div>
      </div>

      <Button type="submit" variant="red" size="xl" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Membership Application"}
      </Button>
    </form>
  );
}

export default function MembershipApplyPage() {
  return (
    <div>
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Apply</div>
          <h1 className="text-4xl font-bold mb-3">Chamber Membership Application</h1>
          <p className="text-white/75 max-w-xl">
            Complete the form below to apply for chamber membership. Applications are reviewed within 5-7 business days.
          </p>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-3xl mx-auto">
          <Suspense fallback={<div>Loading form...</div>}>
            <ApplyForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
