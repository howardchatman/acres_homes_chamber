import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createAdminClient();

    const { error } = await supabase.from("facility_requests").insert({
      org_name: body.org_name,
      contact_name: body.contact_name,
      email: body.email,
      phone: body.phone,
      event_title: body.event_title,
      event_type: body.event_type,
      request_date: body.request_date,
      start_time: body.start_time,
      end_time: body.end_time,
      attendance_estimate: parseInt(body.attendance_estimate) || 0,
      description: body.description,
      equipment_needs: body.equipment_needs,
      food_details: body.food_details,
      status: "submitted",
    });

    if (error) {
      console.error("Facility request error:", error);
      return NextResponse.json({ error: "Failed to submit facility request" }, { status: 500 });
    }

    // TODO: Send confirmation email via Resend

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
