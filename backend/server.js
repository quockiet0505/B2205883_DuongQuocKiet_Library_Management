const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./app/config");
const app = require("./app");
const Book = require("./app/models/book.model"); 

dotenv.config();

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/library_management")
  .then(async () => {
    console.log(" Connected to MongoDB");

    //  Lấy và in ra toàn bộ sách
    const books = await Book.find();
    console.log(" Danh sách sách trong MongoDB:");
    console.log(books);

    //  Sau đó khởi động server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running on port http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error(" MongoDB connection error:", err));
