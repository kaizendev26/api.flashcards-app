import { pool } from "../db.js";

export const getDecks = async (req, res) => {
  try {
    const userId = req.params?.userId;
    console.log(req.params);
    const [rows] = await pool.query("call getDecks(?)", userId);
    console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const addDeck = async (req, res) => {
  try {
    const { userId, deck } = req.body;
    const [rows] = await pool.query("call addDeck(?,?)", [userId, deck]);
    console.log(rows);
    if (rows.affectedRows <= 0) return res.status(404).json({ message: 0 });
    res.send({
      response: rows.affectedRows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
