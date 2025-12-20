import fetch from "node-fetch";

export function json(res, status, data, extraHeaders = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  for (const [k, v] of Object.entries(extraHeaders)) res.setHeader(k, v);
  res.end(JSON.stringify(data));
}

function getRestConfig() {
  // Preferred (Upstash Redis integration)
  const url1 = process.env.UPSTASH_REDIS_REST_URL;
  const token1 = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url1 && token1) return { url: url1, token: token1 };

  // Compatibility (Vercel KV / Upstash KV env names already present in many Vercel projects)
  const url2 = process.env.KV_REST_API_URL;
  const token2 = process.env.KV_REST_API_TOKEN;
  if (url2 && token2) return { url: url2, token: token2 };

  // Last fallback (rare): KV_URL sometimes contains the REST endpoint too
  const url3 = process.env.KV_URL;
  if (url3 && token2) return { url: url3, token: token2 };

  return { url: null, token: null };
}

export async function upstash(cmdPath) {
  const { url, token } = getRestConfig();
  if (!url || !token) throw new Error("Missing Upstash REST env vars (UPSTASH_REDIS_REST_* or KV_REST_API_*)");

  const r = await fetch(`${url}/${cmdPath}`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (!r.ok) {
    const t = await r.text().catch(() => "");
    throw new Error(`Upstash error ${r.status}: ${t}`);
  }
  return await r.json();
}

export function safeId(id) {
  return /^[a-zA-Z0-9_-]{1,64}$/.test(id || "") ? id : null;
}

export function sanitizeText(t) {
  const s = String(t || "").trim();
  if (!s) return null;
  if (s.length > 160) return s.slice(0, 160);
  if (/https?:\/\//i.test(s) || /www\./i.test(s)) return null;
  return s;
}
