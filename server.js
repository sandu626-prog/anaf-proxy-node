import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// TEST route
app.get("/", (req, res) => {
    res.json({ status: "ANAF proxy OK" });
});

// POST route for ANAF
app.post("/", async (req, res) => {
    try {
        const body = JSON.stringify(req.body);

        const upstream = await fetch("https://webservicesp.anaf.ro/PlatitorTvaRest/api/v8/ws/tva", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        });

        const data = await upstream.text();
        res.set("Content-Type", "application/json");
        res.send(data);

    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`ANAF Proxy running on port ${PORT}`));
