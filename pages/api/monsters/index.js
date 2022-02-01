import { getMonsters } from "../../../controllers/search";

export default function handler(req, res) {
  if (req.method === "GET") {
    const types = req.query.types ? req.query.types.split(",") : false;
    let CR = req.query.cr ? req.query.cr : false;
    const exact = req.query.exact || true;
    const search = req.query.search;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    let data = getMonsters({ types, CR, exact, search });
    if (data.length === 0) {
      return res.status(200).json({ error: "No results found" });
    } else {
      const pages = Math.ceil(data.length / limit);
      data = data.slice(skip, limit + skip);
      return res.status(200).json({ pages, data });
    }
  } else {
    res.json({ error: "This doesn't work" });
  }
}
