import {Request, Response } from "express"
import { prisma } from "../index"
import dayjs from "dayjs"

export const getAllTimeBlocks = async (req:Request, res: Response) => {
    const timeblocks = await prisma.timeblock.findMany();

    res.status(200).json({
        status: "success",
        timeblocks: timeblocks,
    });

};

export const createTimeblock = async (req: Request, res: Response) => {
  const { name, type, mode, s, duration, projectId, reminder } = req.body;

  const stime = dayjs(s);
  const etime = stime.add(duration.h, "h").add(duration.m, "m");

  const newTimeblock = await prisma.timeblock.create({
    data: {
        name: name,
        type: type,
        mode: mode,
        s: stime.toDate(),
        duration: duration,
        e: etime.toDate(),
        projectId: projectId,
        reminder: reminder,
        status: 'open'
    },
  });

  res.status(201).json({
    status: "success",
    newTimeblock: newTimeblock,
  });
};

export const getTimeblockById = async (req: Request, res: Response)  => {
    const { id } = req.params;

    const timeblock = await prisma.timeblock.findFirst({
        where: {
            id: parseInt(id, 10),
        },
    });

    res.status(200).json({
        status: "success",
        timeblock: timeblock,
    });
};

export const updateTimeblockById = async (req:Request, res: Response) => {
    const { id } = req.params;

    const { name, type, mode, s, duration, projectId, reminder, status } = req.body;

    const stime = dayjs(s);
    const etime = stime.add(duration.h, "h").add(duration.m, "m");

    const updatedTimeblock = await prisma.timeblock.update({
        where: {
            id: parseInt(id, 10),
        },
        data: {
            name:name,
            type:type,
            mode: mode,
            s: stime.toDate(),
            duration: duration,
            e: etime.toDate(),
            projectId: projectId,
            reminder: reminder,
            status: status,
        },
    });

    res.status(200).json({
        status: "success",
        updatedTimeblock: updatedTimeblock,
    });
};

export const deleteTimeblockById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedTimeblock = await prisma.timeblock.delete({
        where: {
          id: parseInt(id, 10),
        },
    });

    res.status(204).json({
        status: "success",
        deletedTimeblock: deletedTimeblock,
    });
};


export const getTimeBlocksByDate = async (req: Request, res: Response) => {
    const { date } = req.params;
    const {status} = req.query as {status:string};
  
  
    const selectedDate = dayjs(JSON.parse(date))
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    
    const nextDate  = selectedDate.add(1,'day');
    
    const timeblocksForDate = await prisma.timeblock.findMany({
      where: {
        s: {
          lt: nextDate.toDate(),
          gt: selectedDate.toDate(),
        },
        status: status,
      },
      orderBy:{
        s:'asc'
      }
    });

    res.status(200).json({
        status: "success",
        timeblocks: timeblocksForDate,
      });
    };