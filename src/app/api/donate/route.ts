import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, frequency, donor_name, donor_email, campaign } = body;

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) < 1) {
      return NextResponse.json({ error: "Invalid donation amount" }, { status: 400 });
    }

    const amountInCents = Math.round(parseFloat(amount) * 100);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chamber.chatmaninc.com";

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: frequency === "monthly" ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data:
            frequency === "monthly"
              ? undefined
              : {
                  currency: "usd",
                  unit_amount: amountInCents,
                  product_data: {
                    name: `Donation — ${campaign?.replace("_", " ") || "General Fund"}`,
                    description: `AcresHOME Chamber donation${donor_name ? ` from ${donor_name}` : ""}`,
                  },
                },
          ...(frequency === "monthly"
            ? {
                price_data: {
                  currency: "usd",
                  unit_amount: amountInCents,
                  recurring: { interval: "month" },
                  product_data: {
                    name: `Monthly Donation — ${campaign?.replace("_", " ") || "General Fund"}`,
                  },
                },
              }
            : {}),
          quantity: 1,
        },
      ],
      customer_email: donor_email,
      success_url: `${siteUrl}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate`,
      metadata: {
        donor_name: donor_name || "",
        campaign: campaign || "general",
        frequency,
      },
    });

    // Log to Supabase (payment_intent filled via webhook)
    const supabase = await createAdminClient();
    await supabase.from("donations").insert({
      donor_name: donor_name || "Anonymous",
      donor_email,
      amount: parseFloat(amount),
      frequency: frequency || "one_time",
      campaign,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("Donation error:", err);
    return NextResponse.json({ error: "Failed to process donation" }, { status: 500 });
  }
}
