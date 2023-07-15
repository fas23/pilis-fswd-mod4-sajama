import { Router } from "express";
import {
  getBookings,
  createBooking,
  deleteBooking,
  getBooking,
} from "../controllers/booking.controller";
import passport from "passport";

const router = Router();

router.get("/bookings", getBookings);
router.get("/booking/:id", getBooking);
router.post(
  "/booking",
  passport.authenticate("jwt", { session: false }),
  createBooking
);
router.delete("/booking/:id", deleteBooking);

export default router;
