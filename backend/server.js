import express from "express";

const app = express();

app.get("/api/status", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(8000, () => console.log(`Server running on http://localhost:8000`));
