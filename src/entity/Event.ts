import { BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Booking } from "./Booking";
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
  gps: string;

  @Column()
  precio: number;

  @Column()
  limite: number;

  @Column()
  tipoEvento: string;

  @OneToMany(() => Booking, (booking) => booking.evento)
  bookings: Booking[];
}
