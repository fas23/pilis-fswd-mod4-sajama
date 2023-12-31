import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Entity,
} from "typeorm";
import { Booking } from "./Booking";
@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  lugar: string;

  @Column()
  fechaHora: Date;

  @Column()
  gpsLatitud: string;

  @Column()
  gpsLongitud: string;

  @Column()
  precio: number;

  @Column()
  limite: number;

  @Column({ default: 0 })
  reserva: number;

  @Column()
  tipoEvento: string;

  @OneToMany(() => Booking, (booking) => booking.evento)
  bookings: Booking[];
}
