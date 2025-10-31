const dotenv = require("dotenv");
dotenv.config(); 

const mongoose = require("mongoose");
const connectDB = require("./app/config");
const app = require("./app");
const Book = require("./app/models/book.model"); 

mongoose.connect("mongodb://localhost:27017/library_management")
  .then(async () => {
    console.log("Connected to MongoDB");

    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));
