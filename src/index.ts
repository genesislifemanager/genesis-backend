
import express, { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
const cors  = require("cors");

const app = express();

//! Global Midlleware
app.use(cors());
app.use(express.json());

//! Mount Routers


const server = app.listen(5174, () =>
  console.log(`
🚀 Server ready at: http://localhost:5174`)
);
