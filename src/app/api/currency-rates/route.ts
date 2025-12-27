import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.CURRENCY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key is not configured.' }, { status: 500 });
  }

  const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}`;

  try {
    const response = await fetch(url, {
        next: {
            revalidate: 3600 // Revalidate every hour
        }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch from currency API');
    }
    
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
