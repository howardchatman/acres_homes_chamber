"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, CheckCircle2, Clock, MapPin, Users } from "lucide-react";

const eventTypes = [
  "Business Meeting", "Community Forum", "Training / Workshop", "Private Event",
  "Wedding / Reception", "Birthday / Celebration", "Religious Gathering", "Nonprofit Event",
  "Fundraiser", "Political Event", "Other",
];

const spaceOptions = [
  "Main Hall", "Conference Room", "Outdoor Area", "Full Facility",
];

export default function FacilityRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/facility-request", {
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
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Request Submitted!</h2>
          <p className="text-[#6b6560] mb-4">
            Thank you for your facility use request. We will review availability and contact you within 3-5 business days to confirm your booking.
          </p>
          <p className="text-sm text-[#6b6560]">Questions? Call <a href="tel:+18324337916" className="text-[#c41230] hover:underline">(832) 433-7916</a></p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Facility Request</div>
          <h1 className="text-4xl font-bold mb-4">Request Use of the Chamber Facility</h1>
          <p className="text-white/75 text-lg max-w-2xl mb-6">
            The AcresHOME Chamber building is available for community events, business meetings, workshops, and private gatherings.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <MapPin className="h-5 w-5 text-[#c41230]" />
              <span className="text-sm">6112 Wheatley St., Houston TX</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <Users className="h-5 w-5 text-[#c41230]" />
              <span className="text-sm">Capacity: Up to 100 guests</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
              <Clock className="h-5 w-5 text-[#c41230]" />
              <span className="text-sm">Available 7 days a week</span>
            </div>
          </div>
        </div>
      </section>

      {/* Facility info */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 mb-0">
            {[
              { icon: Building2, title: "Main Hall", desc: "Large open space for events, meetings, and gatherings up to 100 guests." },
              { icon: Users, title: "Conference Room", desc: "Smaller room ideal for board meetings, training sessions, and interviews." },
              { icon: MapPin, title: "Outdoor Area", desc: "Open outdoor space available for market days, festivals, and community events." },
            ].map((space, i) => (
              <div key={space.title} className="flex gap-4 p-5 rounded-xl bg-[#f9f6f2] border border-[#e0d8ce]">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${i % 2 === 0 ? "bg-[#c41230]" : "bg-[#1a1a1a]"}`}>
                  <space.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a1a]">{space.title}</h3>
                  <p className="text-[#6b6560] text-sm mt-1">{space.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Requester Info */}
            <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Your Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="org_name">Organization / Individual Name *</Label>
                  <Input id="org_name" name="org_name" required placeholder="Name or Organization" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_name">Contact Person *</Label>
                  <Input id="contact_name" name="contact_name" required placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="(xxx) xxx-xxxx" />
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">Event Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event_title">Event Name *</Label>
                  <Input id="event_title" name="event_title" required placeholder="Name of your event" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event_type">Event Type *</Label>
                  <Select name="event_type" required onValueChange={() => {}}>
                    <SelectTrigger id="event_type"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="request_date">Requested Date *</Label>
                  <Input id="request_date" name="request_date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendance_estimate">Expected Attendance *</Label>
                  <Input id="attendance_estimate" name="attendance_estimate" type="number" min="1" max="100" required placeholder="Number of guests" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_time">Start Time *</Label>
                  <Input id="start_time" name="start_time" type="time" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_time">End Time *</Label>
                  <Input id="end_time" name="end_time" type="time" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="space_needed">Space Needed *</Label>
                  <Select name="space_needed" required onValueChange={() => {}}>
                    <SelectTrigger id="space_needed"><SelectValue placeholder="Select space" /></SelectTrigger>
                    <SelectContent>
                      {spaceOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment_needs">Equipment Needs</Label>
                  <Input id="equipment_needs" name="equipment_needs" placeholder="Projector, microphone, chairs, etc." />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea id="description" name="description" required rows={3} placeholder="Describe the purpose and nature of your event." />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="food_details">Food / Catering Details</Label>
                  <Textarea id="food_details" name="food_details" rows={2} placeholder="Will there be food or catering? Any kitchen needs?" />
                </div>
              </div>
            </div>

            {/* Insurance */}
            <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">Insurance</h2>
              <p className="text-[#6b6560] text-sm mb-4">Events with 50+ guests or food service may require liability insurance. Upload if available.</p>
              <div className="space-y-2">
                <Label htmlFor="insurance">Liability Insurance Certificate (optional)</Label>
                <Input id="insurance" name="insurance" type="file" accept=".pdf,.jpg,.png" className="cursor-pointer" />
              </div>
            </div>

            {/* Agreement */}
            <div className="bg-white rounded-xl border border-[#e0d8ce] p-6">
              <div className="flex items-start gap-3">
                <Checkbox id="agree" name="agree" required />
                <Label htmlFor="agree" className="text-sm text-[#3d3d3d] font-normal leading-relaxed cursor-pointer">
                  I agree to the AcresHOME Chamber facility use terms and conditions. I understand that approval is subject to availability, and that any applicable rental fees must be paid before the event date.
                </Label>
              </div>
            </div>

            <Button type="submit" variant="red" size="xl" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Facility Request"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
