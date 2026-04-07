import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast",
  description:
    "The AcresHOME Chamber podcast — conversations about business, community, and the future of Acres Homes, Houston TX. Coming soon.",
};

export default function PodcastPage() {
  return (
    <div>
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Podcast</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            The AcresHOME <span className="text-[#c41230]">Podcast</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            Conversations about business, community, and building opportunity in Acres Homes. Coming soon.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-[#c41230] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            🎙
          </div>
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Coming Soon</h2>
          <p className="text-[#6b6560] text-lg mb-4 leading-relaxed">
            The AcresHOME Chamber podcast will feature conversations with local business owners,
            community leaders, entrepreneurs, and advocates who are building something meaningful in Acres Homes.
          </p>
          <p className="text-[#6b6560] mb-8">
            Subscribe to our newsletter to be the first to know when the first episode drops.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 h-10 px-3 rounded-lg border border-[#e0d8ce] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c41230]"
            />
            <Button variant="red">Notify Me</Button>
          </div>
          <p className="text-xs text-[#6b6560] mt-4">No spam. Just the good stuff from Acres Homes.</p>

          {/* Future: Episode listings will appear here */}
          {/* TODO: When episodes launch, pull from Supabase podcast_episodes table */}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Want to Be a Guest?</h2>
          <p className="text-[#6b6560] mb-6">
            Do you have a story to share about business, community, or life in Acres Homes? We would love to feature you on the podcast.
          </p>
          <Button asChild variant="default"><Link href="/contact">Reach Out</Link></Button>
        </div>
      </section>
    </div>
  );
}
