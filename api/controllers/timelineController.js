import TimelineService from "../services/timelineService.js";

class TimelineController {
  static async getTimelineEventsByProject(req, res) {
    try {
      const timelineEvents = await TimelineService.getTimelineEventsByProject(req.params.id);
      res.status(200).json(timelineEvents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createTimelineEvent(req, res) {
    try {
      const newTimelineEvent = await TimelineService.createTimelineEvent(req.body);
      res.status(201).json(newTimelineEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateTimelineEvent(req, res) {
    try {
      const updatedTimelineEvent = await TimelineService.updateTimelineEvent(req.params.id, req.body);
      res.status(200).json(updatedTimelineEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async deleteTimelineEvent(req, res) {
    try {
      const deletedTimelineEvent = await TimelineService.deleteTimelineEvent(req.params.id);
      res.status(200).json(deletedTimelineEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default TimelineController;
