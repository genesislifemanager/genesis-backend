import { Request, Response } from "express";
import { prisma } from "./../index";
import { z } from "zod";

const createCustomerBody = z.object({
  custName: z.string(),
  custSurname: z.string(),
  custEmail: z.string(),
  custMobileNumber: z.string(),
});

export const getAllCustomers = async (req: Request, res: Response) => {
  const customers = await prisma.customer.findMany();

  res.status(200).json({
    status: "success",
    data: customers,
  });
};

export const createCustomer = async (req: Request, res: Response) => {
  createCustomerBody.parse(req.body);
  const { custName, custSurname, custEmail, custMobileNumber } = req.body;

  const newCustomer = await prisma.customer.create({
    data: {
      custName: custName,
      custSurname: custSurname,
      custEmail: custEmail,
      custMobileNumber: custMobileNumber,
    },
  });

  res.status(201).json({
    status: "success",
    data: newCustomer,
  });
};


export const getCustomerById = async (req: Request, res: Response) => {
  const {id} = req.params; 
  const customer = await prisma.customer.findFirst({
    where:{
      custNo: parseInt(id),
    }
  })

  res.status(200).json({
    status: "success",
    customer,
  });
}