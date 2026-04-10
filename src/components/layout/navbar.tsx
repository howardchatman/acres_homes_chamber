"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Join the Chamber", href: "/membership" },
      { label: "Member Directory", href: "/membership/directory" },
    ],
  },
  {
    label: "Farmers Market",
    href: "/farmers-market",
    children: [
      { label: "Visit the Market", href: "/farmers-market" },
      { label: "Become a Vendor", href: "/farmers-market/apply" },
    ],
  },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Watch Live", href: "/watch-live" },
  {
    label: "MSF Foundation",
    href: "/metallic-sunflower",
    children: [
      { label: "About the Foundation", href: "/metallic-sunflower" },
      { label: "April 18 Block Party", href: "/metallic-sunflower#events" },
      { label: "Volunteer / Apply", href: "https://www.themetallicsunflowerfoundation.org/msf-applications/" },
    ],
  },
  { label: "Donate", href: "/donate" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-[#1a1a1a] shadow-md">
      {/* Top utility bar */}
      <div className="hidden md:flex items-center justify-end gap-4 px-6 py-1.5 bg-black text-sm text-white/70">
        <a href="tel:+18324337916" className="hover:text-white transition-colors">
          (832) 433-7916
        </a>
        <span className="text-white/30">|</span>
        <Link href="/login" className="hover:text-white transition-colors">Login</Link>
        <span className="text-white/30">|</span>
        <Link href="/dashboard/member" className="hover:text-white transition-colors">Member Portal</Link>
        <span className="text-white/30">|</span>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="bg-white rounded-md px-2 py-1">
              <Image
                src="/images/logo.png"
                alt="AcresHOME Chamber for Business and Economic Development, Inc."
                width={160}
                height={46}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-[#c41230] text-white"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                  {link.children && <ChevronDown className="h-3 w-3" />}
                </Link>

                {link.children && openDropdown === link.href && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-[#1a1a1a] hover:bg-[#f9f6f2] hover:text-[#c41230] transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-2">
            <Button asChild variant="red" size="sm" className="hidden sm:inline-flex">
              <Link href="/membership">Join Now</Link>
            </Button>
            <button
              className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-black border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-[#c41230] text-white"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-2 border-t border-white/10 flex gap-2">
              <Button asChild variant="red" size="sm" className="flex-1">
                <Link href="/membership" onClick={() => setMobileOpen(false)}>Join Now</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="flex-1 border-white text-white hover:bg-white hover:text-[#1a1a1a]">
                <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
