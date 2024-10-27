import express from "express";
import cors from "cors";
import decksRoutes from "./routes/decks.routes.js";
import deckDetail from "./routes/deckDetail.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", decksRoutes);
app.use("/api", deckDetail);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

export default app;
