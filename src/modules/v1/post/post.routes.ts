import { Router } from "express";

import { createPostSchema } from "./post.schema";
import * as postController from "./post.controller";

import { verifyInput } from "@/middlewares/verifyinput.middleware";

const router = Router();

router.get("/", postController.getMyPosts);
router.post("/", verifyInput(createPostSchema), postController.createPost);

export default router;
