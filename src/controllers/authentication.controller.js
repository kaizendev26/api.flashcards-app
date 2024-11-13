import { pool } from "../db.js";
import bcrypt from "bcrypt";

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const [rows] = await pool.query("call authUser(?)", email);

    const user = rows[0][0];
    console.log(user);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passWordCorrect = await comparePassword(
      password.trim(),
      user.passwordHash.trim()
    );

    if (passWordCorrect) {
      return res.send(user);
    } else {
      return res.status(401).json({ error: "Incorrect credentials" });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await hashPassword(password);

    const [rows] = await pool.query("call registerUser(?,?,?)", [
      username,
      email,
      passwordHash,
    ]);
    const userId = rows[0];

    if (!userId) {
      return res.status(401).json({ message: "User already exists" });
    }
    console.log(userId);
    return res.send(userId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
