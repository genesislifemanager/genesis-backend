import { Request, Response } from "express";

export const getAllPayments = async (req: Request, res: Response) => {
  res.json({
    status: 'success',
  });
};
