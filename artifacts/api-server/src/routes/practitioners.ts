import { Router } from "express";
import { db, practitionersTable } from "@workspace/db";

const router = Router();

router.get("/", async (_req, res) => {
  const practs = await db.select().from(practitionersTable);
  return res.json(practs);
});

export default router;
