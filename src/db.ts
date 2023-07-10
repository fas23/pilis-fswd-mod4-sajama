import { DataSource } from "typeorm";
require("dotenv").config();
import { User } from "./entity/User";
import { Event } from "./entity/Event";
import { Booking } from "./entity/Booking";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3327,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "ticket-project-db",
  synchronize: true,
  entities: [User, Event, Booking],
});
