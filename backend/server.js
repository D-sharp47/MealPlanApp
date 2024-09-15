import express from "express";
import cors from "cors";
import logger from "./logger.js";
import auth from "./routes/auth.js";

const app = express();
app.use(logger);
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", auth);

app.get("/api/status", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(8000, () => console.log(`Server running on http://localhost:8000`));
