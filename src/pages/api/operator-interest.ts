import type { APIRoute } from 'astro';
import { sendNotificationEmail } from '../../lib/notify';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const trackName = data.get('track_name')?.toString().trim();
  const email = data.get('email')?.toString().trim();

  if (!trackName || !email) {
    return new Response(JSON.stringify({ error: 'Track name and email are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await sendNotificationEmail('New operator interest', {
    'Track name': trackName,
    Email: email,
    Phone: data.get('phone')?.toString().trim() || '(not provided)',
    Karts: data.get('kart_count')?.toString().trim() || '(not provided)',
    'Kart type': data.get('kart_type')?.toString().trim() || '(not provided)',
    Message: data.get('message')?.toString().trim() || '(not provided)',
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
