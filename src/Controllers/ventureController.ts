import { Request, Response } from "express";
import { prisma } from "../index";
import dayjs from "dayjs";

export const getAllVentures = async (req: Request, res: Response) => {
    const ventures = await prisma.venture.findMany({
        include:{
            projects:{
                select:{
                    id:true,
                    name:true
                }
            }
        }
    });

    res.status(200).json({
        status: "success",
        ventures: ventures,
    });
};

export const createVenture = async (req: Request, res: Response) => {
    const { name } =req.body;

    const newVenture = await prisma.venture.create({
        data: {
            name,
        },
    });

    res.status(201).json({
        status: "success",
        newVenture: newVenture,
    });
};

export const getVentureById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const venture = await prisma.venture.findFirst({
        where: {
            id: parseInt(id, 10),
        },
        include:{
            projects:{
                select:{
                    id:true,
                    name:true
                }
            }
        }
    });

    res.status(200).json({
        status: "success",
        venture: venture,
    });
};

export const updateVentureById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const updatedVenture = await prisma.venture.update({
        where: {
            id: parseInt(id, 10),
        },
        data: {
            name,
        },
    });

    res.status(200).json({
        status: "success",
        updatedVenture: updatedVenture,
    });
};

export const deleteVentureById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const projectsOfVenture = await prisma.project.updateMany({
        where:{
            ventureId: parseInt(id, 10)
        },
        data:{
            ventureId: -1
        }
    });

    const deletedVenture = await prisma.venture.delete({
        where: {
            id: parseInt(id, 10),
        },
    });

    res.status(204).json({
        status: "success",
        deletedVenture: deletedVenture,
    });
};
