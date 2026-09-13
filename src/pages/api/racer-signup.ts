import type { APIRoute } from 'astro';
import { sendNotificationEmail } from '../../lib/notify';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get('email')?.toString().trim();
  const location = data.get('location')?.toString().trim();

  if (!email || !location) {
    return new Response(JSON.stringify({ error: 'Email and location are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await sendNotificationEmail('New racer signup', {
      Email: email,
      Location: location,
      'Home track': data.get('home_track')?.toString().trim() || '(not provided)',
    });
  } catch (err) {
    console.error('[racer-signup] Failed to send notification', err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong on our end. Please try again in a moment.' }),
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
