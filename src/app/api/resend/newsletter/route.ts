import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, firstName, company, jobTitle } = body;

    // 1. Basic Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    // 2. Sanitization (Security best practice)
    const cleanFirstName = firstName?.trim().replace(/[<>]/g, '') || '';
    const cleanCompany = company?.trim().replace(/[<>]/g, '') || 'N/A';
    const cleanJobTitle = jobTitle?.trim().replace(/[<>]/g, '') || 'N/A';

    // 3. Add to Resend Audience
    // We use 'as any' here to stop the TypeScript compiler from 
    // tripping over the SDK's internal overload conflicts during build.
    const response = await resend.contacts.create({
      email: email.toLowerCase().trim(),
      first_name: cleanFirstName, 
      unsubscribed: false,
      audience_id: process.env.RESEND_AUDIENCE_ID as string,
      metadata: {
        company: cleanCompany,
        job_title: cleanJobTitle,
        source: 'Nucleos Website',
      },
    } as any);

    // 4. Error Handling from Resend SDK
    if (response.error) {
      console.error('Resend Audience Error:', response.error);
      
      // Handle the case where the contact already exists to avoid 400 errors for the user
      if (response.error.message.includes('already exists')) {
        return NextResponse.json({ success: true, message: 'Already subscribed' });
      }

      return NextResponse.json({ error: response.error.message }, { status: 400 });
    }

    // 5. Success Response
    return NextResponse.json({ 
      success: true, 
      data: response.data 
    });

  } catch (error: any) {
    console.error('Newsletter API Server Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}