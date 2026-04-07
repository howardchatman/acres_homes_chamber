import Link from "next/link";
import { Users, Target, Heart, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AcresHOME Chamber for Business and Economic Development, Inc. — our mission, history, services, and community impact in Acres Homes, Houston TX.",
};

const services = [
  { icon: Building2, title: "Business Support", description: "Directory listings, networking, mentorship, and advocacy for local businesses." },
  { icon: Users, title: "Vendor Opportunities", description: "Farmers market access, marketplace storefronts, and vendor training resources." },
  { icon: Target, title: "Training & Education", description: "Hydroponics, business development, financial literacy, and workforce workshops." },
  { icon: Heart, title: "Community Programs", description: "Youth services, community events, forums, and civic engagement initiatives." },
  { icon: Building2, title: "Event Hosting", description: "Facility use for meetings, celebrations, community gatherings, and special events." },
  { icon: Target, title: "Economic Development", description: "Advocacy, partnerships, and initiatives that drive economic growth in Acres Homes." },
];

const team = [
  // TODO: Replace with actual leadership/team data
  { name: "Howard Chatman", role: "Executive Director", bio: "Community leader and advocate for economic development in Acres Homes." },
  { name: "Board Member Name", role: "Board Chairperson", bio: "Dedicated to strengthening local business and civic life in northwest Houston." },
  { name: "Staff Member Name", role: "Programs Coordinator", bio: "Manages chamber programs, classes, and vendor relationships." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">About Us</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Rooted in Acres Homes. <span className="text-[#c41230]">Built for the Community.</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            AcresHOME Chamber for Business and Economic Development, Inc. — a community-based organization
            dedicated to growing businesses and uplifting residents in northwest Houston.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Our Mission</h2>
              {/* TODO: Replace with official mission statement */}
              <p className="text-[#6b6560] leading-relaxed mb-4">
                The AcresHOME Chamber for Business and Economic Development, Inc. exists to foster economic growth,
                support local businesses, and empower residents in the Acres Homes community of Houston, Texas.
              </p>
              <p className="text-[#6b6560] leading-relaxed mb-4">
                We provide resources, programming, and community connections that allow local entrepreneurs,
                vendors, and residents to thrive together — building a stronger, more self-sufficient Acres Homes.
              </p>
              <p className="text-[#6b6560] leading-relaxed">
                As a community-based business and economic development corporation, we are committed to
                creating pathways to opportunity for everyone in our community.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Our Vision</h2>
              {/* TODO: Replace with official vision statement */}
              <p className="text-[#6b6560] leading-relaxed mb-6">
                We envision a thriving Acres Homes where local businesses have the tools to grow,
                residents have access to quality programs and economic resources, and the community
                is a recognized hub of innovation, culture, and commerce in Houston.
              </p>
              <div className="space-y-3">
                {[
                  "A connected network of thriving local businesses",
                  "Year-round farmers market and community commerce",
                  "Workforce development and educational programs",
                  "A vibrant community gathering and event space",
                  "Economic equity and opportunity for all residents",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#c41230] shrink-0 mt-0.5" />
                    <span className="text-[#3d3d3d]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 text-center">Our History</h2>
          {/* TODO: Replace with accurate organizational history */}
          <div className="bg-white rounded-xl border border-[#e0d8ce] p-8">
            <div className="content-prose">
              <h2>Founded in the Heart of Acres Homes</h2>
              <p>
                The AcresHOME Chamber for Business and Economic Development, Inc. was founded to address
                the need for a centralized, community-led organization that could support local businesses
                and drive economic development in the Acres Homes neighborhood of northwest Houston.
              </p>
              <h2>Growing the Community</h2>
              <p>
                Over the years, the chamber has grown its programming to include a weekly farmers market,
                hydroponics training, small business workshops, facility use programs, and community events
                that draw hundreds of residents and business owners together.
              </p>
              <h2>Looking Forward</h2>
              <p>
                Today, AcresHOME Chamber is expanding its digital presence and infrastructure to serve
                more businesses, vendors, and community members than ever before — building a platform
                that reflects the energy, resilience, and opportunity that defines Acres Homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">What We Offer</h2>
            <p className="text-[#6b6560] max-w-xl mx-auto">
              From business support to community programs, we provide the resources Acres Homes needs to grow.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Card key={service.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${i % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#c41230]"} text-white mb-4`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{service.title}</h3>
                  <p className="text-[#6b6560] text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Leadership & Team</h2>
            <p className="text-[#6b6560]">
              {/* TODO: Update with actual team descriptions */}
              The dedicated people driving business and community development in Acres Homes.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-xl font-bold mb-4">
                    {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a1a]">{member.name}</h3>
                  <p className="text-[#c41230] text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-[#6b6560] text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
          <p className="text-white/75 text-lg mb-8">
            Become a member, volunteer, donate, or simply show up. Every connection makes Acres Homes stronger.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="red" size="xl"><Link href="/membership">Join the Chamber</Link></Button>
            <Button asChild variant="white" size="xl"><Link href="/contact">Get in Touch <ArrowRight className="h-5 w-5 ml-1" /></Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
