import { Router } from "express";
import { db, usersTable, userProfileTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (existing.length > 0) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }
  const [user] = await db.insert(usersTable).values({ name, email, password }).returning({ id: usersTable.id, name: usersTable.name, email: usersTable.email });
  const profileExists = await db.select().from(userProfileTable).where(eq(userProfileTable.id, 1)).limit(1);
  if (profileExists.length === 0) {
    await db.insert(userProfileTable).values({ id: 1, name, bio: "Welcome to Selam Wellness!", settings: { notificationsEnabled: true } });
  }
  return res.status(201).json({ user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const users = await db.select({ id: usersTable.id, name: usersTable.name, email: usersTable.email })
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  if (users.length === 0 || (await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1))[0].password !== password) {
    return res.status(401).json({ error: "Invalid email or password." });
  }
  return res.json({ user: users[0] });
});

export default router;
