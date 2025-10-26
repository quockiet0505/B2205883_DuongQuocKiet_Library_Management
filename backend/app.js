const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("../routes/auth.route");
const bookRoutes = require("../routes/book.route");
const borrowRoutes = require("../routes/borrow.route");
const publisherRoutes = require("../routes/publisher.route");
const readerRoutes = require("../routes/reader.route");
const staffRoutes = require("../routes/staff.route");

const errorHandler = require("../middleware/error.middleware");

const app = express();

// Middleware chung
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// 
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrows", borrowRoutes);
app.use("/api/publishers", publisherRoutes);
app.use("/api/readers", readerRoutes);
app.use("/api/staffs", staffRoutes);

// Middleware xử lý lỗi
app.use(errorHandler);

module.exports = app;
