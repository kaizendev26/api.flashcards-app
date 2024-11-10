import { Router } from "express";
import {
  getDecks,
  addDeck,
  importDeck,
} from "../controllers/decks.controller.js";

const router = Router();

router.get("/decks/:userId", getDecks);
router.post("/decks", addDeck);
router.post("/decks/import", importDeck);

export default router;
