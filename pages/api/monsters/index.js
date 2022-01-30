import {
  getMonstersByType,
  getMonstersByCR,
  getAllMonsters,
  getMonstersByName,
} from "../../../controllers/monsters";

export default function handler(req, res) {
  if (req.method === "GET") {
    const types = req.query.types ? req.query.types.split(",") : false;
    let CR = req.query.cr ? req.query.cr : false;
    const exact = req.query.exact || true;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const search = req.query.search;
    let data = [];
    if (types) {
      if (types !== "any") {
        data = getMonstersByType(types);
      }
    }
    if (CR) {
      if (CR.includes("/")) {
        const nums = CR.split("/");
        CR = Number(nums[0]) / Number(nums[1]);
      } else {
        CR = Number(CR);
      }
      data =
        data.length > 0
          ? getMonstersByCR(CR, exact, data)
          : getMonstersByCR(CR, exact);
    }
    if (search) {
      data =
        data.length > 0
          ? getMonstersByName(search, data)
          : getMonstersByName(search);
    }
    if (data.length === 0) {
      data = getAllMonsters();
    }
    const pages = data.length / limit;
    data = data.slice(skip, limit);
    res.status(200).json({ pages, data });
  } else {
    res.json({ error: "This doesn't work" });
  }
}
