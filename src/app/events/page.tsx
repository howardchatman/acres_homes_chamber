import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Stay connected with AcresHOME Chamber events — business mixers, community forums, farmers market days, and live speaker sessions in Acres Homes, Houston TX.",
};

// TODO: Pull from Supabase events table
const events = [
  { id: "1", title: "Monthly Business Networking Mixer", date: "April 15, 2026", time: "6:00 PM - 8:00 PM", location: "6112 Wheatley St., Houston TX", description: "Connect with fellow business owners, share wins, explore partnerships, and build the Acres Homes business network.", category: "Networking", is_live: false, watch_url: null, href: "/events/business-networking-mixer" },
  { id: "2", title: "Acres Homes Farmers Market", date: "Every Saturday", time: "8:00 AM - 2:00 PM", location: "6112 Wheatley St., Houston TX", description: "Shop fresh produce, artisan goods, prepared foods, and more from local Acres Homes vendors.", category: "Market", is_live: false, watch_url: null, href: "/farmers-market" },
  { id: "3", title: "Hydroponics Training Workshop", date: "April 22, 2026", time: "10:00 AM - 1:00 PM", location: "Chamber Building, Houston", description: "Learn to grow food indoors with hydroponic systems. Space is limited — register early.", category: "Education", is_live: false, watch_url: null, href: "/programs/hydroponics-101/register" },
  { id: "4", title: "Community Economic Forum", date: "May 8, 2026", time: "5:30 PM - 7:30 PM", location: "6112 Wheatley St., Houston TX", description: "A public forum on economic development, local investment, and business opportunity in Acres Homes.", category: "Forum", is_live: false, watch_url: "/watch-live", href: "/events/economic-forum" },
  { id: "5", title: "Starting Your Business Workshop", date: "May 3, 2026", time: "10:00 AM - 12:00 PM", location: "Chamber Building, Houston", description: "Everything you need to legally and confidently start a business in Texas. Free to attend.", category: "Education", is_live: false, watch_url: null, href: "/programs/business-development-101/register" },
  { id: "6", title: "Annual Chamber Awards Celebration", date: "June 20, 2026", time: "7:00 PM - 10:00 PM", location: "6112 Wheatley St., Houston TX", description: "Celebrating the businesses, vendors, and community members making Acres Homes stronger. RSVP required.", category: "Celebration", is_live: false, watch_url: null, href: "/events/annual-awards" },
];

const categoryColors: Record<string, string> = {
  Networking: "bg-[#1a1a1a] text-white",
  Market: "bg-[#c41230] text-white",
  Education: "bg-blue-700 text-white",
  Forum: "bg-purple-700 text-white",
  Celebration: "bg-amber-600 text-white",
};

export default function EventsPage() {
  return (
    <div>
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Events</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Community <span className="text-[#c41230]">Events</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            From market Saturdays to business forums and live-streamed speaker sessions — there is always something happening in Acres Homes.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardContent className="p-0 flex flex-col flex-1">
                  <div className="h-2 rounded-t-xl bg-[#c41230]" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[event.category] || "bg-gray-200 text-gray-700"}`}>
                        {event.category}
                      </span>
                      {event.watch_url && (
                        <span className="text-xs font-semibold bg-green-600 text-white px-2 py-0.5 rounded-full">
                          Live Stream Available
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarDays className="h-4 w-4 text-[#c41230]" />
                      <span className="text-sm font-medium text-[#c41230]">{event.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{event.title}</h3>
                    <p className="text-sm text-[#6b6560] mb-3 leading-relaxed flex-1">{event.description}</p>
                    <div className="space-y-1 text-sm text-[#6b6560] mb-4">
                      <div className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{event.time}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{event.location}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link href={event.href}>Details <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
                      </Button>
                      {event.watch_url && (
                        <Button asChild variant="red" size="sm">
                          <Link href={event.watch_url}>Watch Live</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Want to Host an Event?</h2>
          <p className="text-[#6b6560] mb-6">The chamber facility is available for community and private events. Submit a facility request to check availability.</p>
          <Button asChild variant="red"><Link href="/facility-request">Request the Facility</Link></Button>
        </div>
      </section>
    </div>
  );
}
