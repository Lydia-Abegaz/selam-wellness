import { Router } from "express";
import { db, moodEntriesTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  const moods = await db.select().from(moodEntriesTable).orderBy(desc(moodEntriesTable.id));
  return res.json(moods);
});

router.post("/", async (req, res) => {
  const { mood, note } = req.body;
  if (!mood) return res.status(400).json({ error: "Mood is required" });
  const date = new Date().toISOString().split("T")[0];
  const [entry] = await db.insert(moodEntriesTable).values({ date, mood, note: note || "" }).returning();
  return res.status(201).json(entry);
});

export default router;
