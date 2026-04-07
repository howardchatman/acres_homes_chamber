import Link from "next/link";
import { GraduationCap, Users, Leaf, Store, Clock, CalendarDays, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs & Classes",
  description:
    "Explore AcresHOME Chamber programs including hydroponics training, small business workshops, financial literacy, youth programs, and more in Acres Homes, Houston TX.",
};

// TODO: This data should come from Supabase — see /api/programs
const programs = [
  {
    id: "hydroponics-101",
    title: "Hydroponics Training — Level 1",
    slug: "hydroponics-101",
    category: "Agriculture",
    icon: Leaf,
    description:
      "Learn the fundamentals of hydroponic growing — from system setup to nutrient management. Perfect for beginners interested in sustainable food production at home or for business.",
    instructor: "TBD — Chamber Agriculture Lead",
    date: "April 22, 2026",
    time: "10:00 AM – 1:00 PM",
    location: "Chamber Building, 6112 Wheatley St.",
    capacity: 20,
    fee: 25,
    is_active: true,
  },
  {
    id: "business-development-101",
    title: "Starting Your Business in Texas",
    slug: "business-development-101",
    category: "Business",
    icon: Store,
    description:
      "A practical workshop covering business registration, licensing, branding basics, and what you need to know to legally start your business in Texas.",
    instructor: "TBD — Business Development Partner",
    date: "May 3, 2026",
    time: "10:00 AM – 12:00 PM",
    location: "Chamber Building, 6112 Wheatley St.",
    capacity: 30,
    fee: 0,
    is_active: true,
  },
  {
    id: "financial-literacy",
    title: "Financial Literacy for Entrepreneurs",
    slug: "financial-literacy",
    category: "Business",
    icon: DollarSign,
    description:
      "Understand cash flow, budgeting, credit, and financial planning tools that help small business owners make smarter decisions and build lasting stability.",
    instructor: "TBD — Financial Education Partner",
    date: "May 17, 2026",
    time: "11:00 AM – 1:00 PM",
    location: "Chamber Building, 6112 Wheatley St.",
    capacity: 25,
    fee: 0,
    is_active: true,
  },
  {
    id: "youth-leadership",
    title: "Youth Leadership & Community Program",
    slug: "youth-leadership",
    category: "Youth",
    icon: Users,
    description:
      "An ongoing youth development program focused on leadership, community service, entrepreneurship, and life skills for young people in the Acres Homes community.",
    instructor: "TBD — Youth Program Coordinator",
    date: "Ongoing — See schedule",
    time: "Varies",
    location: "Chamber Building, 6112 Wheatley St.",
    capacity: 40,
    fee: 0,
    is_active: true,
  },
  {
    id: "marketing-basics",
    title: "Marketing Your Business on a Budget",
    slug: "marketing-basics",
    category: "Business",
    icon: Store,
    description:
      "Learn how to use social media, word-of-mouth, and community connections to grow your business without a large marketing budget.",
    instructor: "TBD — Marketing Partner",
    date: "June 7, 2026",
    time: "10:00 AM – 12:00 PM",
    location: "Virtual / Chamber Building",
    capacity: 50,
    fee: 0,
    is_active: true,
  },
  {
    id: "hydroponics-advanced",
    title: "Hydroponics Training — Level 2",
    slug: "hydroponics-advanced",
    category: "Agriculture",
    icon: Leaf,
    description:
      "For graduates of Level 1. Dive deeper into nutrient science, lighting, system scaling, and turning your hydroponic setup into a small business.",
    instructor: "TBD — Chamber Agriculture Lead",
    date: "June 14, 2026",
    time: "10:00 AM – 1:00 PM",
    location: "Chamber Building, 6112 Wheatley St.",
    capacity: 15,
    fee: 35,
    is_active: true,
  },
];

const categories = ["All", "Business", "Agriculture", "Youth"];

export default function ProgramsPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#1a1a1a] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block bg-[#c41230] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">Programs & Classes</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Learn. Grow. <span className="text-[#c41230]">Succeed.</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            Community education, business training, and agricultural programs designed to grow people and businesses in Acres Homes.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 px-4 sm:px-6 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a1a]">Upcoming Programs</h2>
              <p className="text-[#6b6560] text-sm mt-1">Register early — space is limited for most programs.</p>
            </div>
            {/* Category filter — in Phase 2 make this interactive */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span key={cat} className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${cat === "All" ? "bg-[#1a1a1a] text-white" : "bg-white border border-[#e0d8ce] text-[#6b6560] hover:border-[#c41230] hover:text-[#c41230]"}`}>
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, i) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <div className={`h-3 rounded-t-xl ${i % 2 === 0 ? "bg-[#c41230]" : "bg-[#1a1a1a]"}`} />
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${i % 2 === 0 ? "bg-[#c41230]/10" : "bg-[#1a1a1a]/10"}`}>
                      <program.icon className={`h-5 w-5 ${i % 2 === 0 ? "text-[#c41230]" : "text-[#1a1a1a]"}`} />
                    </div>
                    <span className="text-xs font-semibold text-white bg-[#1a1a1a] px-2 py-0.5 rounded-full">
                      {program.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{program.title}</h3>
                  <p className="text-[#6b6560] text-sm leading-relaxed mb-4 flex-1">{program.description}</p>
                  <div className="space-y-1.5 text-sm text-[#6b6560] mb-4">
                    <div className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5 text-[#c41230]" />{program.date}</div>
                    <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-[#c41230]" />{program.time}</div>
                    <div className="flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5 text-[#c41230]" />Capacity: {program.capacity} seats</div>
                    <div className="flex items-center gap-2"><DollarSign className="h-3.5 w-3.5 text-[#c41230]" />{program.fee === 0 ? "Free" : `$${program.fee}`}</div>
                  </div>
                  <Button asChild variant={i % 2 === 0 ? "red" : "default"} size="sm" className="w-full">
                    <Link href={`/programs/${program.slug}/register`}>Register Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Want to Host a Workshop?</h2>
          <p className="text-[#6b6560] mb-6">
            Do you have expertise to share with the Acres Homes community? We welcome instructor partnerships for business, agricultural, and community education programs.
          </p>
          <Button asChild variant="red" size="lg"><Link href="/contact">Contact Us to Partner</Link></Button>
        </div>
      </section>
    </div>
  );
}
