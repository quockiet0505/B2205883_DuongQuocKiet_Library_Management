const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    position: {
      type: String,
      enum: ["Manager", "Staff"],
      default: "Staff",
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
