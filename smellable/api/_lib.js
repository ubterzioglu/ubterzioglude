function json(res, status, data, extraHeaders = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  for (const [k, v] of Object.entries(extraHeaders)) res.setHeader(k, v);
  res.end(JSON.stringify(data));
}

async function upstash(cmdPath) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Missing Upstash env vars");

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

function safeId(id) {
  return /^[a-zA-Z0-9_-]{1,64}$/.test(id || "") ? id : null;
}

function sanitizeText(t) {
  const s = String(t || "").trim();
  if (!s) return null;
  if (s.length > 160) return s.slice(0, 160);
  if (/https?:\/\//i.test(s) || /www\./i.test(s)) return null;
  return s;
}

module.exports = { json, upstash, safeId, sanitizeText };
