import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createAdminClient();

    // Find the class by slug
    const { data: cls } = await supabase
      .from("classes")
      .select("id, capacity")
      .eq("slug", body.program_slug)
      .single();

    // Check capacity
    if (cls) {
      const { count } = await supabase
        .from("class_registrations")
        .select("id", { count: "exact" })
        .eq("class_id", cls.id);

      if (count !== null && count >= cls.capacity) {
        return NextResponse.json({ error: "This program is at capacity. Please contact us about the waitlist." }, { status: 409 });
      }
    }

    const { error } = await supabase.from("class_registrations").insert({
      class_id: cls?.id,
      full_name: body.full_name,
      email: body.email,
      phone: body.phone,
      notes: body.notes,
      payment_status: "unpaid",
    });

    if (error) {
      console.error("Registration error:", error);
      return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 });
    }

    // TODO: Send confirmation email via Resend

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
