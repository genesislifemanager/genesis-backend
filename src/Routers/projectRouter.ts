import express from "express";
import { getAllProjects,createProject,getProjectById, updateProjectById,deleteProjectById } from "../controllers/projectController";

const projectRouter = express.Router();

projectRouter.route('/').get(getAllProjects).post(createProject);
projectRouter.route('/:id').get(getProjectById).put(updateProjectById).delete(deleteProjectById);;


export default projectRouter;