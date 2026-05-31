export default async function handler(req, res) {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Missing required fields (name, email, message)' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ 
            success: false, 
            error: 'Server configuration error (missing RESEND_API_KEY env variable)' 
        });
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                from: 'Web Contact Form <contacto@tellmeoz.dev>',
                to: ['me@tellmeoz.dev'],
                reply_to: email,
                subject: `[Web Contact] ${subject || 'Nuevo mensaje de contacto'}`,
                html: `
                    <h2>Nuevo mensaje de contacto desde tellmeoz.dev</h2>
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Email de origen:</strong> ${email}</p>
                    <p><strong>Asunto:</strong> ${subject || 'Sin asunto'}</p>
                    <hr />
                    <p><strong>Mensaje:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                `
            })
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ success: true, data });
        } else {
            return res.status(response.status).json({ success: false, error: data.message || 'Error from email provider' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || 'Internal server error' });
    }
}
