
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.CURRENCY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key is not configured.' }, { status: 500 });
  }

  // Use the v1 endpoint as per the provided documentation.
  const url = `https://api.currencyapi.com/v1/latest`;

  try {
    // Send the API key in the 'apikey' header for better security.
    const response = await fetch(url, {
      headers: {
        'apikey': apiKey
      },
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
