import express from "express";
import { getAllTimeBlocks,createTimeblock,getTimeblockById,updateTimeblockById,deleteTimeblockById,getTimeBlocksByDate } from "../controllers/timeblockController";
    
const timeblockRouter = express.Router();


timeblockRouter.route('/').get(getAllTimeBlocks).post(createTimeblock);
timeblockRouter.route('/:id').get(getTimeblockById).put(updateTimeblockById).delete(deleteTimeblockById);
timeblockRouter.route('/date/:date').get(getTimeBlocksByDate);

export default timeblockRouter;