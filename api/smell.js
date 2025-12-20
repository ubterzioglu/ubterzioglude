
const { json, upstash, safeId } = require("./_lib");

module.exports = async (req, res) => {
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });

  const id = safeId(req.query.id);
  if (!id) return json(res, 400, { error: "Invalid id" });

  const votesKey = `smellable:votes:${id}`;
  const commentsKey = `smellable:comments:${id}`;

  try {
    const votes = await upstash(`HGETALL/${encodeURIComponent(votesKey)}`);
    const list = await upstash(`LRANGE/${encodeURIComponent(commentsKey)}/0/29`);

    const obj = votes?.result || {};
    const up = Number(obj.up || 0);
    const down = Number(obj.down || 0);

    const raw = Array.isArray(list?.result) ? list.result : [];
    const comments = raw.map(x => { try { return JSON.parse(x); } catch { return null; } }).filter(Boolean);

    return json(res, 200, { up, down, comments });
  } catch (e) {
    return json(res, 500, { error: "Server error", detail: String(e.message || e) });
  }
};
