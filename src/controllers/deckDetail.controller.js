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
      console.log(card.dueDate)
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

      // console.log({...card,timeUntil});

      return {
        ...card,
        timeUntil,
      };
    });

    

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
    

    const _dueDate = new Date(dueDate)
    console.log(_dueDate);

    const timeUntil = formatDistance(_dueDate, new Date(), { addSuffix: true });

    res.json(timeUntil);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const addCard = async (req, res) => {
  try {
    const { userId, deckId, front, back } = req.body;
    const [rows] = await pool.query("call addCard(?,?,?,?)", [
      userId,
      deckId,
      front,
      back,
    ]);
    const response = rows[0];

    res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const editCard = async (req, res) => {
  try {
    const { userId, deckId,cardId, front, back } = req.body;
    const [rows] = await pool.query("call updateCard(?,?,?,?,?)", [
      userId,
      deckId,
      cardId,
      front,
      back,
    ]);
    const {rows_affected} = rows[0][0];
    console.log(rows_affected);
    if (rows_affected > 0) return res.status(200).send(true)
    
    return res.send(false);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { userId, deckId,cardId} = req.body;
    const [rows] = await pool.query("call deleteCard(?,?,?)", [
      userId,
      deckId,
      cardId
    ]);
    const {rows_affected} = rows[0][0];
    console.log(rows_affected);
    if (rows_affected > 0) return res.status(200).send(true)
    
    return res.send(false);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const deleteDeck = async (req, res) => {
  try {
    const { userId, deckId} = req.body;
    const [rows] = await pool.query("call deleteDeck(?,?)", [
      userId,
      deckId
    ]);
    const {success} = rows[0][0];

    if(success === "success") return res.status(200).send(true)

    return res.send(false);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const resetProgress = async (req, res) => {
  try {
    const { userId, deckId} = req.body;
    const [rows] = await pool.query("call resetDeck(?,?)", [
      userId,
      deckId
    ]);
    const response = rows[0];

    res.send(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
}
