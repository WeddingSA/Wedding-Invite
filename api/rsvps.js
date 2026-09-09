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
    const headers = {
      apikey: serviceKey,
      Accept: 'application/json'
    };

    // Legacy service-role keys are JWTs and can be used as Bearer tokens.
    // New Supabase sb_secret_* keys are not JWTs, so sending them in the
    // Authorization header causes an invalid-JWT response. The apikey header
    // is sufficient for those keys.
    if (serviceKey.startsWith('eyJ')) {
      headers.Authorization = `Bearer ${serviceKey}`;
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/wedding_rsvps?select=guest_name,attending,adults,children,dietary_requirements,honeymoon_contribution,created_at&order=created_at.desc`, {
      headers
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Supabase RSVP fetch failed:', response.status, details);
      let hint = 'Could not load RSVPs from Supabase.';
      if (response.status === 401 || response.status === 403) hint = 'Supabase rejected the service key. Check that the Vercel key belongs to this wedding Supabase project.';
      if (response.status === 404) hint = 'The wedding_rsvps table could not be found in the configured Supabase project.';
      return res.status(502).json({ error: hint });
    }

    const rows = await response.json();
    const dinnerMarker = /(?:^|\n)\[FRIDAY_DINNER:(yes|no)\](?=\n|$)/;
    const data = rows.map(row => {
      const notes = row.dietary_requirements || '';
      const match = notes.match(dinnerMarker);
      const cleanedNotes = notes.replace(dinnerMarker, '').trim();
      return {
        ...row,
        friday_dinner_attending: match ? match[1] === 'yes' : null,
        dietary_requirements: cleanedNotes || null
      };
    });

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(data);
  } catch (error) {
    console.error('RSVP admin API error:', error);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
}
