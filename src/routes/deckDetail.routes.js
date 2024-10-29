import { Router } from "express";
import {
  getDeckDetail,
  getCardsByDeck,
  getCardsForReview,
} from "../controllers/deckDetail.controller.js";

const router = Router();

router.get("/deck/:userId/:deckId", getDeckDetail);
router.get("/deck/cards/:userId/:deckId", getCardsByDeck);
router.get("/study/cards/:userId/:deckId", getCardsForReview);

export default router;
