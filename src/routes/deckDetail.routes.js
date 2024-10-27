import { Router } from "express";
import {
  getDeckDetail,
  getCardsByDeck,
} from "../controllers/deckDetail.controller.js";

const router = Router();

router.get("/deck/:userId/:deckId", getDeckDetail);
router.get("/deck/cards/:userId/:deckId", getCardsByDeck);

export default router;
