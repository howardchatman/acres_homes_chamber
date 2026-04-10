import Link from "next/link";
import Image from "next/image";
import {
  Store, GraduationCap, Heart, Building2, Video, CalendarDays,
  ShoppingBag, Leaf, Users, Star, ArrowRight, MapPin, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AcresHOME Chamber | Acres Homes, Houston TX",
  description:
    "AcresHOME Chamber for Business and Economic Development supports local businesses, hosts a farmers market, offers community programs, and builds economic opportunity in northwest Houston.",
};

const quickActions = [
  { icon: Store, title: "Join as a Business", description: "Get listed, get noticed, and grow your business with chamber support.", href: "/membership", cta: "Apply for Membership" },
  { icon: Leaf, title: "Farmers Market Vendor", description: "Apply to sell at the Acres Homes Farmers Market and reach your community.", href: "/farmers-market/apply", cta: "Apply to Vend" },
  { icon: GraduationCap, title: "Register for Classes", description: "Hydroponics, business skills, financial literacy, and more.", href: "/programs", cta: "View Programs" },
  { icon: Heart, title: "Donate", description: "Support local programs, events, and community development.", href: "/donate", cta: "Give Today" },
  { icon: Building2, title: "Book the Facility", description: "Reserve the chamber building for meetings, events, or community gatherings.", href: "/facility-request", cta: "Request Facility" },
  { icon: Video, title: "Watch Live Events", description: "Tune in for live speaker sessions, forums, and community events.", href: "/watch-live", cta: "Watch Now" },
];

const programs = [
  { icon: Leaf, title: "Acres Homes Farmers Market", description: "Fresh produce, local goods, and community connection every market day.", href: "/farmers-market", badge: "Weekly" },
  { icon: GraduationCap, title: "Hydroponics Training", description: "Hands-on agricultural education for entrepreneurs and families.", href: "/programs", badge: "Popular" },
  { icon: Store, title: "Business Development", description: "Workshops, mentorship, and resources for small business owners.", href: "/programs", badge: "Ongoing" },
  { icon: Users, title: "Youth & Community Services", description: "Programs to uplift youth, families, and residents.", href: "/programs", badge: "Community" },
];

const membershipBenefits = [
  "Business directory listing on chamber website",
  "Marketplace storefront access for products/services",
  "Promotion through chamber social media channels",
  "Networking events and business forums",
  "Farmers Market vendor priority access",
  "Access to chamber meeting and event space",
  "Community advocacy and economic development support",
];

