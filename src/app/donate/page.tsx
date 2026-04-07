"use client";

import { useState } from "react";
import { Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const suggestedAmounts = [25, 50, 100, 250, 500];

const programs = [
  { id: "general", label: "General Fund — Greatest Need" },
  { id: "farmers_market", label: "Farmers Market Support" },
  { id: "hydroponics", label: "Hydroponics Training Program" },
  { id: "youth", label: "Youth & Community Programs" },
  { id: "business", label: "Business Development Programs" },
  { id: "events", label: "Community Events & Forums" },
];

export default function DonatePage() {
  const [amount, setAmount] = useState<number | string>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        body: JSON.stringify({ ...Object.fromEntries(formData), amount: finalAmount, frequency }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else {
          setSubmitted(true);
        }
      }
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
          <Heart className="h-16 w-16 text-[#c41230] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Thank You!</h2>
          <p className="text-[#6b6560] mb-4">Your donation supports programs, events, and community development in Acres Homes. A receipt will be sent to your email.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Donate</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Support <span className="text-[#c41230]">Acres Homes</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            Your donation directly funds programs, events, business resources, and community services that uplift Acres Homes families and entrepreneurs.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left: Impact */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Your Impact</h2>
              <div className="space-y-4 mb-8">
                {[
                  { amount: "$25", impact: "Covers supplies for one hydroponics training session" },
                  { amount: "$50", impact: "Sponsors one free business workshop seat for a local entrepreneur" },
                  { amount: "$100", impact: "Helps fund one farmers market day" },
                  { amount: "$250", impact: "Supports one month of youth community programming" },
                  { amount: "$500", impact: "Sponsors a community event or forum for Acres Homes" },
                  { amount: "$1,000", impact: "Becomes a named Community Sponsor with recognition benefits" },
                ].map((item) => (
                  <div key={item.amount} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#e0d8ce]">
                    <div className="bg-[#c41230] text-white font-bold text-sm px-3 py-1 rounded-lg shrink-0">{item.amount}</div>
                    <p className="text-[#3d3d3d] text-sm">{item.impact}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#1a1a1a] rounded-xl p-6 text-white">
                <h3 className="font-bold mb-3">Corporate Sponsorships</h3>
                <p className="text-white/75 text-sm mb-4">
                  Partner with AcresHOME Chamber as a corporate sponsor and gain visibility, recognition, and community goodwill in Acres Homes.
                </p>
                <div className="space-y-2">
                  {["Event naming rights", "Homepage featured placement", "Logo on chamber materials", "Annual recognition", "Custom partnership packages"].map((b) => (
                    <div key={b} className="flex items-center gap-2 text-sm text-white/85">
                      <CheckCircle2 className="h-4 w-4 text-[#c41230] shrink-0" />{b}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#e0d8ce] p-6 space-y-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Make a Donation</h2>

                {/* Frequency */}
                <div className="flex gap-3">
                  {(["one_time", "monthly"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      className={`flex-1 py-2 rounded-lg border-2 text-sm font-semibold transition-colors ${frequency === f ? "border-[#c41230] bg-[#c41230] text-white" : "border-[#e0d8ce] text-[#6b6560] hover:border-[#c41230]"}`}
                    >
                      {f === "one_time" ? "One-Time" : "Monthly"}
                    </button>
                  ))}
                </div>

                {/* Amount */}
                <div>
                  <Label className="mb-3 block">Donation Amount</Label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {suggestedAmounts.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => { setAmount(a); setCustomAmount(""); }}
                        className={`py-2 rounded-lg border-2 text-sm font-bold transition-colors ${amount === a && !customAmount ? "border-[#c41230] bg-[#c41230] text-white" : "border-[#e0d8ce] text-[#1a1a1a] hover:border-[#c41230]"}`}
                      >
                        ${a}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setAmount("custom")}
                      className={`py-2 rounded-lg border-2 text-sm font-bold transition-colors ${amount === "custom" || customAmount ? "border-[#c41230] bg-[#c41230] text-white" : "border-[#e0d8ce] text-[#1a1a1a] hover:border-[#c41230]"}`}
                    >
                      Custom
                    </button>
                  </div>
                  {(amount === "custom" || customAmount) && (
                    <Input
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="mt-2"
                    />
                  )}
                </div>

                {/* Campaign */}
                <div className="space-y-2">
                  <Label htmlFor="campaign">Designate Your Gift (optional)</Label>
                  <select
                    id="campaign"
                    name="campaign"
                    className="w-full h-10 px-3 rounded-lg border border-[#e0d8ce] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c41230]"
                  >
                    {programs.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                </div>

                {/* Donor Info */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="donor_name">Your Name</Label>
                    <Input id="donor_name" name="donor_name" placeholder="Full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donor_email">Email Address</Label>
                    <Input id="donor_email" name="donor_email" type="email" placeholder="For receipt" required />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox id="anonymous" name="anonymous" />
                  <Label htmlFor="anonymous" className="text-sm font-normal text-[#6b6560] cursor-pointer">
                    Make this donation anonymous
                  </Label>
                </div>

                <Button
                  type="submit"
                  variant="red"
                  size="xl"
                  className="w-full"
                  disabled={loading || (!finalAmount || isNaN(Number(finalAmount)))}
                >
                  {loading ? "Processing..." : `Donate $${finalAmount || "0"}${frequency === "monthly" ? "/mo" : ""}`}
                </Button>
                <p className="text-xs text-[#6b6560] text-center">
                  Secure payment powered by Stripe. Your information is never stored on our servers.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
