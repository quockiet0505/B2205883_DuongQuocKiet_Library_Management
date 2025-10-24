const ReaderService = require("../services/reader.service");

class ReaderController {
  static async createReader(req, res) {
    try {
      const reader = await ReaderService.createReader(req.body);
      res.status(201).json({ message: "Reader created successfully", reader });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllReaders(req, res) {
    try {
      const readers = await ReaderService.getAllReaders();
      res.status(200).json(readers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getReaderById(req, res) {
    try {
      const reader = await ReaderService.getReaderById(req.params.id);
      if (!reader) return res.status(404).json({ message: "Reader not found" });
      res.status(200).json(reader);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateReader(req, res) {
    try {
      const reader = await ReaderService.updateReader(req.params.id, req.body);
      if (!reader) return res.status(404).json({ message: "Reader not found" });
      res.status(200).json({ message: "Reader updated successfully", reader });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteReader(req, res) {
    try {
      const result = await ReaderService.deleteReader(req.params.id);
      if (!result) return res.status(404).json({ message: "Reader not found" });
      res.status(200).json({ message: "Reader deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ReaderController;
