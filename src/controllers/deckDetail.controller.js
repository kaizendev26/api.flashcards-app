import { pool } from "../db.js";
import { formatDistance, subDays, parseISO } from "date-fns";

export const getDeckDetail = async (req, res) => {
  try {
    const { userId, deckId } = req.params;
    console.log(req.params);

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

export const deckExist = async (req, res) => {
  try {
    const { userId, deckId } = req.params;
    console.log(req.params);
    const [rows] = await pool.query("call deckExist(?,?)", [userId, deckId]);
    // console.log(rows);
    res.json(rows[0][0]);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getCardsByDeck = async (req, res) => {
  try {
    const { userId, deckId, pageInit } = req.params;

    // console.log(pageInit);

    const [rows] = await pool.query("call getCardsByDeck2(?,?,?)", [
      userId,
      deckId,
      pageInit,
    ]);

    const now = new Date();

    const cardsByDeck = rows[0].map((card) => {
      let timeUntil = "";
      const dueDate = new Date(card.dueDate);
      if (card.dueDate != null && dueDate < now) {
        timeUntil = "Study again";
      } else {
        timeUntil =
          card.dueDate != null
            ? formatDistance(dueDate, now, {
                addSuffix: true,
              })
            : "";
      }

      return {
        ...card,
        timeUntil,
      };
    });

    console.log(cardsByDeck);

    res.json(cardsByDeck);
  } catch (error) {
    console.log(error);
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

export const getCardsForToday = async (req, res) => {
  try {
    const { userId, deckId } = req.params;
    // console.log(req.params);

    const [rows] = await pool.query("call getCardsForToday(?,?)", [
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
    console.log(req.params);

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

export const addCard = async (req, res) => {
  try {
    const { deckId, front, back } = req.body;
    const [rows] = await pool.query("call addCard(?,?,?)", [
      deckId,
      front,
      back,
    ]);
    const response = rows[0];
    console.log(response);

    res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
