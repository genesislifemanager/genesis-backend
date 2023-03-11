import express from "express";
import { getAllUsers, createUser, getUserById } from "../controllers/userController";

const userRouter = express.Router();


userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUserById);


export default userRouter;