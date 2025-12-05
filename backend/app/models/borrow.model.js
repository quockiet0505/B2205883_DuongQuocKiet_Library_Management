const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    readerId: {
      type: String,
      ref: "Reader",
      required: true,
    },
    bookId: {
      type: String,
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
      enum: ["processing", "accepted", "refused", "returned", "overdue", "cancelled"],
      default: "processing",
    },

    fine: {
      type: Number,
      default: 0,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Borrow", borrowSchema);
