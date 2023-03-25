import { Request, Response } from "express";
import { prisma } from "../index";
import dayjs from "dayjs";

export const getAllProjects = async (req: Request, res: Response) => {
  const { user } = req.params;
  
  const projects = await prisma.project.findMany({
    where: {
      uid: user,
    },
    
    orderBy:{
      id: "asc",
    },
  });

  res.status(200).json({
    status: "success",
    projects: projects,
  });
};

export const createProject = async (req: Request, res: Response) => {
  const { user } = req.params;
  const { id, name, status, due, duration,ventureId } = req.body;

  console.log(user, req.body);

 if(id){
  const newProject = await prisma.project.create({
    data:{
    id:id,
    uid: user,
    name,
    duration: duration ? duration : undefined,
    due: due ? dayjs(due).toDate() : null,
    status,
    ventureId:ventureId,
    },
  });
  res.status(201).json({
    status: "success",
    data: newProject,
  });
}else{
  const newProject = await prisma.project.create({
    data: {
      uid: user,
      name,
      duration: duration ? duration :undefined,
      due: due ? dayjs(due).toDate() : null,
      status,
      ventureId: ventureId,
    },
  });
  res.status(201).json({
    status: "success",
    data: newProject,
  });
 }
};

export const getProjectById = async (req: Request, res: Response) => {
  const { user,id } = req.params;

  const project = await prisma.project.findFirst({
    where: {
      uid: user,
      id: parseInt(id, 10),
    },
  });

  res.status(200).json({
    status: "success",
    project: project,
  });
};

export const updateProjectById = async (req: Request, res: Response) => {
  const { user, id } = req.params;
  const { name, status, due, duration,ventureId } = req.body;

  const updatedProject = await prisma.project.updateMany({
    where: {
      AND: [{ uid: user }, { id: parseInt(id, 10) }],
    },
    data: {
      name,
      duration,
      due: dayjs(due).toDate(),
      status,
      ventureId:ventureId,
    },
  });

  res.status(200).json({
    status: "success",
    updatedProject: updatedProject,
  });
};

export const deleteProjectById = async (req: Request, res: Response) => {
  const { user,id } = req.params;

  const timeblocksOfProject = await prisma.timeblock.updateMany({
    where:{
      AND: [{uid: user }, {projectId: parseInt(id, 10)}],
    },
    data:{
      projectId:-1
    },
  });
  

  const deletedProject = await prisma.project.deleteMany({
    where: {
      AND: [{uid: user }, {id: parseInt(id, 10)}],
    },
  });

  res.status(204).json({
    status: "success",
    deletedProject: deletedProject,
  });
};
