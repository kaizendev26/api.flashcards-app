import express from "express";
import cors from "cors";
import decksRoutes from "./routes/decks.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", decksRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

export default app;
