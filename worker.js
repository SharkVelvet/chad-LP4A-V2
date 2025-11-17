export default {
  async fetch(request) {
    const url = new URL(request.url);
    const customDomain = request.headers.get('cf-connecting-hostname') || request.headers.get('host');
    
    // Forward to Railway's auto-generated domain
    const railwayUrl = `https://chad-lp4a-v2-production.up.railway.app${url.pathname}${url.search}`;
    
    // Create new request with Railway's domain as Host
    const modifiedRequest = new Request(railwayUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual'
    });
    
    // Preserve the original hostname for our app to identify the customer
    modifiedRequest.headers.set('cf-connecting-hostname', customDomain);
    modifiedRequest.headers.set('x-forwarded-host', customDomain);
    modifiedRequest.headers.set('host', 'chad-lp4a-v2-production.up.railway.app');
    
    return fetch(modifiedRequest);
  }
};
