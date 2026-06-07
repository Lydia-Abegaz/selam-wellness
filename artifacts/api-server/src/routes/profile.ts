import { Router } from "express";
import { db, userProfileTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (_req, res) => {
  const profiles = await db.select().from(userProfileTable).where(eq(userProfileTable.id, 1)).limit(1);
  if (profiles.length === 0) return res.json(null);
  return res.json(profiles[0]);
});

router.post("/", async (req, res) => {
  const { name, bio, settings } = req.body;
  const existing = await db.select().from(userProfileTable).where(eq(userProfileTable.id, 1)).limit(1);
  if (existing.length === 0) {
    const [profile] = await db.insert(userProfileTable).values({ id: 1, name: name || "User", bio: bio || "", settings: settings || {} }).returning();
    return res.json(profile);
  }
  const updates: Record<string, unknown> = {};
  if (name !== undefined) updates.name = name;
  if (bio !== undefined) updates.bio = bio;
  if (settings !== undefined) updates.settings = settings;
  const [profile] = await db.update(userProfileTable).set(updates).where(eq(userProfileTable.id, 1)).returning();
  return res.json(profile);
});

export default router;
