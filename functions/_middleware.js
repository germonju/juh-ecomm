// functions/_middleware.js

function generateUUID() {
  return crypto.randomUUID();
}

function parseCookies(cookieHeader) {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(';')
      .map(c => c.trim().split('='))
      .map(([key, ...val]) => [key.trim(), val.join('=').trim()])
  );
}

function getMainDomain(hostname) {
  const parts = hostname.split('.');
  return parts.slice(-2).join('.');
}

export async function onRequest(context) {
  const { request, next } = context;

  const cookieName = '_aw_master_id';
  const cookies = parseCookies(request.headers.get('Cookie'));
  const existingValue = cookies[cookieName];
  const cookieValue = existingValue || generateUUID();

  const response = await next();

  if (!existingValue) {
    const hostname = new URL(request.url).hostname;
    const domain = getMainDomain(hostname);
    const maxAge = 60 * 60 * 24 * 390;

    response.headers.append(
      'Set-Cookie',
      `${cookieName}=${cookieValue}; Domain=.${domain}; Path=/; Max-Age=${maxAge}; Secure; HttpOnly; SameSite=Lax`
    );
  }

  return response;
}
