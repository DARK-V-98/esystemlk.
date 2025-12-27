
import { NextResponse } from 'next/server';
import { promises as dns } from 'dns';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const recordType = searchParams.get('type') || 'A';

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }
  
  const sanitizedDomain = domain.replace(/[^a-zA-Z0-9.-]/g, '');

  try {
    let records: any;
    switch (recordType.toUpperCase()) {
      case 'A':
        records = await dns.resolve4(sanitizedDomain);
        break;
      case 'AAAA':
        records = await dns.resolve6(sanitizedDomain);
        break;
      case 'CNAME':
        records = await dns.resolveCname(sanitizedDomain);
        break;
      case 'MX':
        records = await dns.resolveMx(sanitizedDomain);
        break;
      case 'NS':
        records = await dns.resolveNs(sanitizedDomain);
        break;
      case 'TXT':
        records = (await dns.resolveTxt(sanitizedDomain)).map(record => record.join(''));
        break;
      default:
        return NextResponse.json({ error: 'Invalid record type specified.' }, { status: 400 });
    }
    return NextResponse.json({ records });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error(`DNS Lookup Error for ${sanitizedDomain} (${recordType}):`, message);
    
    let userMessage = `Could not resolve ${recordType} records for ${sanitizedDomain}.`;
    if (message.includes('ENODATA')) {
        userMessage = `No ${recordType} records found for ${sanitizedDomain}.`;
    } else if (message.includes('ENOTFOUND')) {
        userMessage = `Domain not found: ${sanitizedDomain}.`;
    }

    return NextResponse.json({ error: userMessage }, { status: 500 });
  }
}
