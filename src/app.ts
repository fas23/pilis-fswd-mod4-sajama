require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.route";
import eventRoutes from "./routes/event.route";
import bookingRoutes from "./routes/booking.route";

import passportMiddleware from "./middlewares/passport";
import passport from "passport";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//jwt
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passportMiddleware);

app.use("/api", userRoutes);
app.use("/api", eventRoutes);
app.use("/api", bookingRoutes);

export default app;
