import { Router } from "express";

import { loginSchema } from "./auth.schema";
import * as AuthController from "./auth.controller";
import { verifyInput } from "@/middlewares/verifyinput.middleware";

const router = Router();

router.post("/login", verifyInput(loginSchema), AuthController.login);
router.get("/refresh", AuthController.refreshToken);

export default router;
