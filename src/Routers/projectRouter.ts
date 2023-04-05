import express from "express";
import { getAllProjects,createProject,getProjectById, updateProjectById,deleteProjectById } from "../controllers/projectController";

const projectRouter = express.Router();

//* Define routes for the project resource 
projectRouter.route('/:user').get(getAllProjects).post(createProject);
projectRouter.route('/:user/:id').get(getProjectById).put(updateProjectById).delete(deleteProjectById);;


export default projectRouter;