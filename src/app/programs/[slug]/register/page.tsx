"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

export default function ProgramRegisterPage() {
  const { slug } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/programs/register", {
        method: "POST",
        body: JSON.stringify({ ...Object.fromEntries(formData), program_slug: slug }),
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
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Registration Complete!</h2>
          <p className="text-[#6b6560] mb-4">
            You are registered. A confirmation email will be sent to the address you provided. We look forward to seeing you!
          </p>
          <p className="text-sm text-[#6b6560]">Questions? Email <a href="mailto:info@acreshomechamber.com" className="text-[#c41230] hover:underline">info@acreshomechamber.com</a></p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Registration</div>
          <h1 className="text-4xl font-bold mb-2">Register for Program</h1>
          <p className="text-white/75">Complete the form to reserve your seat.</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Your Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input id="full_name" name="full_name" required placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" required placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="(xxx) xxx-xxxx" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Input id="experience" name="experience" placeholder="Beginner / Intermediate / Advanced" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="notes">Questions or Special Needs</Label>
                  <Textarea id="notes" name="notes" rows={3} placeholder="Anything we should know before the session?" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
              <div className="flex items-start gap-3">
                <Checkbox id="agree" name="agree" required />
                <Label htmlFor="agree" className="text-sm text-[#3d3d3d] font-normal leading-relaxed cursor-pointer">
                  I understand that registration is subject to availability, and I will receive a confirmation email. Paid programs require payment to confirm registration.
                </Label>
              </div>
            </div>

            <Button type="submit" variant="red" size="xl" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Complete Registration"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
