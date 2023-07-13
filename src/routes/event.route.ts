import { Router } from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";

const router = Router();

router.get("/events", getEvents);
router.get("/event/:id", getEvent);
router.post("/event", createEvent);
router.put("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);

export default router;
