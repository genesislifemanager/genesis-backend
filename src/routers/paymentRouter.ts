import express from "express";
import { getAllPayments } from "../controllers/paymentContorller";
const paymentRouter = express.Router();


paymentRouter.route('/').get(getAllPayments);

export default paymentRouter;