const upcomingEvents = [
  { title: "Monthly Business Networking Mixer", date: "April 15, 2026", time: "6:00 PM - 8:00 PM", location: "6112 Wheatley St., Houston", description: "Connect with local business owners, share ideas, and build community partnerships.", href: "/events" },
  { title: "Acres Homes Farmers Market", date: "Every Saturday", time: "8:00 AM - 2:00 PM", location: "6112 Wheatley St., Houston", description: "Fresh local produce, artisan goods, and community fellowship every weekend.", href: "/farmers-market" },
  { title: "Hydroponics Training Workshop", date: "April 22, 2026", time: "10:00 AM - 1:00 PM", location: "Chamber Building, Houston", description: "Learn to grow food indoors with hydroponic systems. Beginner-friendly.", href: "/programs" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative bg-[#1a1a1a] text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-5">
                Acres Homes · Houston, TX
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                Building Business,{" "}
                <span className="text-[#c41230]">Community,</span>{" "}
                and Opportunity in Acres Homes
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                A digital home for local businesses, market vendors, training programs, community events,
                and everything that makes Acres Homes thrive.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="red" size="xl"><Link href="/membership">Join the Chamber</Link></Button>
                <Button asChild variant="white" size="xl"><Link href="/marketplace">Explore Marketplace</Link></Button>
                <Button asChild size="xl" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#1a1a1a]">
                  <Link href="/farmers-market">Farmers Market</Link>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-8">
                {[{ value: "200+", label: "Member Businesses" }, { value: "50+", label: "Market Vendors" }, { value: "1,000+", label: "Community Members Served" }].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-[#c41230]">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block relative">
              <Image
                src="/images/gallery/community-6.jpg"
                alt="AcresHOME Chamber gala event"
                width={600}
                height={480}
                className="rounded-2xl object-cover w-full h-105 shadow-2xl"
                priority
              />
              <div className="absolute -bottom-4 -left-4 bg-[#c41230] text-white rounded-xl px-5 py-3 shadow-lg">
                <div className="text-2xl font-bold">Est. 2018</div>
                <div className="text-sm text-white/80">Serving Acres Homes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">What Would You Like to Do?</h2>
            <p className="text-[#6b6560] max-w-xl mx-auto">Whether you are a business owner, resident, or community partner, there is a place for you here.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <Link key={action.href + i} href={action.href} className="group bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-[#c41230]/30 transition-all duration-200">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#c41230]"} text-white mb-4`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#c41230] transition-colors">{action.title}</h3>
                <p className="text-[#6b6560] text-sm mb-4 leading-relaxed">{action.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#c41230] group-hover:gap-2 transition-all">
                  {action.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/events/luncheon-dr-wright.jpg"
                alt="AcresHOME Chamber quarterly luncheon"
                width={600}
                height={420}
                className="rounded-2xl object-cover w-full h-80 shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#1a1a1a] text-white rounded-xl px-5 py-3 shadow-lg hidden sm:block">
                <div className="text-lg font-bold">First Quarter Luncheon</div>
                <div className="text-sm text-white/70">Bringing businesses together</div>
              </div>
            </div>
            <div>
              <div className="inline-block bg-[#c41230]/10 text-[#c41230] text-sm font-semibold px-3 py-1 rounded-full mb-4">About the Chamber</div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Rooted in Acres Homes. Built for the Community.</h2>
              <p className="text-[#6b6560] mb-4 leading-relaxed">
                The AcresHOME Chamber for Business and Economic Development, Inc. is a community-driven organization dedicated to economic development, business support, and civic empowerment in northwest Houston.
              </p>
              <p className="text-[#6b6560] mb-6 leading-relaxed">
                From our weekly farmers market to business training programs, facility hosting, and advocacy work, we are a hub for connection, growth, and opportunity in Acres Homes.
              </p>
              <div className="space-y-2 mb-6">
                {membershipBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#c41230] shrink-0 mt-0.5" />
                    <span className="text-brand-gray text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 flex-wrap">
                <Button asChild variant="default"><Link href="/about">Learn Our Story</Link></Button>
                <Button asChild variant="outline"><Link href="/membership">Join the Chamber</Link></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY PHOTOS */}
      <section className="py-16 px-4 sm:px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Community in Action</h2>
            <p className="text-white/60 max-w-xl mx-auto">From farmers markets to business forums — this is Acres Homes.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { src: "/images/gallery/community-1.jpg", alt: "D'Shack Gardens vendor at market" },
              { src: "/images/gallery/community-7.jpg", alt: "Chamber networking event" },
              { src: "/images/gallery/community-5.jpg", alt: "AI and workforce development workshop" },
              { src: "/images/gallery/community-3.jpg", alt: "Indoor farmers market fresh produce" },
            ].map((photo) => (
              <div key={photo.src} className="relative overflow-hidden rounded-xl aspect-square">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="white" size="lg">
              <Link href="/events">See All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2">Featured Programs</h2>
              <p className="text-[#6b6560]">Programs designed to grow people, businesses, and the community.</p>
            </div>
            <Button asChild variant="outline"><Link href="/programs">View All Programs</Link></Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => (
              <Link key={program.title} href={program.href} className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-200">
                <div className={`p-6 ${i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#c41230]"}`}>
                  <program.icon className="h-8 w-8 text-white" />
                </div>
                <div className="p-5">
                  <div className="inline-block bg-[#c41230]/10 text-[#c41230] text-xs font-semibold px-2 py-0.5 rounded-full mb-2">{program.badge}</div>
                  <h3 className="font-bold text-[#1a1a1a] mb-2 group-hover:text-[#c41230] transition-colors">{program.title}</h3>
                  <p className="text-sm text-[#6b6560] leading-relaxed">{program.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2">Upcoming Events</h2>
              <p className="text-[#6b6560]">Stay connected with what is happening in Acres Homes.</p>
            </div>
            <Button asChild variant="outline"><Link href="/events">See All Events</Link></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarDays className="h-4 w-4 text-[#c41230]" />
                    <span className="text-sm font-medium text-[#c41230]">{event.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{event.title}</h3>
                  <p className="text-sm text-[#6b6560] mb-3 leading-relaxed">{event.description}</p>
                  <div className="flex items-center gap-1 text-sm text-[#6b6560] mb-1">
                    <CalendarDays className="h-3.5 w-3.5" /><span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-[#6b6560] mb-4">
                    <MapPin className="h-3.5 w-3.5" /><span>{event.location}</span>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={event.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-14 px-4 sm:px-6 bg-[#f9f6f2] border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Community Partners & Sponsors</h2>
            <p className="text-[#6b6560]">Organizations working alongside us to strengthen Acres Homes.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10">
            <div className="bg-white rounded-xl px-8 py-5 shadow-sm border border-border flex items-center justify-center">
              <Image src="/images/partners/heb.jpg" alt="H-E-B" width={120} height={60} className="h-12 w-auto object-contain" />
            </div>
            <div className="bg-white rounded-xl px-8 py-5 shadow-sm border border-border flex items-center justify-center">
              <Image src="/images/partners/lone-star-college.png" alt="Lone Star College Houston North" width={180} height={60} className="h-12 w-auto object-contain" />
            </div>
            <div className="bg-white rounded-xl px-8 py-5 shadow-sm border border-border flex items-center justify-center">
              <Image src="/images/partners/afram-news.png" alt="Afram News" width={140} height={60} className="h-12 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* MARKETPLACE */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-block bg-[#c41230]/20 text-[#c41230] text-sm font-semibold px-3 py-1 rounded-full mb-4">Local Marketplace</div>
              <h2 className="text-3xl font-bold mb-3">Shop Local. Support Acres Homes.</h2>
              <p className="text-white/75 leading-relaxed mb-6">Browse products and services from local vendors and chamber members. From fresh produce to handmade goods.</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="red" size="lg"><Link href="/marketplace"><ShoppingBag className="h-5 w-5 mr-2" />Browse Marketplace</Link></Button>
                <Button asChild variant="white" size="lg"><Link href="/farmers-market/apply">Become a Vendor</Link></Button>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-3 flex-shrink-0">
              {["Fresh Produce", "Handmade Goods", "Local Services", "Food & Beverage"].map((cat) => (
                <div key={cat} className="bg-white/10 rounded-xl p-4 text-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                  <Star className="h-5 w-5 text-[#c41230] mx-auto mb-2" />
                  <span className="text-sm font-medium">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WATCH & LISTEN */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Watch & Listen</h2>
            <p className="text-[#6b6560] max-w-xl mx-auto">Tune in for live community events, speaker sessions, and the chamber podcast.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/watch-live" className="group bg-[#1a1a1a] rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
              <Video className="h-10 w-10 text-[#c41230] mb-4" />
              <h3 className="text-2xl font-bold mb-2">Watch Live</h3>
              <p className="text-white/75 mb-4">Catch live speaker forums, community meetings, and special events as they happen.</p>
              <span className="inline-flex items-center gap-2 font-semibold text-[#c41230] group-hover:gap-3 transition-all">Watch Now <ArrowRight className="h-4 w-4" /></span>
            </Link>
            <Link href="/podcast" className="group bg-[#c41230] rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center mb-4 text-2xl">🎙</div>
              <h3 className="text-2xl font-bold mb-2">Podcast</h3>
              <p className="text-white/90 mb-4">Conversations about business, community, and the future of Acres Homes. Coming soon.</p>
              <span className="inline-flex items-center gap-2 font-semibold text-white group-hover:gap-3 transition-all">Learn More <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* APRIL 18 PROMO */}
      <section className="py-16 px-4 sm:px-6 bg-yellow-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block bg-black/20 text-black text-sm font-bold px-3 py-1 rounded-full mb-4">
                April 18, 2026 · 6112 Wheatley St. · 10 AM – 4 PM
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                2nd Annual Sunflower Block Party &amp; Fundraiser
              </h2>
              <p className="text-black/75 text-lg mb-4 leading-relaxed">
                A full day of community — BBQ Brisket Cook-Off, Inaugural Vegan Cook-Off, STEM Zone for Kids
                powered by AABE, basketball, kickball, dominoes, spades, the farmers market, and more.
              </p>
              <p className="text-black/70 mb-6 text-sm">
                Presented by the Metallic Sunflower Foundation &amp; AcresHOME Chamber. As featured on{" "}
                <strong>FOX 26 Houston</strong> and in <strong>OutSmart Magazine</strong>.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-[#1a1a1a] hover:bg-black text-white font-bold" size="lg">
                  <Link href="/metallic-sunflower">See All Events</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white">
                  <a href="https://www.themetallicsunflowerfoundation.org/msf-applications/" target="_blank" rel="noopener noreferrer">
                    Volunteer / Apply
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: "/images/msf/block-party-main.jpg", alt: "Sunflower Block Party" },
                { src: "/images/msf/brisket-cookoff.jpg", alt: "Brisket Cook-Off" },
                { src: "/images/msf/vegan-cookoff-food.jpg", alt: "Vegan Cook-Off" },
                { src: "/images/msf/stem-zone.jpg", alt: "STEM Zone for Kids" },
              ].map((img) => (
                <div key={img.src} className="relative rounded-xl overflow-hidden aspect-square shadow-md">
                  <Image src={img.src} alt={img.alt} fill className="object-cover object-top" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DONATION */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="h-12 w-12 text-[#c41230] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Help Us Keep the Community Strong</h2>
          <p className="text-[#6b6560] text-lg mb-8 max-w-2xl mx-auto">Your donation directly supports programs, events, and services that uplift Acres Homes residents and businesses.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="red" size="xl"><Link href="/donate">Make a Donation</Link></Button>
            <Button asChild variant="outline" size="xl"><Link href="/about">Learn How We Use Donations</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
