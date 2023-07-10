import { DataSource } from "typeorm";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3327,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "ticket-project-db",
  synchronize: true,
});
