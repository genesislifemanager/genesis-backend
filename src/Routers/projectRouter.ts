import express from "express";
import { getAllProjects,createProject,getProjectById, updateProjectById,deleteProjectById } from "../Controllers/projectController";

const projectRouter = express.Router();

projectRouter.route('/').get(getAllProjects).post(createProject);
projectRouter.route('/:id').get(getProjectById).put(updateProjectById).delete(deleteProjectById);;


export default projectRouter;