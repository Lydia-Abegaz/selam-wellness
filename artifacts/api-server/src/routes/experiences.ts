import { Router } from "express";
import { db, experiencesTable } from "@workspace/db";

const router = Router();

router.get("/", async (_req, res) => {
  const exps = await db.select().from(experiencesTable);
  return res.json(exps);
});

export default router;
