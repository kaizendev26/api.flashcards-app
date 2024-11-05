import { Router } from "express";
import {
  getDeckDetail,
  getCardsByDeck,
  getCardsForReview,
  saveChangeStudy,
  hasCardsForReview,
  getNextReviewDate,
} from "../controllers/deckDetail.controller.js";

const router = Router();

router.get("/deck/:userId/:deckId", getDeckDetail);
router.get("/deck/cards/:userId/:deckId", getCardsByDeck);
router.get("/deck/cards/review/:userId/:deckId", hasCardsForReview);
router.get("/deck/cards/next-review/:userId/:deckId", getNextReviewDate);
router.get("/study/cards/:userId/:deckId", getCardsForReview);
router.post("/study/cards/update", saveChangeStudy);

export default router;
