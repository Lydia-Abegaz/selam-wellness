import { Router } from "express";
import { db, bookingsTable } from "@workspace/db";

const router = Router();

router.get("/", async (_req, res) => {
  const bookings = await db.select().from(bookingsTable);
  return res.json(bookings);
});

router.post("/", async (req, res) => {
  const { expId, expName, date, adults, children, totalPrice, paymentMethod } = req.body;
  if (!expId || !date) return res.status(400).json({ error: "expId and date are required" });
  const id = `B-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const reference = `S-${Math.floor(1000 + Math.random() * 9000)}A`;
  const [booking] = await db.insert(bookingsTable).values({
    id, expId, expName: expName || "", date,
    adults: adults || 1, children: children || 0,
    totalPrice: totalPrice || 0, paymentMethod: paymentMethod || "cash", reference,
  }).returning();
  return res.status(201).json(booking);
});

export default router;
