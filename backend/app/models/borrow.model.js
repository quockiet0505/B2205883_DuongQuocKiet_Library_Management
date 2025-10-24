const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    readerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reader",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    status: {
      type: String,
      enum: ["processing", "accepted", "refused", "returned"],
      default: "processing",
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Borrow", borrowSchema);
