import {
  getSessionResults,
  startLivenessSession,
} from "@/services/face-liveness";
import { Router } from "express";

const router = Router();

export { router };

router.post("/start-liveness-session", startLivenessSession);
router.get("/get-session-results?sessionId=", getSessionResults);
