import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, CalendarDays, Users, Leaf, GraduationCap, Heart, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metallic Sunflower Foundation | AcresHOME Chamber",
  description:
    "The Metallic Sunflower Foundation is dedicated to empowering Acres Homes through hydroponic farming, food access, STEM education, and community development. Founded by CC Brooks.",
};

const events = [
  {
    title: "2nd Annual Sunflower Block Party Fundraiser",
    date: "April 18, 2026",
    time: "10:00 AM – 4:00 PM",
    location: "6112 Wheatley St., Houston TX",
    description:
      "A full day of community fun — dominoes, spades, basketball, kickball, BBQ cook-off, the farmers market, STEM Zone for kids, and more. Fundraiser supporting the Metallic Sunflower Foundation's programs.",
    flyer: "/images/msf/block-party-main.jpg",
    cta: "Volunteer / Apply",
    ctaHref: "https://www.themetallicsunflowerfoundation.org/msf-applications/",
    badge: "Main Event",
    badgeColor: "bg-yellow-500",
  },
  {
    title: "2nd Annual Brisket Cook Off Championship",
    date: "April 18, 2026",
    time: "Tasting: 2:00 PM – 4:00 PM",
    location: "6112 Wheatley St., Houston TX",
    description:
      "Compete or come taste at the Acres Home Chamber Brisket Cook Off Championship. Pitmasters face off for the title — you get to judge with your tastebuds.",
    flyer: "/images/msf/brisket-cookoff.jpg",
    cta: "Learn More",
    ctaHref: "https://www.themetallicsunflowerfoundation.org/",
    badge: "Cook-Off",
    badgeColor: "bg-[#c41230]",
  },
  {
    title: "Inaugural Vegan Cook-Off",
    date: "April 18, 2026",
    time: "Tasting: 1:00 PM – 4:00 PM",
    location: "6112 Wheatley St., Houston TX",
    description:
      "The first-ever Vegan Cook-Off featuring ingredients fresh from Acres Home. Sponsored by Beauty's Community Garden. Tickets available — come taste plant-based cuisine rooted in the community.",
    flyer: "/images/msf/vegan-cookoff-food.jpg",
    cta: "Get Tickets",
    ctaHref: "https://www.themetallicsunflowerfoundation.org/",
    badge: "Vegan Cook-Off",
    badgeColor: "bg-green-600",
  },
  {
    title: "STEM Zone for Kids",
    date: "April 18, 2026",
    time: "10:00 AM – 4:00 PM",
    location: "6112 Wheatley St., Houston TX",
    description:
      "Powered by AABE, the STEM Zone at the Sunflower Block Party is a hands-on science and technology experience for children. Free with event admission.",
    flyer: "/images/msf/stem-zone.jpg",
    cta: "Learn More",
    ctaHref: "https://www.themetallicsunflowerfoundation.org/",
    badge: "Kids",
    badgeColor: "bg-blue-600",
  },
];

const programs = [
  {
    icon: Leaf,
    title: "Hydroponic Farming",
    description:
      "Operating hydroponic farms in Acres Homes to eliminate food deserts and deliver fresh, locally-grown produce to the community. Over 2,000 plants cultivated with plans to expand to 6,000.",
  },
  {
    icon: GraduationCap,
    title: "STEM & Agricultural Education",
    description:
      "Partnering with high schools and universities to integrate agricultural innovation and STEM education. The Farmers Growth Book equips participants with agricultural knowledge and healthy cooking practices.",
  },
  {
    icon: Users,
    title: "The MSF Collective",
    description:
      "A local business hub supporting over 50 vendors with advertising, event planning, website design, and market opportunities — strengthening the local entrepreneurial ecosystem.",
  },
  {
    icon: Heart,
    title: "Community Wellness",
    description:
      "Partnering with the Be Well Acres Home Steering Committee on community garden initiatives and beautification projects that build resilient, health-focused neighborhoods.",
  },
];

const volunteerRoles = [
  "Security & Helpers",
  "Registration / Check-In Volunteers",
  "Kids Zone Instructors",
  "Sports & Games Monitors",
  "Cook-Off Assistants",
  "Farm Tour Guides & Market Liaisons",
  "Sustainability & Floater Volunteers",
];

