import { Router } from "express";
import { db, postsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const { circle } = req.query;
  let posts;
  if (circle) {
    posts = await db.select().from(postsTable).where(eq(postsTable.circle, circle as string)).orderBy(desc(postsTable.id));
  } else {
    posts = await db.select().from(postsTable).orderBy(desc(postsTable.id));
  }
  return res.json(posts);
});

router.post("/", async (req, res) => {
  const { content, circle, isAnonymous, author = "Hana M." } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });
  const defaultReactions = { "🤍": 0, "🌱": 0, "🙏": 0, "☀️": 0 };
  const displayAuthor = isAnonymous ? "Anonymous" : author;
  const [post] = await db.insert(postsTable).values({
    author: displayAuthor,
    avatar: null,
    time: "Just now",
    content,
    reactions: defaultReactions,
    comments: 0,
    circle: circle || "General",
    isAnonymous: !!isAnonymous,
  }).returning();
  return res.status(201).json(post);
});

router.post("/:id/react", async (req, res) => {
  const id = parseInt(req.params.id);
  const { reaction } = req.body;
  const existing = await db.select().from(postsTable).where(eq(postsTable.id, id)).limit(1);
  if (existing.length === 0) return res.status(404).json({ error: "Post not found" });
  const reactions = (existing[0].reactions as Record<string, number>) || {};
  reactions[reaction] = (reactions[reaction] || 0) + 1;
  await db.update(postsTable).set({ reactions }).where(eq(postsTable.id, id));
  return res.json({ id, reactions });
});

export default router;
