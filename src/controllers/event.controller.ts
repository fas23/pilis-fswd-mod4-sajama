import { Request, Response } from "express";
import { Event } from "../entity/Event";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({
      relations: {
        bookings: true,
      },
    });

    if (events.length == 0) {
      return res.status(200).json({ message: "Has no Events" });
    }
    return res.status(200).json(events);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({
      where: { id: parseInt(id) },
      relations: ["bookings"],
    });

    if (!event) return res.status(404).json({ message: "Event not found" });

    return res.status(200).json(event);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const {
    nombre,
    descripcion,
    lugar,
    fechaHora,
    gpsLatitud,
    gpsLongitud,
    precio,
    limite,
    tipoEvento,
  } = req.body;

  const event = new Event();

  event.nombre = nombre;
  event.descripcion = descripcion;
  event.lugar = lugar;
  event.fechaHora = new Date(fechaHora);
  event.gpsLatitud = gpsLatitud;
  event.gpsLongitud = gpsLongitud;
  event.precio = precio;
  event.limite = limite;
  event.tipoEvento = tipoEvento;

  await event.save();
  return res.status(201).json({ message: "Event successfully created" });
};

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    lugar,
    fechaHora,
    gpsLatitud,
    gpsLongitud,
    precio,
    limite,
    reserva,
    tipoEvento,
  } = req.body;

  try {
    const event = await Event.findOneBy({ id: parseInt(id) });
    if (!event) return res.status(404).json({ message: "Not event found" });

    await Event.update(
      { id: parseInt(id) },
      {
        nombre,
        descripcion,
        lugar,
        fechaHora,
        gpsLatitud,
        gpsLongitud,
        precio,
        limite,
        reserva,
        tipoEvento,
      }
    );

    return res.status(200).json({ message: "Event updated" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Event.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Event not found" });

    return res.status(200).json({ message: "Event successfully eliminated" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
