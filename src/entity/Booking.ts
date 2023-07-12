import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Event } from "./Event";
@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  precio: number;

  @Column()
  fechaHora: Date;

  @Column()
  lugar: string;

  @Column()
  gps: string;

  @ManyToOne(() => Event, (event) => event.bookings)
  evento: Event;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;
}
