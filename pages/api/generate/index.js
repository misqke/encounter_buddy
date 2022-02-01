import { generateEncounter } from "../../../controllers/generate";

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = generateEncounter(req.body);
    if (data === "error") {
      return res.status(200).json({
        error:
          "Unable to generate encounter. Try changing up the number of enemies or allowed enemy types.",
      });
    }
    res.status(200).json({ data });
  } else {
    res.json({ error: "This doesn't work" });
  }
}
