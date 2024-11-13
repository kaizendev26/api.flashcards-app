import { Router } from "express";
import {
  authUser,
  registerUser,
} from "../controllers/authentication.controller.js";

const router = Router();

router.post("/user/login", authUser);
router.post("/user/register", registerUser);

export default router;
