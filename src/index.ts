
import express, { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import projectRouter from "./Routers/projectRouter";
import timeblockRouter from "./Routers/timeblockRouter";
import userRouter from "./Routers/userRouter";
import ventureRouter from "./Routers/ventureRouter";
export const prisma = new PrismaClient();
const cors  = require("cors");

const app = express();

//! Global Midlleware
app.use(cors());
app.use(express.json());

//! Mount Routers
app.use("/api/projects",projectRouter);
app.use("/api/timeblocks",timeblockRouter)
app.use("/api/users", userRouter);
app.use("/api/ventures", ventureRouter);

const port = process.env.PORT || 5174

const server = app.listen(5174, () =>
  console.log(`
🚀 Server ready at: http://localhost:5174`)
);
