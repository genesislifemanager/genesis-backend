import express from "express";
import { getAllVentures, createVenture, getVentureById, updateVentureById, deleteVentureById } from "../controllers/ventureController";

const ventureRouter = express.Router();

ventureRouter.route('/:user').get(getAllVentures).post(createVenture);
ventureRouter.route('/:user/:id').get(getVentureById).put(updateVentureById).delete(deleteVentureById);

export default ventureRouter;
