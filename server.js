import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.options("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.sendStatus(204);
});

app.post("/", async (req, res) => {
  try {
    const upstream = await fetch(
      "https://webservicesp.anaf.ro/PlatitorTvaRest/api/v8/ws/tva",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body)
      }
    );

    const data = await upstream.text();

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "application/json");
    res.status(upstream.status).send(data);

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("ANAF Proxy running on port", PORT));
