import Link from "next/link";
import { MapPin, Phone, Mail, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Donate banner */}
      <div className="bg-[#c41230] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Support the Community</h3>
            <p className="text-white/90 text-sm mt-1">
              Your donation powers programs, events, and local business growth in Acres Homes.
            </p>
          </div>
          <Button asChild variant="white" size="lg">
            <Link href="/donate">Donate Today</Link>
          </Button>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-white font-bold text-xl">Acres</span>
              <span className="text-[#c41230] font-bold text-xl">HOME</span>
            </div>
            <p className="text-white/50 text-xs mb-3">
              Chamber for Business and Economic Development, Inc.<br />
              <em>"A Community Based Business & Economic Development Corporation"</em>
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Building business, community, and opportunity in Acres Homes — one connection at a time.
            </p>
            <div className="flex items-center gap-3">
              {/* TODO: Replace # with actual social media URLs */}
              {/* TODO: Replace # with actual social media URLs */}
              <a href="#" className="text-white/50 hover:text-[#c41230] transition-colors text-sm font-medium" aria-label="Facebook">FB</a>
              <a href="#" className="text-white/50 hover:text-[#c41230] transition-colors text-sm font-medium" aria-label="Instagram">IG</a>
              <a href="#" className="text-white/50 hover:text-[#c41230] transition-colors" aria-label="Website"><Globe className="h-5 w-5" /></a>
              <a href="#" className="text-white/50 hover:text-[#c41230] transition-colors" aria-label="Links"><ExternalLink className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#c41230] mb-4 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Join the Chamber", href: "/membership" },
                { label: "Farmers Market", href: "/farmers-market" },
                { label: "Vendor Marketplace", href: "/marketplace" },
                { label: "Programs & Classes", href: "/programs" },
                { label: "Facility Requests", href: "/facility-request" },
                { label: "Events", href: "/events" },
                { label: "Watch Live", href: "/watch-live" },
                { label: "Podcast", href: "/podcast" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white hover:underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#c41230] mb-4 uppercase tracking-wider text-xs">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-[#c41230] flex-shrink-0" />
                <span>6112 Wheatley St.<br />Houston, TX 77091</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#c41230] flex-shrink-0" />
                <a href="tel:+18324337916" className="hover:text-white transition-colors">(832) 433-7916</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#c41230] flex-shrink-0" />
                <a href="mailto:info@acreshomechamber.com" className="hover:text-white transition-colors">info@acreshomechamber.com</a>
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/about" className="text-sm text-[#c41230] hover:underline">About Us →</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-[#c41230] mb-4 uppercase tracking-wider text-xs">Stay Connected</h4>
            <p className="text-white/70 text-sm mb-4">
              Get news on events, market days, programs, and community updates.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-[#c41230]"
              />
              <Button variant="red" size="sm" className="w-full">Subscribe to Newsletter</Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} AcresHOME Chamber for Business and Economic Development, Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
