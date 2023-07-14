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
  gpsLatitud: string;

  @Column()
  gpsLongitud: string;

  @Column()
  ticket: number;

  @ManyToOne(() => Event, (event) => event.bookings)
  evento: Event;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;
}
