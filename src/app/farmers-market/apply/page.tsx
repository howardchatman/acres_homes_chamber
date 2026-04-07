"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

const productCategories = [
  "Fresh Produce", "Fruits", "Herbs & Plants", "Baked Goods",
  "Prepared Foods", "Honey & Preserves", "Beverages", "Meat & Poultry",
  "Dairy & Eggs", "Handmade Crafts", "Art", "Clothing & Accessories",
  "Health & Wellness", "Specialty Foods", "Other",
];

const boothTypes = [
  "10x10 Standard Booth", "10x20 Double Booth", "Food Truck / Trailer", "Table Only",
];

export default function VendorApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/vendors/apply", {
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
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <CheckCircle2 className="h-16 w-16 text-[#c41230] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Application Submitted!</h2>
          <p className="text-[#6b6560] mb-4">
            Thank you for applying to vend at the Acres Homes Farmers Market. We will review your application and reach out within 7-10 business days.
          </p>
          <p className="text-[#6b6560] text-sm">Questions? Email <a href="mailto:info@acreshomechamber.com" className="text-[#c41230] hover:underline">info@acreshomechamber.com</a></p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Vendor Application</div>
          <h1 className="text-4xl font-bold mb-3">Apply to be a Farmers Market Vendor</h1>
          <p className="text-white/75 max-w-xl">
            Complete the form below to apply for a booth at the Acres Homes Farmers Market. Applications are reviewed on a rolling basis.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vendor Info */}
            <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Vendor Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor_name">Your Name *</Label>
                  <Input id="vendor_name" name="vendor_name" required placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business_name">Business / Booth Name *</Label>
                  <Input id="business_name" name="business_name" required placeholder="What should we call your booth?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" required placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="(xxx) xxx-xxxx" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website / Social Media</Label>
                  <Input id="website" name="website" placeholder="Instagram, website, etc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Product Category *</Label>
                  <Select name="category" required onValueChange={() => {}}>
                    <SelectTrigger id="category"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {productCategories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="product_description">Product Description *</Label>
                  <Textarea id="product_description" name="product_description" required rows={3} placeholder="Describe the products you plan to sell at the market." />
                </div>
              </div>
            </div>

            {/* Booth & Dates */}
            <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Booth & Scheduling</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="booth_type">Booth Type *</Label>
                  <Select name="booth_type" required onValueChange={() => {}}>
                    <SelectTrigger id="booth_type"><SelectValue placeholder="Select booth type" /></SelectTrigger>
                    <SelectContent>
                      {boothTypes.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">How often do you plan to vend?</Label>
                  <Select name="frequency" onValueChange={() => {}}>
                    <SelectTrigger id="frequency"><SelectValue placeholder="Select frequency" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="every_week">Every Saturday</SelectItem>
                      <SelectItem value="biweekly">Every other Saturday</SelectItem>
                      <SelectItem value="monthly">Once a month</SelectItem>
                      <SelectItem value="occasional">Occasional / Seasonal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="start_date">Requested Start Date</Label>
                  <Input id="start_date" name="start_date" type="date" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" name="notes" rows={3} placeholder="Anything else you would like us to know?" />
                </div>
              </div>
            </div>

            {/* Permits & Documents */}
            <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">Permits & Documentation</h2>
              <p className="text-[#6b6560] text-sm mb-5">If you sell prepared foods or require permits, please upload them here.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="permits">Texas Food Handler / Cottage Food Permit</Label>
                  <Input id="permits" name="permits" type="file" accept=".pdf,.jpg,.png" className="cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insurance">Liability Insurance (if applicable)</Label>
                  <Input id="insurance" name="insurance" type="file" accept=".pdf,.jpg,.png" className="cursor-pointer" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="product_photos">Product Photos (optional but encouraged)</Label>
                  <Input id="product_photos" name="product_photos" type="file" accept="image/*" multiple className="cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Terms & Agreement</h2>
              <div className="flex items-start gap-3">
                <Checkbox id="agree" name="agree" required />
                <Label htmlFor="agree" className="text-sm text-[#3d3d3d] font-normal leading-relaxed cursor-pointer">
                  I agree to the Acres Homes Farmers Market vendor rules and standards. I understand that all products must be produced or crafted by me, and that I am responsible for compliance with applicable Texas health and safety regulations. Booth fees are due upon approval.
                </Label>
              </div>
            </div>

            <Button type="submit" variant="red" size="xl" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Vendor Application"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
