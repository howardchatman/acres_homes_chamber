import { Video, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch Live",
  description:
    "Watch live community events, speaker forums, and chamber programming from AcresHOME Chamber in Acres Homes, Houston TX.",
};

// TODO: Pull stream settings from Supabase site_settings table (key: 'live_stream')
const LIVE_STREAM_EMBED = ""; // Paste YouTube/StreamYard embed URL here when live
const IS_LIVE = false; // Toggle to true when streaming

const pastVideos = [
  // TODO: Replace with actual past event video embeds
  { title: "Community Economic Forum — March 2026", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", date: "March 12, 2026" },
  { title: "Business Development Workshop — February 2026", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", date: "February 20, 2026" },
  { title: "Monthly Networking Mixer — January 2026", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ", date: "January 15, 2026" },
];

const upcomingStreams = [
  // TODO: Pull from Supabase events table where watch_url is set
  { title: "Community Economic Forum", date: "May 8, 2026", time: "5:30 PM" },
  { title: "Monthly Business Mixer (Live)", date: "May 20, 2026", time: "6:00 PM" },
];

export default function WatchLivePage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Watch Live</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Community <span className="text-[#c41230]">Live Streams</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            Watch AcresHOME Chamber events, speaker forums, and community programming — live and on-demand.
          </p>
        </div>
      </section>

      {/* Live Player */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-4xl mx-auto">
          {IS_LIVE && LIVE_STREAM_EMBED ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1.5 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  LIVE NOW
                </span>
                <span className="text-[#1a1a1a] font-semibold">Community Event in Progress</span>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-xl">
                <iframe
                  src={LIVE_STREAM_EMBED}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="AcresHOME Chamber Live Stream"
                />
              </div>
            </div>
          ) : (
            <div className="bg-[#1a1a1a] rounded-xl aspect-video flex flex-col items-center justify-center text-white">
              <Video className="h-16 w-16 text-[#c41230] mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Live Event Right Now</h2>
              <p className="text-white/60 text-center max-w-sm">
                Check back during scheduled events or browse our past sessions below.
              </p>
            </div>
          )}

          {/* Upcoming streams */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Upcoming Live Events</h2>
            <div className="space-y-3">
              {upcomingStreams.map((stream) => (
                <div key={stream.title} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#e0d8ce]">
                  <div className="w-10 h-10 bg-[#c41230] rounded-lg flex items-center justify-center shrink-0">
                    <CalendarDays className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1a1a1a]">{stream.title}</div>
                    <div className="text-sm text-[#6b6560]">{stream.date} at {stream.time}</div>
                  </div>
                  <span className="ml-auto text-xs font-semibold bg-[#1a1a1a]/10 text-[#1a1a1a] px-3 py-1 rounded-full">
                    Upcoming
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Past Videos */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Past Events & Recordings</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pastVideos.map((video) => (
              <Card key={video.title} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-black">
                  <iframe
                    src={video.embed}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-[#1a1a1a] text-sm mb-1">{video.title}</h3>
                  <p className="text-xs text-[#6b6560]">{video.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
