export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const response = await fetch('https://api.resend.com/audiences/03356efd-7b0f-465e-b2d8-7934246d5d68/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, unsubscribed: false })
  });

  res.status(response.ok ? 200 : 500).json({ success: response.ok });
}
