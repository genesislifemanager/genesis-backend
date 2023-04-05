import express from "express";
import { getAllUsers, createUser, getUserById } from "../controllers/userController";

const userRouter = express.Router();

//* Define routes for the user resource
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUserById);


export default userRouter;