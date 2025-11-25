import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type RequestBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // SMTP configuration from environment variables
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT
      ? Number(process.env.SMTP_PORT)
      : undefined;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === 'true';

    if (!host || !port || !user || !pass) {
      return NextResponse.json(
        { error: 'SMTP not configured on server' },
        { status: 500 }
      );
    }

    

    const from = process.env.SMTP_FROM || user;

    const mailOptions = {
      from: `Portfolio Contact <${from}>`,
      to: 'amredinseid29@gmail.com',
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${String(
        message
      ).replace(/\n/g, '<br/>')}</p>`,
    };


    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error sending contact email:', err);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
