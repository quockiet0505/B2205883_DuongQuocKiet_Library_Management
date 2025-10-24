const StaffService = require("../services/staff.service");

class StaffController {
  static async createStaff(req, res) {
    try {
      const staff = await StaffService.createStaff(req.body);
      res.status(201).json({ message: "Staff created successfully", staff });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllStaff(req, res) {
    try {
      const staffList = await StaffService.getAllStaff();
      res.status(200).json(staffList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getStaffById(req, res) {
    try {
      const staff = await StaffService.getStaffById(req.params.id);
      if (!staff) return res.status(404).json({ message: "Staff not found" });
      res.status(200).json(staff);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateStaff(req, res) {
    try {
      const staff = await StaffService.updateStaff(req.params.id, req.body);
      if (!staff) return res.status(404).json({ message: "Staff not found" });
      res.status(200).json({ message: "Staff updated successfully", staff });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteStaff(req, res) {
    try {
      const result = await StaffService.deleteStaff(req.params.id);
      if (!result) return res.status(404).json({ message: "Staff not found" });
      res.status(200).json({ message: "Staff deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = StaffController;
