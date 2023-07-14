import { Router } from "express";
import { getBookings, createBooking } from "../controllers/booking.controller";
import passport from "passport";

const router = Router();

router.get("/bookings", getBookings);
router.post(
  "/booking",
  passport.authenticate("jwt", { session: false }),
  createBooking
);

export default router;
