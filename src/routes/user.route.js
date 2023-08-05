import express from "express";
const userRouter = express.Router();
import {
  userSignUp,
  userSignIn,
  userNewPost,
} from "../controllers/user.controller.js";
import { postUploadFile } from "../middlewares/MulterErrorHandle.middleware.js";
import { authenticateUser } from "../middlewares/authenticateUser.middleware.js";

//json middleware
userRouter.use(express.json());
// userRouter.use(express.urlencoded({ extended: true }));

userRouter.post("/signup", userSignUp);

userRouter.post("/signin", userSignIn);

userRouter.post("/new-post", authenticateUser, postUploadFile, userNewPost);

export default userRouter;
