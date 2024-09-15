import express from "express";

const router = express.Router();

router.post("/login", (_, res) => {
  res.json({ message: "Login code TBD" });
});

export default router;
