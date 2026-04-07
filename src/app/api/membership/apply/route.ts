import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createAdminClient();

    const { error } = await supabase.from("membership_applications").insert({
      submitted_data_json: body,
      status: "submitted",
      payment_status: "unpaid",
    });

    if (error) {
      console.error("Membership application error:", error);
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }

    // TODO: Send confirmation email via Resend
    // await sendEmail({ to: body.email, subject: "Membership Application Received", ... })

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
