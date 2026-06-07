import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import postsRouter from "./posts";
import circlesRouter from "./circles";
import experiencesRouter from "./experiences";
import practitionersRouter from "./practitioners";
import bookingsRouter from "./bookings";
import moodRouter from "./mood";
import profileRouter from "./profile";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/posts", postsRouter);
router.use("/circles", circlesRouter);
router.use("/experiences", experiencesRouter);
router.use("/practitioners", practitionersRouter);
router.use("/bookings", bookingsRouter);
router.use("/mood", moodRouter);
router.use("/profile", profileRouter);

export default router;
