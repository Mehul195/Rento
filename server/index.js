const mongoose = require('mongoose');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cors = require("cors");

// Connect to MongoDB
mongoose.connect('mongodb+srv://om:Ye6hkj4c3OvOtNYl@cluster0.ynonr4i.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Rento-Db" });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
