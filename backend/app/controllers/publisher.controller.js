const PublisherService = require("../services/publisher.service");

class PublisherController {
  static async createPublisher(req, res) {
    try {
      const publisher = await PublisherService.createPublisher(req.body);
      res.status(201).json({ message: "Publisher created successfully", publisher });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllPublishers(req, res) {
    try {
      const publishers = await PublisherService.getAllPublishers();
      res.status(200).json(publishers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPublisherById(req, res) {
    try {
      const publisher = await PublisherService.getPublisherById(req.params.id);
      if (!publisher) return res.status(404).json({ message: "Publisher not found" });
      res.status(200).json(publisher);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updatePublisher(req, res) {
    try {
      const publisher = await PublisherService.updatePublisher(req.params.id, req.body);
      if (!publisher) return res.status(404).json({ message: "Publisher not found" });
      res.status(200).json({ message: "Publisher updated successfully", publisher });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deletePublisher(req, res) {
    try {
      const result = await PublisherService.deletePublisher(req.params.id);
      if (!result) return res.status(404).json({ message: "Publisher not found" });
      res.status(200).json({ message: "Publisher deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PublisherController;
