const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route.js"); // <-- đúng tên file
const ApiError = require("./app/api-error"); // lớp lỗi tùy biến

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint kiểm tra nhanh
app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

// Đăng ký routes chính
app.use("/api/contacts", contactsRouter);

// 404: không khớp route nào
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi tập trung (đặt cuối cùng)
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
