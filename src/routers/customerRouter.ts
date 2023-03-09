import express from "express";
import { getAllCustomers, createCustomer,getCustomerById } from "../controllers/customerController";
    
const customerRouter = express.Router();


customerRouter.route('/').get(getAllCustomers).post(createCustomer);
customerRouter.route('/:id').get(getCustomerById);


export default customerRouter;