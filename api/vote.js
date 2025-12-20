import { json, upstash, safeId } from "./_lib.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  let body = {};
  try { body = typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}"); }
  catch { return json(res, 400, { error: "Invalid JSON" }); }

  const id = safeId(body.id);
  const direction = body.direction === "up" || body.direction === "down" ? body.direction : null;
  if (!id || !direction) return json(res, 400, { error: "Invalid payload" });

  const votesKey = `smellable:votes:${id}`;

  try {
    await upstash(`HINCRBY/${encodeURIComponent(votesKey)}/${direction}/1`);
    const votes = await upstash(`HGETALL/${encodeURIComponent(votesKey)}`);
    const obj = votes?.result || {};
    return json(res, 200, { up: Number(obj.up || 0), down: Number(obj.down || 0) });
  } catch (e) {
    return json(res, 500, { error: "Server error", detail: String(e?.message || e) });
  }
}
