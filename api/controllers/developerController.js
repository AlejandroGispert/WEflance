// src/controllers/developerController.js
import ProjectDeveloperService from "../services/projectDeveloperService.js";

class DeveloperController {
  static async assignDeveloper(req, res) {
    const { pjId, devId } = req.body;
    try {
      const result = await ProjectDeveloperService.assignDeveloperToProject(
        pjId,
        devId
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getDevelopersForProject(req, res) {
    const { pjId: projectId } = req.params;
    try {
      const developers =
        await ProjectDeveloperService.getDevelopersForProject(projectId);
      res.status(200).json(developers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllDevelopers(req, res) {
    try {
      const developers = await ProjectDeveloperService.getAllDevelopers();
      res.status(200).json(developers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async removeDeveloper(req, res) {
    const { pjId: projectId, devId: developerId } = req.params;
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

  static async getClients(req, res) {
    try {
      const allClients = await ProjectDeveloperService.getAllClients();
      res.status(200).json(allClients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getProjectClient(req, res) {
    const { pjId: projectId } = req.params;
    try {
      const projectClients =
        await ProjectDeveloperService.getProjectClient(projectId);
      res.status(200).json(projectClients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
export default DeveloperController;