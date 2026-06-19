import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400, headers: CORS }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'CRM Website <onboarding@resend.dev>',
      to: 'christherebuilder@gmail.com',
      subject: subject,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#500F50;margin-bottom:24px">New Message from CRM Website</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;width:120px">Name</td><td style="padding:10px 0;border-bottom:1px solid #eee">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600">Phone</td><td style="padding:10px 0;border-bottom:1px solid #eee">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600">Subject</td><td style="padding:10px 0;border-bottom:1px solid #eee">${subject}</td></tr>
          </table>
          <div style="margin-top:24px">
            <p style="font-weight:600;margin-bottom:8px">Message</p>
            <p style="background:#f7f7f7;padding:16px;border-radius:8px;line-height:1.6;white-space:pre-wrap">${message}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { headers: CORS })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500, headers: CORS }
    )
  }
}
