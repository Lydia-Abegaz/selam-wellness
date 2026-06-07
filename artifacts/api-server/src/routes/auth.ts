import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable, userProfileTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();
const SALT_ROUNDS = 10;

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (existing.length > 0) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const [user] = await db
    .insert(usersTable)
    .values({ name, email, password: passwordHash })
    .returning({ id: usersTable.id, name: usersTable.name, email: usersTable.email });
  const profileExists = await db.select().from(userProfileTable).where(eq(userProfileTable.id, 1)).limit(1);
  if (profileExists.length === 0) {
    await db.insert(userProfileTable).values({
      id: 1,
      name,
      bio: "Welcome to Selam Wellness!",
      settings: { notificationsEnabled: true },
    });
  }
  return res.status(201).json({ user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  const rows = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  if (rows.length === 0) {
    return res.status(401).json({ error: "Invalid email or password." });
  }
  const row = rows[0];
  let valid = false;
  if (row.password.startsWith("$2")) {
    valid = await bcrypt.compare(password, row.password);
  } else {
    valid = row.password === password;
    if (valid) {
      const newHash = await bcrypt.hash(password, SALT_ROUNDS);
      await db.update(usersTable).set({ password: newHash }).where(eq(usersTable.id, row.id));
    }
  }
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password." });
  }
  return res.json({ user: { id: row.id, name: row.name, email: row.email } });
});

export default router;
