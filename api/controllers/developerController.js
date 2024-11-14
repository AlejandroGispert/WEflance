import ProjectDeveloperService from "../services/projectDeveloperService.js";

class DeveloperController {
  static async getAllDevelopers(req, res) {
    try {
      const developers = await ProjectDeveloperService.getAllDevelopers();
      res.status(200).json(developers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getClients(req, res) {
    try {
      const allClients = await ProjectDeveloperService.getAllClients();
      res.status(200).json(allClients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async assignDeveloper(req, res) {
    const { PJid, DEVid } = req.body;
    try {
      const result = await ProjectDeveloperService.assignDeveloperToProject(
        PJid,
        DEVid
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getDevelopersForProject(req, res) {
    const { PJid: projectId } = req.params;
    try {
      const developers =
        await ProjectDeveloperService.getDevelopersForProject(projectId);
      res.status(200).json(developers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removeDeveloper(req, res) {
    const { PJid: projectId, DEVid: developerId } = req.params;
    try {
      const result = await ProjectDeveloperService.removeDeveloperFromProject(
        projectId,
        developerId
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
export default DeveloperController;
