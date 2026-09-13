// Sends a notification email via the Resend API (https://resend.com).
// Configure RESEND_API_KEY, NOTIFY_TO_EMAIL and NOTIFY_FROM_EMAIL as
// environment variables in the Netlify site settings — see README section
// "Wiring up form submissions" for setup steps.
export async function sendNotificationEmail(subject: string, lines: Record<string, string>) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.NOTIFY_TO_EMAIL;
  const from = import.meta.env.NOTIFY_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(`[notify] Email not sent (missing RESEND_API_KEY/NOTIFY_TO_EMAIL/NOTIFY_FROM_EMAIL) — ${subject}`, lines);
    throw new Error('Email service is not configured.');
  }

  const text = Object.entries(lines)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, text }),
  });

  if (!res.ok) {
    throw new Error(`Resend API error: ${res.status} ${await res.text()}`);
  }
}
