import express from "express";
import cors from "cors";
import decks from "./routes/decks.routes.js";
import deckDetail from "./routes/deckDetail.routes.js";
import authentication from "./routes/authentication.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", authentication);
app.use("/api", decks);
app.use("/api", deckDetail);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

export default app;
