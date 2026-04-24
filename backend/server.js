const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI;

// Import Order model
const Order = require("./models/Order");

// Razorpay route
const paymentRoutes = require("./routes/payment");
app.use("/api", paymentRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("QuickMeds Backend API is running.");
});

// Order route
app.post("/order", async (req, res) => {
  try {
    const { items, total, userEmail } = req.body;

    const newOrder = new Order({
      items,
      total,
      userEmail,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully." });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to place order." });
  }
});

// Connect and start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
