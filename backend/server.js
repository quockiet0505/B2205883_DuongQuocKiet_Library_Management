const dotenv = require("dotenv");
const connectDB = require("./app/config");
const app = require("./app");

dotenv.config();

// Kết nối MongoDB
connectDB();

console.log("MONGO_URI =", process.env.MONGO_URI);

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
