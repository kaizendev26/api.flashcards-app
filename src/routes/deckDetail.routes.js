import { Router } from "express";
import {
  getDeckDetail,
  deckExist,
  getCardsByDeck,
  getCardsForReview,
  saveChangeStudy,
  hasCardsForReview,
  getNextReviewDate,
  getCardsForToday,
  addCard,
  editCard,
  deleteCard,
  deleteDeck,
  resetProgress
} from "../controllers/deckDetail.controller.js";

const router = Router();

router.get("/deck/cards-by-deck/:userId/:deckId/:pageInit", getCardsByDeck);
router.get("/deck/cards-for-today/:userId/:deckId", getCardsForToday);
router.get("/has/cards-for-review/:userId/:deckId", hasCardsForReview);
router.get("/deck/next-review-date/:userId/:deckId", getNextReviewDate);
router.get("/study/review-cards/:userId/:deckId", getCardsForReview);

router.get("/deckDetail/:userId/:deckId", getDeckDetail);
router.get("/has/deck/:userId/:deckId", deckExist);

router.post("/study/cards/update", saveChangeStudy);
router.post("/deckDetail/add-card", addCard);
router.post("/deck-config/reset-progress", resetProgress);
router.put("/deck-detail/card/edit-card", editCard);
router.put("/deck-detail/card/delete-card", deleteCard);
router.put("/deck-detail/delete-deck", deleteDeck);

export default router;
