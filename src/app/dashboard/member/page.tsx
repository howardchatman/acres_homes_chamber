import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, CalendarDays, ShoppingBag, LogOut } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Member Dashboard" };

export default async function MemberDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
  const { data: business } = await supabase.from("businesses").select("*").eq("owner_user_id", user.id).single();

  return (
    <div className="min-h-screen bg-[#f9f6f2]">
      {/* Dashboard Header */}
      <div className="bg-[#1a1a1a] text-white px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <p className="text-white/60 text-sm mb-1">Member Dashboard</p>
            <h1 className="text-2xl font-bold">
              Welcome back, {profile?.full_name || user.email?.split("@")[0]}
            </h1>
            {business && (
              <p className="text-white/70 text-sm mt-1">{business.business_name} · {business.membership_tier}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <form action="/api/auth/logout" method="POST">
              <Button type="submit" variant="ghost" size="sm" className="text-white/70 hover:text-white">
                <LogOut className="h-4 w-4 mr-2" />Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Status */}
        {business ? (
          <div className={`rounded-xl p-4 mb-8 border ${business.membership_status === "active" ? "bg-green-50 border-green-200 text-green-800" : "bg-yellow-50 border-yellow-200 text-yellow-800"}`}>
            <span className="font-semibold">Membership Status: </span>
            <span className="capitalize">{business.membership_status}</span>
            {business.membership_status !== "active" && (
              <span className="ml-2 text-sm">— Your application is being reviewed. We will contact you within 5-7 business days.</span>
            )}
          </div>
        ) : (
          <div className="bg-[#c41230]/10 border border-[#c41230]/30 rounded-xl p-4 mb-8">
            <p className="text-[#c41230] font-semibold">No membership application found.</p>
            <Button asChild variant="red" size="sm" className="mt-2">
              <Link href="/membership/apply">Apply for Membership</Link>
            </Button>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center mb-2">
                <Store className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Business Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {business ? (
                <div className="space-y-2 text-sm text-[#6b6560]">
                  <div><strong className="text-[#1a1a1a]">Business:</strong> {business.business_name}</div>
                  <div><strong className="text-[#1a1a1a]">Category:</strong> {business.category}</div>
                  <div><strong className="text-[#1a1a1a]">Tier:</strong> {business.membership_tier}</div>
                </div>
              ) : (
                <p className="text-sm text-[#6b6560]">No business profile yet.</p>
              )}
              <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                <Link href="/dashboard/member/profile">
                  {business ? "Edit Profile" : "Create Profile"}
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 bg-[#c41230] rounded-lg flex items-center justify-center mb-2">
                <CalendarDays className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Events & Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#6b6560] mb-4">
                View upcoming chamber events and your program registrations.
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/events">Browse Events</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center mb-2">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#6b6560] mb-4">
                Manage your marketplace storefront and product listings. Available for Standard and Premium members.
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/dashboard/vendor">Go to Storefront</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm"><Link href="/programs">Register for a Program</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/farmers-market/apply">Farmers Market Application</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/facility-request">Request Facility Use</Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/donate">Support the Chamber</Link></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
