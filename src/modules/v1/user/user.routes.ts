import { Router } from "express";

import { verifyInput } from "@/middlewares/verifyinput.middleware";

import { createUserSchema } from "./user.schema";
import * as UserController from "./user.controller";
import { isAuthenticated, requireAdmin } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/me", isAuthenticated, UserController.getMe);

router.get("/", isAuthenticated, requireAdmin, UserController.getUser);
router.get("/:id", isAuthenticated, requireAdmin, UserController.getUserById);
router.post("/", verifyInput(createUserSchema), UserController.createUser);
router.delete("/:id", requireAdmin, UserController.deleteUser);

export default router;
