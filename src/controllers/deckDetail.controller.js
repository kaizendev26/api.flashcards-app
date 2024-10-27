import { pool } from "../db.js";

export const getDeckDetail = async (req, res) => {
  try {
    const { userId, deckId } = req.params;
    console.log(req.params);

    const [rows] = await pool.query("call getDeckDetail(?,?)", [
      userId,
      deckId,
    ]);
    console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getCardsByDeck = async (req, res) => {
  try {
    const { userId, deckId } = req.params;
    console.log(req.params);

    const [rows] = await pool.query("call getCardsByDeck(?,?)", [
      userId,
      deckId,
    ]);
    console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
