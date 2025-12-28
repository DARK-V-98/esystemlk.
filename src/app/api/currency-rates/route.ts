
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.CURRENCY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key is not configured.' }, { status: 500 });
  }

  const headers = { 'apikey': apiKey };

  try {
    // Fetch both latest rates and currencies list in parallel
    const [ratesResponse, currenciesResponse] = await Promise.all([
      fetch('https://api.currencyapi.com/v1/latest', { headers, next: { revalidate: 3600 } }),
      fetch('https://api.currencyapi.com/v1/currencies', { headers, next: { revalidate: 86400 } }) // Currencies list doesn't change often
    ]);

    if (!ratesResponse.ok) {
      const errorData = await ratesResponse.json();
      throw new Error(`Failed to fetch rates: ${errorData.message || ratesResponse.statusText}`);
    }
     if (!currenciesResponse.ok) {
      const errorData = await currenciesResponse.json();
      throw new Error(`Failed to fetch currencies: ${errorData.message || currenciesResponse.statusText}`);
    }
    
    const ratesData = await ratesResponse.json();
    const currenciesData = await currenciesResponse.json();
    
    return NextResponse.json({
        rates: ratesData.data,
        currencies: currenciesData.data
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
