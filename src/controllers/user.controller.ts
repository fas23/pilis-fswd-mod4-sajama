import { Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    return res.status(200).json({ message: "User successfully eliminated" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//signin

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your username and password" });
  }

  const user = await User.findOneBy({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ msg: "The User does not exists" });
  }

  console.log(user);

  const isMatch = await comparePassword(user, req.body.password);
  console.log(isMatch);
  if (isMatch) {
    return res.status(200).json({ credentials: createToken(user) });
  }

  return res.status(400).json({
    msg: "The email or password are incorrect",
  });
};

//signup

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your username and password" });
  }

  const user = await User.findOneBy({ username: req.body.username });
  if (user) {
    return res.status(400).json({ msg: "The User already Exists" });
  }

  const newUser = new User();
  newUser.username = req.body.username;
  newUser.password = await createHash(req.body.password);
  await newUser.save();
  return res.status(201).json({
    message: "User successfully created",
    user: newUser.username,
  });
};

// Bcrypt

const createHash = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (
  user: User,
  password: string
): Promise<Boolean> => {
  return await bcrypt.compare(password, user.password);
};

//jwt

const jwtSecret = "somesecrettoken";
const jwtRefreshTokenSecret = "somesecrettokenrefresh";
let refreshTokens: (string | undefined)[] = [];

const createToken = (user: User) => {
  // Se crean el jwt y refresh token
  const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: 60 * 60 * 24,
  });
  const refreshToken = jwt.sign(
    { username: user.username },
    jwtRefreshTokenSecret,
    {
      expiresIn: "90d",
    }
  );

  refreshTokens.push(refreshToken);
  return {
    token,
    refreshToken,
  };
};
