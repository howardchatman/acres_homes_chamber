import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createAdminClient();

    // Create vendor record
    const { data: vendor, error: vendorError } = await supabase.from("vendors").insert({
      business_name: body.business_name || body.vendor_name,
      vendor_name: body.vendor_name,
      category: body.category,
      description: body.product_description,
      email: body.email,
      phone: body.phone,
      website: body.website,
      status: "pending",
    }).select().single();

    if (vendorError) {
      console.error("Vendor insert error:", vendorError);
      return NextResponse.json({ error: "Failed to submit vendor application" }, { status: 500 });
    }

    // Create vendor application record
    const { error: appError } = await supabase.from("vendor_applications").insert({
      vendor_id: vendor.id,
      product_summary: body.product_description,
      status: "submitted",
      payment_status: "unpaid",
      notes: body.notes,
    });

    if (appError) console.error("Vendor application insert error:", appError);

    // TODO: Send confirmation email via Resend

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