export default function MetallicSunflowerPage() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full mb-5">
                Community Partner
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                The Metallic{" "}
                <span className="text-yellow-400">Sunflower</span>{" "}
                Foundation
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Empowering Acres Homes through hydroponic farming, food access, STEM education,
                and community economic development. Founded and led by C.C. Brooks.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 text-sm">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                  6112 Wheatley St., Houston TX 77091
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 text-sm">
                  <Leaf className="h-4 w-4 text-green-400" />
                  2,000+ Plants Cultivated
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
                  <a href="https://www.themetallicsunflowerfoundation.org" target="_blank" rel="noopener noreferrer">
                    Visit Foundation Website <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="white">
                  <a href="https://www.themetallicsunflowerfoundation.org/msf-applications/" target="_blank" rel="noopener noreferrer">
                    Volunteer / Apply
                  </a>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/images/msf/block-party-main.jpg"
                alt="2nd Annual Sunflower Block Party Fundraiser"
                width={550}
                height={550}
                className="rounded-2xl object-cover w-full shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT CC BROOKS */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/msf/cc-brooks-outsmart.jpg"
                alt="C.C. Brooks featured in OutSmart Magazine — Beyond the Harvest"
                width={500}
                height={600}
                className="rounded-2xl object-cover w-full shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-black rounded-xl px-4 py-3 shadow-lg hidden sm:block">
                <div className="font-bold text-sm">OutSmart Magazine</div>
                <div className="text-xs">"Beyond the Harvest" — April 2026</div>
              </div>
            </div>
            <div>
              <div className="inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                About the Founder
              </div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">
                C.C. Brooks — Using Hydroponic Farming to Expand Food Access &amp; Equity
              </h2>
              <p className="text-[#6b6560] mb-4 leading-relaxed">
                Houston&apos;s only Black and gay hydroponic farmer, C.C. Brooks is the founder of The Metallic
                Sunflower Foundation and a recognized force in food justice and community economic development.
                His work was featured on the cover of OutSmart Magazine&apos;s April 2026 Food &amp; Drink Issue —
                &ldquo;Beyond the Harvest.&rdquo;
              </p>
              <p className="text-[#6b6560] mb-4 leading-relaxed">
                Brooks operates a 750-square-foot growing facility producing 2,000 plants — the equivalent
                of nearly two acres of traditional farmland — using 90% less water. His vision is
                straightforward: <em>&ldquo;If you control the food, you control the population.&rdquo;</em> He&apos;s turning
                that insight into action by converting empty lots in Acres Homes into growing stations
                and partnering with MD Anderson&apos;s Be Well program to grow foods that combat chronic illness.
              </p>
              <p className="text-[#6b6560] mb-6 leading-relaxed">
                Named after his welding background and the sunflower&apos;s resilience, the foundation symbolizes
                &ldquo;growth, adaptability, and collective strength&rdquo; — mentoring vendors, hosting markets, and
                building mutual support systems across the community.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.outsmartmagazine.com/2026/04/cc-brooks-hydroponics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#c41230] font-semibold hover:underline text-sm"
                >
                  Read the OutSmart Magazine Article <ExternalLink className="h-4 w-4" />
                </a>
                <span className="text-[#6b6560]">·</span>
                <a
                  href="https://www.themetallicsunflowerfoundation.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#c41230] font-semibold hover:underline text-sm"
                >
                  Visit Foundation Website <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & PROGRAMS */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              Mission
            </div>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">
              Empowering Community Through Sustainable Action
            </h2>
            <p className="text-[#6b6560] max-w-2xl mx-auto leading-relaxed">
              The Metallic Sunflower Foundation is dedicated to empowering local communities by
              strengthening small businesses and combating food insecurity through sustainable
              agriculture, community beautification, and educational programs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => (
              <div
                key={program.title}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    i % 2 === 0 ? "bg-yellow-500" : "bg-[#1a1a1a]"
                  }`}
                >
                  <program.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-[#1a1a1a] mb-2">{program.title}</h3>
                <p className="text-sm text-[#6b6560] leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APRIL 18 EVENTS */}
      <section className="py-16 px-4 sm:px-6 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full mb-4">
              April 18, 2026 · 6112 Wheatley St.
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Sunflower Block Party & Events
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              One day. Four events. All at the AcresHOME Chamber — 10 AM to 4 PM.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.title}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-colors"
              >
                <div className="relative h-72">
                  <Image
                    src={event.flyer}
                    alt={event.title}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`${event.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                      {event.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-3 text-sm text-white/60">
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{event.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{event.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">{event.description}</p>
                  <Button asChild className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold w-full">
                    <a href={event.ctaHref} target="_blank" rel="noopener noreferrer">
                      {event.cta}
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AS SEEN IN */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">As Seen In</h2>
            <p className="text-[#6b6560]">C.C. Brooks and the Metallic Sunflower Foundation in the media.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Fox 26 */}
            <div className="bg-[#f9f6f2] rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-[#1a1a1a] px-6 py-4 flex items-center gap-3">
                <div className="bg-[#c41230] text-white font-black text-lg px-3 py-1 rounded">FOX 26</div>
                <div>
                  <div className="text-white font-bold text-sm">The Isiah Factor</div>
                  <div className="text-white/60 text-xs">FOX 26 Houston (KRIV) · November 10, 2025</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[#1a1a1a] text-lg mb-2">
                  Visiting the Metallic Sunflower Foundation in Houston&apos;s Acres Homes
                </h3>
                <p className="text-[#6b6560] text-sm leading-relaxed mb-4">
                  FOX 26 Houston featured the Metallic Sunflower Foundation&apos;s efforts to provide fresh food
                  to Acres Homes — a recognized food desert — through innovative hydroponic farming and
                  community programs.
                </p>
                <a
                  href="https://www.fox26houston.com/video/1738779"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#c41230] transition-colors text-sm"
                >
                  Watch the Segment <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* OutSmart Magazine */}
            <div className="bg-[#f9f6f2] rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/msf/cc-brooks-outsmart.jpg"
                  alt="CC Brooks on OutSmart Magazine cover"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <div className="font-black text-xl">OutSmart</div>
                  <div className="text-white/80 text-xs">Houston&apos;s LGBTQ Magazine · April 2026</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[#1a1a1a] text-lg mb-2">
                  &ldquo;Beyond the Harvest&rdquo; — Food &amp; Drink Issue Cover Feature
                </h3>
                <p className="text-[#6b6560] text-sm leading-relaxed mb-4">
                  OutSmart Magazine placed C.C. Brooks on the cover of their April 2026 Food &amp; Drink Issue,
                  highlighting how he is using hydroponic farming to expand food access and equity in Houston.
                  <em> &ldquo;If you control the food, you control the population.&rdquo;</em>
                </p>
                <a
                  href="https://www.outsmartmagazine.com/2026/04/cc-brooks-hydroponics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#c41230] transition-colors text-sm"
                >
                  Read the Article <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VOLUNTEER */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#c41230]/10 text-[#c41230] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Volunteers Needed
              </div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Help Make the Block Party Happen</h2>
              <p className="text-[#6b6560] mb-6 leading-relaxed">
                The 2nd Annual Sunflower Block Party Fundraiser needs volunteers across a range of roles.
                If you want to give back and be part of a great community event, sign up today.
              </p>
              <ul className="space-y-2 mb-8">
                {volunteerRoles.map((role) => (
                  <li key={role} className="flex items-center gap-3 text-brand-gray">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                    {role}
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
                <a href="https://www.themetallicsunflowerfoundation.org/msf-applications/" target="_blank" rel="noopener noreferrer">
                  Apply to Volunteer <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
            <div>
              <Image
                src="/images/msf/block-party-volunteers.jpg"
                alt="Sunflower Block Party Volunteers Needed"
                width={550}
                height={600}
                className="rounded-2xl w-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Support the Metallic Sunflower Foundation
          </h2>
          <p className="text-black/75 text-lg mb-8 max-w-2xl mx-auto">
            Join us April 18th, volunteer, donate, or partner with the foundation to grow food
            access and opportunity in Acres Homes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild className="bg-[#1a1a1a] hover:bg-black text-white font-bold" size="lg">
              <a href="https://www.themetallicsunflowerfoundation.org" target="_blank" rel="noopener noreferrer">
                Visit the Foundation <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white">
              <Link href="/donate">Donate to the Chamber</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
