
import express, { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();


const app = express();

//! Global Midlleware
app.use(express.json());

//! Mount Routers


const server = app.listen(5174, () =>
  console.log(`
🚀 Server ready at: http://localhost:5174`)
);
