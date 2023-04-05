import express from "express";
import { getAllTimeBlocks,createTimeblock,getTimeblockById,updateTimeblockById,deleteTimeblockById,getTimeBlocksByDate } from "../controllers/timeblockController";
    
const timeblockRouter = express.Router();

//* Define routes for the timeblocks resource
timeblockRouter.route('/:user').get(getAllTimeBlocks).post(createTimeblock);
timeblockRouter.route('/:user/:id').get(getTimeblockById).put(updateTimeblockById).delete(deleteTimeblockById);
timeblockRouter.route('/:user/date/:date').get(getTimeBlocksByDate);

export default timeblockRouter;