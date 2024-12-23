import express from "express";
import TimelineController from "../../controllers/timelineController.js";

const timelineRouter = express.Router();

timelineRouter.get("/project/:id/", TimelineController.getTimelineEventsByProject);
timelineRouter.post("/", TimelineController.createTimelineEvent);
timelineRouter.put("/:id", TimelineController.updateTimelineEvent);
timelineRouter.delete("/:id", TimelineController.deleteTimelineEvent);

export default timelineRouter;
