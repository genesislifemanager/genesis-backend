
import express, { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import projectRouter from "./routers/projectRouter";
import timeblockRouter from "./routers/timeblockRouter";
import userRouter from "./routers/userRouter";
import ventureRouter from "./routers/ventureRouter";
export const prisma = new PrismaClient();
const cors  = require("cors");

const app = express();

// allow requests from a specific origin
const allowedOrigins = ['http://localhost:5173','https://genesisoftware.vercel.app/','https://genesis-frontend-sigma.vercel.app'];

const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

//! Global Midlleware
app.use(cors(corsOptions));
app.use(express.json());

//! Mount Routers
app.use("/api/projects",projectRouter);
app.use("/api/timeblocks",timeblockRouter)
app.use("/api/users", userRouter);
app.use("/api/ventures", ventureRouter);

const port = process.env.PORT || 5174

const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`)
);
