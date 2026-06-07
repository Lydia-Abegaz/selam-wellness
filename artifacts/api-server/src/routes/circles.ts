import { Router } from "express";
import { db, circlesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  const circles = await db.select().from(circlesTable);
  return res.json(circles);
});

router.post("/:id/join", async (req, res) => {
  const id = parseInt(req.params.id);
  const existing = await db.select().from(circlesTable).where(eq(circlesTable.id, id)).limit(1);
  if (existing.length === 0) return res.status(404).json({ error: "Circle not found" });
  const newCount = existing[0].members + 1;
  await db.update(circlesTable).set({ members: newCount }).where(eq(circlesTable.id, id));
  return res.json({ id, members: newCount });
});

export default router;
