
import express, { Request, Response } from "express";
import customerRouter from "./routers/customerRouter";
import paymentRouter from "./routers/paymentRouter";
import { Prisma, PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();


const app = express();

//! Global Midlleware
app.use(express.json());

//! Mount Routers
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/payments", paymentRouter);


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
);
