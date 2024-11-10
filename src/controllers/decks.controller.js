import { cs } from "date-fns/locale";
import { pool } from "../db.js";

export const getDecks = async (req, res) => {
  try {
    const userId = req.params?.userId;
    console.log(req.params);
    const [rows] = await pool.query("call getDecks(?)", userId);
    // console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const addDeck = async (req, res) => {
  try {
    const { userId, deck } = req.body;
    const [rows] = await pool.query("call addDeck(?,?)", [userId, deck]);
    // console.log(rows);
    if (rows.affectedRows <= 0) return res.status(404).json({ message: 0 });
    res.send({
      response: rows.affectedRows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const importDeck = async (req, res) => {
  try {
    const { userId, deck, csv } = req.body;

    const rows = csv
      .split("\n")
      .map((row) => row.trim())
      .filter((row) => row !== "");

    const csvSplited = rows.slice(1, rows.length + 1);
    const csvArray = csvSplited.map((row) => {
      const fields = row.split(",");
      return {
        front: fields[0],
        back: fields[1],
      };
    });
    console.log(deck);
    console.log(csvArray);
    const csvString = JSON.stringify(csvArray);

    const [response] = await pool.query("call importDeck(?,?,?)", [
      userId,
      deck,
      csvString,
    ]);

    // if (rows.affectedRows <= 0) return res.status(404).json({ message: 0 });
    res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
