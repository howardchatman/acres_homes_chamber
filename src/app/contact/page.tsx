import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with AcresHOME Chamber for Business and Economic Development. Located at 6112 Wheatley St., Houston, TX 77091.",
};

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Contact</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-white/75 text-lg max-w-xl">
            We would love to hear from you. Reach out with questions about membership, the farmers market, programs, events, or anything else.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Contact Information</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c41230] rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">Address</h3>
                    <p className="text-[#6b6560]">6112 Wheatley St.<br />Houston, TX 77091</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">Phone</h3>
                    <a href="tel:+18324337916" className="text-[#c41230] hover:underline">(832) 433-7916</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c41230] rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">Email</h3>
                    <a href="mailto:info@acreshomechamber.com" className="text-[#c41230] hover:underline">info@acreshomechamber.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">Office Hours</h3>
                    {/* TODO: Replace with actual office hours */}
                    <p className="text-[#6b6560]">Monday – Friday: 9:00 AM – 5:00 PM<br />Saturday: By appointment</p>
                  </div>
                </div>
              </div>

              {/* Map embed placeholder */}
              <div className="rounded-xl overflow-hidden border border-[#e0d8ce] bg-[#e0d8ce] h-64 flex items-center justify-center">
                {/* TODO: Replace with actual Google Maps embed */}
                <div className="text-center text-[#6b6560]">
                  <MapPin className="h-10 w-10 mx-auto mb-2 text-[#c41230]" />
                  <p className="font-medium">6112 Wheatley St., Houston TX 77091</p>
                  <a
                    href="https://maps.google.com/?q=6112+Wheatley+St+Houston+TX+77091"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#c41230] hover:underline mt-1 block"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl border border-[#e0d8ce] p-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Send a Message</h2>
              <form className="space-y-5" action="/api/contact" method="POST">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input id="first_name" name="first_name" placeholder="First name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input id="last_name" name="last_name" placeholder="Last name" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="(xxx) xxx-xxxx" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="What is this about?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="How can we help you?" rows={5} required />
                </div>
                <Button type="submit" variant="red" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
