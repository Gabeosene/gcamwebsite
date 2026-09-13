# G-CAM

Astro landing site for G-CAM.

## Development

```sh
npm install
npm run dev
```

## Deployment (Netlify)

The site uses [`@astrojs/netlify`](https://docs.astro.build/en/guides/integrations-guide/netlify/)
in `output: 'server'` mode: the marketing homepage is still prerendered to
static HTML at build time, while `src/pages/api/*` routes run as Netlify
Functions for the two form endpoints.

1. Push this repo to GitHub/GitLab/Bitbucket and create a new site in
   [Netlify](https://app.netlify.com) pointing at it. `netlify.toml` already
   sets the build command (`npm run build`) and publish directory (`dist`),
   so no manual configuration is needed.
2. In **Site configuration → Environment variables**, add the variables
   listed in `.env.example` (see below).
3. Deploy. Netlify auto-detects the Astro adapter's function output.

To deploy from the CLI instead: `npx netlify-cli deploy --build --prod`.

### Wiring up form submissions

Both forms POST as `multipart/form-data` to Astro API routes, which are
built as Netlify Functions:

- `POST /api/racer-signup` — `email`, `location`, `home_track` (optional)
- `POST /api/operator-interest` — `track_name`, `email`, `phone` (optional),
  `kart_type`, `kart_count`, `message` (optional)

Each endpoint validates required fields and, if configured, emails a
notification via [Resend](https://resend.com) (`src/lib/notify.ts`). Set up:

1. Create a Resend account and API key.
2. Verify a sending domain (or use their sandbox domain for testing).
3. In Netlify's environment variables, set:
   - `RESEND_API_KEY` — your Resend API key
   - `NOTIFY_FROM_EMAIL` — a verified sender, e.g. `notify@g-cam.example.com`
   - `NOTIFY_TO_EMAIL` — the inbox that should receive signups

Until those variables are set, submissions fail with a graceful error
message on the form (the attempt is still logged to the function's console
output) rather than silently reporting success — this keeps a misconfigured
deploy from quietly swallowing real signups. Set the three variables above
(even to sandbox/test values) to exercise the full happy path locally.

Swapping in a different email provider (SMTP, SendGrid, Postmark, etc.) or
Netlify Forms instead just means changing `src/lib/notify.ts` — the two API
route handlers don't need to change.
