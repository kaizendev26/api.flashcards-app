import { pool } from "../db.js";
import { formatDistance, subDays, parseISO } from "date-fns";

export const getDeckDetail = async (req, res) => {
  try {
    const { userId, deckId } = req.params;
    // console.log(req.params);

    const [rows] = await pool.query("call getDeckDetail(?,?)", [
      userId,
      deckId,
    ]);
    // console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getCardsByDeck = async (req, res) => {
  try {
    const { userId, deckId } = req.params;
    // console.log(req.params);

    const [rows] = await pool.query("call getCardsByDeck(?,?)", [
      userId,
      deckId,
    ]);
    // console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getCardsForReview = async (req, res) => {
  try {
    const { userId, deckId } = req.params;
    // console.log(req.params);

    const [rows] = await pool.query("call getCardsForReview(?,?)", [
      userId,
      deckId,
    ]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const saveChangeStudy = async (req, res) => {
  try {
    const { cards } = req.body;
    const jsonCards = JSON.stringify(cards);
    const [rows] = await pool.query("call saveChangesStudy(?)", [jsonCards]);
    const [response] = rows[0];

    res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const hasCardsForReview = async (req, res) => {
  try {
    const { userId, deckId } = req.params;
    // console.log(req.params);

    const [rows] = await pool.query("call hasCardsToReview(?,?)", [
      userId,
      deckId,
    ]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getNextReviewDate = async (req, res) => {
  try {
    const { userId, deckId } = req.params;

    const [rows] = await pool.query("call getNextReviewDate(?,?)", [
      userId,
      deckId,
    ]);

    const { dueDate } = rows[0][0];

    const timeUntil = formatDistance(dueDate, new Date(), { addSuffix: true });

    res.json(timeUntil);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
