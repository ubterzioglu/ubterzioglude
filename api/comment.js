export const config = {
  runtime: "edge"
};


const { json, upstash, safeId, sanitizeText } = require("./_lib");

module.exports = async (req, res) => {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  let body = {};
  try { body = typeof req.body === "object" ? req.body : JSON.parse(req.body || "{}"); }
  catch { return json(res, 400, { error: "Invalid JSON" }); }

  const id = safeId(body.id);
  const text = sanitizeText(body.text);
  if (!id || !text) return json(res, 400, { error: "Invalid payload" });

  const commentsKey = `smellable:comments:${id}`;
  const comment = { id: `c_${Math.random().toString(16).slice(2)}`, text, ts: Date.now() };

  try {
    await upstash(`LPUSH/${encodeURIComponent(commentsKey)}/${encodeURIComponent(JSON.stringify(comment))}`);
    await upstash(`LTRIM/${encodeURIComponent(commentsKey)}/0/49`);
    return json(res, 200, comment);
  } catch (e) {
    return json(res, 500, { error: "Server error", detail: String(e.message || e) });
  }
};
