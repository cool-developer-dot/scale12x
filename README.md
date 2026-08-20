# Scale12x

AI-native growth studio website (Next.js).

## Local development

```bash
cd frontend
npm install
npm run dev
```

Or from repo root:

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Vercel deployment

1. Import this GitHub repository in Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework preset: **Next.js** (auto-detected).
4. Optional environment variables (Project Settings → Environment Variables):

| Name | Required | Example |
|------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | No | `https://scale12x.com` |
| `NEXT_PUBLIC_CALENDLY_URL` | No | `https://calendly.com/foreman-pilot/30min` |
| `CONTACT_WEBHOOK_URL` | No | your form webhook URL |

5. Deploy.

The app lives under `frontend/`. Root scripts proxy `dev` / `build` / `start` / `lint` into that package.
