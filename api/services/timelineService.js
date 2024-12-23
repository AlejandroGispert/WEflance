import TimelineEvents from "../models/timelineEvents.js";

class TimelineService {
  static async getTimelineEventsByProject(id) {
    try {
      const timelineEvents = await TimelineEvents.findAll({ where: { projectId: id } });

      if (!timelineEvents || timelineEvents.length === 0) {
        return { error: "Timeline events not found" };
      }

      return timelineEvents;
    } catch (error) {
      return { error: error.message };
    }
  }

  static async createTimelineEvent(data) {
    try {
      const newTimelineEvent = await TimelineEvents.create(data);
      return newTimelineEvent;
    } catch (error) {
      throw new Error("Error creating timeline event: " + error.message);
    }
  }
  static async updateTimelineEvent(id, updatedData) {
    try {
      const timelineEvent = await TimelineEvents.findByPk(id);
      if (!timelineEvent) {
        return { error: "Timeline event not found" };
      }
      const updatedTimelineEvent = await timelineEvent.update(updatedData);
      return updatedTimelineEvent;
    } catch (error) {
      return { error: error.message };
    }
  }
  static async deleteTimelineEvent(id) {
    try {
      const timelineEvent = await TimelineEvents.findByPk(id);
      if (!timelineEvent) {
        return { error: "Timeline event not found" };
      }
      await timelineEvent.destroy();
      return { message: "Timeline event deleted successfully" };
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default TimelineService;
