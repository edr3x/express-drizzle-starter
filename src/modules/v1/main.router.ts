import { Router } from "express";

import userRouter from "./user/user.routes";
import authRouter from "./auth/auth.routes";
import postRouter from "./post/post.routes";

import { isAuthenticated } from "@/middlewares/auth.middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", isAuthenticated, postRouter);

export default router;
