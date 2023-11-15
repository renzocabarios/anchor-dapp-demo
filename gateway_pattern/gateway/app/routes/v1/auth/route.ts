import { Router } from "express";
import { authenticate } from "./controller.js";

const router = Router();

router.route("/login").post(authenticate);

export default router;
