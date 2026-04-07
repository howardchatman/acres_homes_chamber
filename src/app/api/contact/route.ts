import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, subject, message } = body;

    if (!email || !message) {
      return NextResponse.json({ error: "Email and message are required" }, { status: 400 });
    }

    // TODO: Send email via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: process.env.EMAIL_FROM!,
    //   to: "info@acreshomechamber.com",
    //   subject: `Contact Form: ${subject}`,
    //   text: `From: ${first_name} ${last_name} <${email}>\n\n${message}`,
    // });

    console.log("Contact form submission:", { first_name, last_name, email, subject, message });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
