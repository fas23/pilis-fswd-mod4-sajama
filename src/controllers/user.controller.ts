import { Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {
  try {
    //const users = await User.find();
    const users = await User.find({
      relations: {
        bookings: true,
      },
    });

    return res.json(users);
  } catch (error) {
    console.log("error");
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: parseInt(id) },
      relations: ["bookings"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = new User();
  user.username = username;
  user.password = await createHash(password);

  await user.save();

  return res.status(201).json({
    message: "User successfully created",
    user: user.username,
  });
};

const createHash = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const passwordHash = await createHash(password);

  try {
    const user = await User.findOneBy({ id: parseInt(id) });
    if (!user) return res.status(404).json({ message: "Not user found" });

    await User.update(
      { id: parseInt(id) },
      { password: passwordHash, username }
    );
    //await User.update({ id: parseInt(id) }, req.body);

    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await User.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "User not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
