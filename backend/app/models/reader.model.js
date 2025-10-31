const mongoose = require("mongoose");

const readerSchema = new mongoose.Schema(
  {
    readerId: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
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
  },
  { timestamps: true }
);

// Ẩn password và token khi trả về client
readerSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.token;
  return obj;
};

module.exports = mongoose.model("Reader", readerSchema);
