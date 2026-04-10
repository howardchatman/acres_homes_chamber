import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, Store, Leaf, Building2, GraduationCap, CalendarDays,
  Heart, Settings, ShoppingBag, Video,
} from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin Dashboard" };

async function getStats(supabase: Awaited<ReturnType<typeof createClient>>) {
  const [memberships, vendors, facilityReqs, donations, classes] = await Promise.all([
    supabase.from("membership_applications").select("id, status", { count: "exact" }),
    supabase.from("vendor_applications").select("id, status", { count: "exact" }),
    supabase.from("facility_requests").select("id, status", { count: "exact" }),
    supabase.from("donations").select("id, amount"),
    supabase.from("class_registrations").select("id", { count: "exact" }),
  ]);

  const totalDonations = donations.data?.reduce((sum, d) => sum + (d.amount || 0), 0) ?? 0;

  return {
    memberships: memberships.count ?? 0,
    pendingMemberships: memberships.data?.filter((m) => m.status === "submitted" || m.status === "under_review").length ?? 0,
    vendors: vendors.count ?? 0,
    pendingVendors: vendors.data?.filter((v) => v.status === "submitted").length ?? 0,
    facilityReqs: facilityReqs.count ?? 0,
    pendingFacility: facilityReqs.data?.filter((f) => f.status === "submitted").length ?? 0,
    totalDonations,
    classRegs: classes.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", user.id).single();
  if (profile?.role !== "admin") redirect("/dashboard");

  const stats = await getStats(supabase);

  // Fetch recent applications
  const { data: recentMemberships } = await supabase
    .from("membership_applications")
    .select("id, status, created_at, submitted_data_json")
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: recentVendors } = await supabase
    .from("vendor_applications")
    .select("id, status, created_at, product_summary")
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: recentFacility } = await supabase
    .from("facility_requests")
    .select("id, org_name, event_title, request_date, status")
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: recentDonations } = await supabase
    .from("donations")
    .select("id, donor_name, amount, frequency, campaign, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  const statusColor = (status: string) => {
    const map: Record<string, string> = {
      submitted: "neutral", under_review: "warning", approved: "success",
      rejected: "danger", active: "success", pending: "warning",
    };
    return (map[status] ?? "neutral") as "neutral" | "warning" | "success" | "danger";
  };

  const statCards = [
    { icon: Store, label: "Membership Applications", value: stats.memberships, alert: stats.pendingMemberships, color: "bg-[#1a1a1a]" },
    { icon: Leaf, label: "Vendor Applications", value: stats.vendors, alert: stats.pendingVendors, color: "bg-[#c41230]" },
    { icon: Building2, label: "Facility Requests", value: stats.facilityReqs, alert: stats.pendingFacility, color: "bg-[#1a1a1a]" },
    { icon: Heart, label: "Total Donations", value: `$${stats.totalDonations.toLocaleString()}`, alert: 0, color: "bg-[#c41230]" },
    { icon: GraduationCap, label: "Class Registrations", value: stats.classRegs, alert: 0, color: "bg-[#1a1a1a]" },
  ];

  return (
    <div className="min-h-screen bg-[#f9f6f2]">
      {/* Header */}
      <div className="bg-[#1a1a1a] text-white px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-white/60 text-sm mb-1">Admin Dashboard</p>
            <h1 className="text-2xl font-bold">AcresHOME Chamber Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-white/70 hover:text-white">
              <a href="/"><span>View Site</span></a>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {statCards.map((stat) => (
            <Card key={stat.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#1a1a1a]">{stat.value}</div>
                <div className="text-xs text-[#6b6560] mt-0.5">{stat.label}</div>
                {stat.alert > 0 && (
                  <div className="mt-2 text-xs font-semibold text-[#c41230]">{stat.alert} pending review</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="memberships">
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="memberships"><Users className="h-4 w-4 mr-1" />Memberships</TabsTrigger>
            <TabsTrigger value="vendors"><Leaf className="h-4 w-4 mr-1" />Vendors</TabsTrigger>
            <TabsTrigger value="facility"><Building2 className="h-4 w-4 mr-1" />Facility</TabsTrigger>
            <TabsTrigger value="donations"><Heart className="h-4 w-4 mr-1" />Donations</TabsTrigger>
            <TabsTrigger value="classes"><GraduationCap className="h-4 w-4 mr-1" />Classes</TabsTrigger>
            <TabsTrigger value="events"><CalendarDays className="h-4 w-4 mr-1" />Events</TabsTrigger>
            <TabsTrigger value="orders"><ShoppingBag className="h-4 w-4 mr-1" />Orders</TabsTrigger>
            <TabsTrigger value="media"><Video className="h-4 w-4 mr-1" />Media</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="h-4 w-4 mr-1" />Settings</TabsTrigger>
          </TabsList>

          {/* Memberships Tab */}
          <TabsContent value="memberships">
            <Card>
              <CardHeader>
                <CardTitle>Membership Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {recentMemberships && recentMemberships.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e0d8ce] text-[#6b6560]">
                          <th className="text-left py-3 px-2 font-medium">ID</th>
                          <th className="text-left py-3 px-2 font-medium">Business</th>
                          <th className="text-left py-3 px-2 font-medium">Status</th>
                          <th className="text-left py-3 px-2 font-medium">Date</th>
                          <th className="text-left py-3 px-2 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentMemberships.map((app) => {
                          const data = app.submitted_data_json as Record<string, string> | null;
                          return (
                            <tr key={app.id} className="border-b border-[#f1ece5] hover:bg-[#f9f6f2]">
                              <td className="py-3 px-2 font-mono text-xs text-[#6b6560]">{app.id.slice(0, 8)}...</td>
                              <td className="py-3 px-2">{data?.business_name || "N/A"}</td>
                              <td className="py-3 px-2">
                                <Badge variant={statusColor(app.status)}>{app.status}</Badge>
                              </td>
                              <td className="py-3 px-2 text-[#6b6560]">{new Date(app.created_at).toLocaleDateString()}</td>
                              <td className="py-3 px-2">
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
                                  <Button size="sm" variant="red" className="h-7 text-xs">Approve</Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-[#6b6560] text-sm text-center py-8">No membership applications yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors">
            <Card>
              <CardHeader><CardTitle>Vendor Applications</CardTitle></CardHeader>
              <CardContent>
                {recentVendors && recentVendors.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e0d8ce] text-[#6b6560]">
                          <th className="text-left py-3 px-2 font-medium">ID</th>
                          <th className="text-left py-3 px-2 font-medium">Products</th>
                          <th className="text-left py-3 px-2 font-medium">Status</th>
                          <th className="text-left py-3 px-2 font-medium">Date</th>
                          <th className="text-left py-3 px-2 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentVendors.map((app) => (
                          <tr key={app.id} className="border-b border-[#f1ece5] hover:bg-[#f9f6f2]">
                            <td className="py-3 px-2 font-mono text-xs text-[#6b6560]">{app.id.slice(0, 8)}...</td>
                            <td className="py-3 px-2 max-w-[200px] truncate">{app.product_summary}</td>
                            <td className="py-3 px-2"><Badge variant={statusColor(app.status)}>{app.status}</Badge></td>
                            <td className="py-3 px-2 text-[#6b6560]">{new Date(app.created_at).toLocaleDateString()}</td>
                            <td className="py-3 px-2">
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
                                <Button size="sm" variant="red" className="h-7 text-xs">Approve</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-[#6b6560] text-sm text-center py-8">No vendor applications yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Facility Tab */}
          <TabsContent value="facility">
            <Card>
              <CardHeader><CardTitle>Facility Requests</CardTitle></CardHeader>
              <CardContent>
                {recentFacility && recentFacility.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e0d8ce] text-[#6b6560]">
                          <th className="text-left py-3 px-2 font-medium">Organization</th>
                          <th className="text-left py-3 px-2 font-medium">Event</th>
                          <th className="text-left py-3 px-2 font-medium">Date</th>
                          <th className="text-left py-3 px-2 font-medium">Status</th>
                          <th className="text-left py-3 px-2 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentFacility.map((req) => (
                          <tr key={req.id} className="border-b border-[#f1ece5] hover:bg-[#f9f6f2]">
                            <td className="py-3 px-2">{req.org_name}</td>
                            <td className="py-3 px-2">{req.event_title}</td>
                            <td className="py-3 px-2 text-[#6b6560]">{req.request_date}</td>
                            <td className="py-3 px-2"><Badge variant={statusColor(req.status)}>{req.status}</Badge></td>
                            <td className="py-3 px-2">
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline" className="h-7 text-xs">Approve</Button>
                                <Button size="sm" variant="outline" className="h-7 text-xs border-red-300 text-red-600">Deny</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-[#6b6560] text-sm text-center py-8">No facility requests yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations">
            <Card>
              <CardHeader><CardTitle>Donations</CardTitle></CardHeader>
              <CardContent>
                {recentDonations && recentDonations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#e0d8ce] text-[#6b6560]">
                          <th className="text-left py-3 px-2 font-medium">Donor</th>
                          <th className="text-left py-3 px-2 font-medium">Amount</th>
                          <th className="text-left py-3 px-2 font-medium">Frequency</th>
                          <th className="text-left py-3 px-2 font-medium">Campaign</th>
                          <th className="text-left py-3 px-2 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentDonations.map((d) => (
                          <tr key={d.id} className="border-b border-[#f1ece5] hover:bg-[#f9f6f2]">
                            <td className="py-3 px-2">{d.donor_name || "Anonymous"}</td>
                            <td className="py-3 px-2 font-semibold text-[#c41230]">${d.amount}</td>
                            <td className="py-3 px-2 capitalize">{d.frequency?.replace("_", " ")}</td>
                            <td className="py-3 px-2 text-[#6b6560] capitalize">{d.campaign?.replace("_", " ") || "General"}</td>
                            <td className="py-3 px-2 text-[#6b6560]">{new Date(d.created_at).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-[#6b6560] text-sm text-center py-8">No donations yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes */}
          <TabsContent value="classes">
            <Card>
              <CardHeader><CardTitle>Class & Program Registrations</CardTitle></CardHeader>
              <CardContent>
                <p className="text-[#6b6560] text-sm text-center py-8">
                  Registration data will appear here. Connect Supabase to view live data.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Events</CardTitle>
                  <Button variant="red" size="sm">+ Add Event</Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#6b6560] text-sm text-center py-8">
                  Events management — add events, set live stream links, and toggle featured status.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders">
            <Card>
              <CardHeader><CardTitle>Marketplace Orders</CardTitle></CardHeader>
              <CardContent>
                <p className="text-[#6b6560] text-sm text-center py-8">
                  Marketplace orders will appear here when Phase 2 launches.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media */}
          <TabsContent value="media">
            <Card>
              <CardHeader><CardTitle>Live Stream & Media Settings</CardTitle></CardHeader>
              <CardContent>
                <div className="max-w-md space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1a1a1a]">Current Stream Embed URL</label>
                    <input
                      type="url"
                      placeholder="Paste YouTube/StreamYard embed URL"
                      className="w-full h-10 px-3 rounded-lg border border-[#e0d8ce] text-sm focus:outline-none focus:ring-2 focus:ring-[#c41230]"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-[#1a1a1a]">Live Mode</label>
                    <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow" />
                    </div>
                    <span className="text-xs text-[#6b6560]">Toggle to activate live player on Watch Live page</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1a1a1a]">Stream Title</label>
                    <input
                      type="text"
                      placeholder="Event title for live stream"
                      className="w-full h-10 px-3 rounded-lg border border-[#e0d8ce] text-sm focus:outline-none focus:ring-2 focus:ring-[#c41230]"
                    />
                  </div>
                  <Button variant="red">Save Stream Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader><CardTitle>Site Settings</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1a1a1a]">Organization Name</label>
                    <input defaultValue="AcresHOME Chamber for Business and Economic Development, Inc." className="w-full h-10 px-3 rounded-lg border border-[#e0d8ce] text-sm focus:outline-none focus:ring-2 focus:ring-[#c41230]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1a1a1a]">Contact Email</label>
                    <input defaultValue="info@acreshomechamber.com" className="w-full h-10 px-3 rounded-lg border border-[#e0d8ce] text-sm focus:outline-none focus:ring-2 focus:ring-[#c41230]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1a1a1a]">Contact Phone</label>
                    <input defaultValue="(832) 433-7916" className="w-full h-10 px-3 rounded-lg border border-[#e0d8ce] text-sm focus:outline-none focus:ring-2 focus:ring-[#c41230]" />
                  </div>
                  <Button variant="red">Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
