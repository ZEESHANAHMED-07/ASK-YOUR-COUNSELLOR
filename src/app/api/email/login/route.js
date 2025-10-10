import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { uid, email, name, to } = await req.json();

    const target = to || 'soumo2020.saha@gmail.com';
    if (!target) {
      return NextResponse.json({ error: 'No recipient specified' }, { status: 400 });
    }

    const subject = `User login: ${name || email || uid || 'Unknown User'}`;
    const text = [
      `A user has just logged in.`,
      ``,
      `UID: ${uid || 'N/A'}`,
      `Email: ${email || 'N/A'}`,
      `Name: ${name || 'N/A'}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].join('\n');

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'RESEND_API_KEY is not configured' }, { status: 500 });
    }

    const from = process.env.RESEND_FROM || 'onboarding@resend.dev'; // use test sender unless verified domain is set
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: target,
        subject,
        text,
      }),
      // Ensure this runs only on server; Next API routes are server by default
      cache: 'no-store',
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('[Resend] API error', res.status, payload);
      throw new Error(payload?.message || `Resend API error (${res.status})`);
    }

    return NextResponse.json({ success: true, resend: payload });
  } catch (e) {
    console.error('[Resend login email] error', e);
    return NextResponse.json({ error: e?.message || 'Failed to send email' }, { status: 500 });
  }
}
