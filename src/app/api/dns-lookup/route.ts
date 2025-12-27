
import { NextResponse } from 'next/server';
import { promises as dns } from 'dns';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  // Sanitize domain to prevent common issues
  const sanitizedDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

  try {
    const [ipv4, ipv6, cname, mx, ns, soa] = await Promise.all([
      dns.resolve(sanitizedDomain, 'A').catch(() => []),
      dns.resolve(sanitizedDomain, 'AAAA').catch(() => []),
      dns.resolve(sanitizedDomain, 'CNAME').catch(() => []),
      dns.resolve(sanitizedDomain, 'MX').catch(() => []),
      dns.resolve(sanitizedDomain, 'NS').catch(() => []),
      dns.resolve(sanitizedDomain, 'SOA').catch(() => null),
    ]);

    const results = {
      A: ipv4,
      AAAA: ipv6,
      CNAME: cname,
      MX: mx,
      NS: ns,
      SOA: soa,
    };
    
    // Filter out empty results
    const finalResults = Object.fromEntries(Object.entries(results).filter(([_, value]) => value && (Array.isArray(value) ? value.length > 0 : true)));

    if (Object.keys(finalResults).length === 0) {
      return NextResponse.json({ error: `No DNS records found for ${sanitizedDomain}. The domain may not exist.` }, { status: 404 });
    }

    return NextResponse.json(finalResults);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error(`DNS Lookup Error for ${sanitizedDomain}:`, message);
    
    // Provide a more user-friendly error message
    if (message.includes('ENODATA') || message.includes('ENOTFOUND')) {
      return NextResponse.json({ error: `The domain '${sanitizedDomain}' could not be found.` }, { status: 404 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
