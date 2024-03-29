import { Request, Response } from "express";
import { prisma } from "../index";
import dayjs from "dayjs";

//* Controller function to retrieve all timeblocks for a given user 
export const getAllTimeBlocks = async (req: Request, res: Response) => {
  const {user} = req.params;
  
  const timeblocks = await prisma.timeblock.findMany({
    where:{
      uid:user
    }
  });  

  res.status(200).json({
    status: "success",
    timeblocks: timeblocks,
  });
};

//* Controller function to create a new timeblock for a specific user based on a request from the front-end
export const createTimeblock = async (req: Request, res: Response) => {
  const {user} = req.params;
  const { name, type, mode, s, duration, projectId, reminder } = req.body;
  
  const stime = dayjs(s);
  const etime = stime.add(duration.h, "h").add(duration.m, "m");

  const newTimeblock = await prisma.timeblock.create({
    data: {
      uid:user,
      name: name,
      type: type,
      mode: mode,
      s: stime.toDate(),
      duration: duration,
      e: etime.toDate(),
      projectId: projectId,
      reminder: reminder,
      status: 'open',
    },
  });

  res.status(201).json({
    status: "success",
    newTimeblock: newTimeblock,
  });
};

//* Controller function to retrieve a timeblock for a user based on its id
export const getTimeblockById = async (req: Request, res: Response) => {
  const { user,id } = req.params;
  

  const timeblock = await prisma.timeblock.findFirst({
    where: {
      uid: user,
      id: parseInt(id, 10),
    },
  });
  console.log(timeblock);
  

  res.status(200).json({
    status: "success",
    timeblock: timeblock,
  });
};

//* Controller function to update a timeblock for a user based on its id
export const updateTimeblockById = async (req: Request, res: Response) => {
  const { user,id } = req.params;

  const { name, type, mode, s, duration, projectId, reminder,status } = req.body;

  const stime = dayjs(s);
  const etime = stime.add(duration.h, "h").add(duration.m, "m");

  const updatedTimeblock = await prisma.timeblock.updateMany({
    where: {
      AND:[
        {uid:user},
        {id: parseInt(id, 10)},
      ],
    },
    data: {
      name: name,
      type: type,
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

//* Controller function to delete a timeblock for a user based on its id
export const deleteTimeblockById = async (req: Request, res: Response) => {
  const { user, id } = req.params;
  

  const deletedTimeblock = await prisma.timeblock.deleteMany({
    where: {
      AND:[
        {uid:user},
        {id: parseInt(id, 10)},
      ],
    },
  });

  res.status(204).json({
    status: "success",
    deletedTimeblock: deletedTimeblock,
  });
};

//* Controller function to retreive timeblock for a user pertaining to a specific date 
export const getTimeBlocksByDate = async (req: Request, res: Response) => {
  const { user,date } = req.params;
  console.log(req.params);  
  
  const {status} = req.query as {status:string};

  //* remove the time values from date object
  const selectedDate = dayjs(JSON.parse(date))
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);
  
  //* get the next date 
  const nextDate  = selectedDate.add(1,'day');
  
  const timeblocksForDate = await prisma.timeblock.findMany({
    where: {
      s: {
        lt: nextDate.toDate(), //* find timeblocks in the duration within the day
        gt: selectedDate.toDate(),
      },
      status: status,
      uid:user
    },
    orderBy:{
      s:'asc'
    }
  });
  console.log(timeblocksForDate);
  

  res.status(200).json({
    status: "success",
    timeblocks: timeblocksForDate,
  });
};
