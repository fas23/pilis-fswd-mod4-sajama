import { Request, Response } from "express";
import { Booking } from "../entity/Booking";
import { Event } from "../entity/Event";

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({
      relations: {
        evento: true,
        user: true,
      },
    });

    if (bookings.length == 0)
      return res.status(200).json({ message: "Has no Bookings" });

    return res.json(bookings);
  } catch (error) {
    console.log("error");
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createBooking = async (req: Request, res: Response) => {
  const { evento, user, ticket } = req.body;

  try {
    const event = await Event.findOne({
      where: {
        id: evento,
      },
    });
    var reservation = event!.reserva + parseInt(ticket);
    if (reservation > event!.limite) {
      return res.json({ message: "Tickets sold out" });
    } else {
      const booking = new Booking();
      booking.precio = event!.precio;
      booking.fechaHora = event!.fechaHora;
      booking.lugar = event!.lugar;
      booking.gpsLatitud = event!.gpsLatitud;
      booking.gpsLongitud = event!.gpsLongitud;
      booking.ticket = ticket;
      booking.evento = evento;
      booking.user = user;

      await booking.save();
      await Event.update({ id: parseInt(evento) }, { reserva: reservation });
      return res
        .status(200)
        .json({ message: "Booking successfully created", booking });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Booking.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Booking not found" });

    return res.status(200).json({ message: "Booking successfully eliminated" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
