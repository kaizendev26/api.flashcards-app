import { Router } from "express";
import { getDecks, addDeck } from "../controllers/decks.controller.js";

const router = Router();

router.get("/decks/:userId", getDecks);

router.post("/decks", addDeck);

export default router;
