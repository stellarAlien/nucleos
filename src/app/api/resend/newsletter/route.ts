import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, firstName } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // ─── ADD TO AUDIENCE ──────────────────────────────────────────────────────
    // This is what populates the list in your second screenshot.
    const response = await resend.contacts.create({
      email: email.toLowerCase().trim(),
      firstName: firstName || '',
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID as string, // Double-check this ID!
    });

    if (response.error) {
      console.error('Resend Audience Error:', response.error);
      return NextResponse.json({ error: response.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}