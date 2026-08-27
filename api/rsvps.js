const SUPABASE_URL = process.env.SUPABASE_URL || 'https://uogzkoxadudzrpobpdqj.supabase.co';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supplied = req.headers['x-admin-password'];
  const expected = process.env.ADMIN_PASSWORD;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!expected || !serviceKey) {
    const missing = [];
    if (!expected) missing.push('ADMIN_PASSWORD');
    if (!serviceKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
    return res.status(500).json({ error: `Missing Vercel environment variable${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}` });
  }

  if (!supplied || supplied !== expected) {
    return res.status(401).json({ error: 'Incorrect admin password' });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/wedding_rsvps?select=guest_name,attending,adults,children,dietary_requirements,honeymoon_contribution,created_at&order=created_at.desc`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Supabase RSVP fetch failed:', response.status, details);
      return res.status(502).json({ error: 'Could not load RSVPs from Supabase.' });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(data);
  } catch (error) {
    console.error('RSVP admin API error:', error);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
}
