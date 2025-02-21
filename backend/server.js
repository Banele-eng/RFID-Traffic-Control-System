require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Driver Schema
const driverSchema = new mongoose.Schema({
    name: String,
    license: String,
    truckNumber: String,
    registeredAt: { type: Date, default: Date.now }
});
const Driver = mongoose.model("Driver", driverSchema);

// Register Driver
app.post("/register", async (req, res) => {
    try {
        const { name, license, truckNumber } = req.body;
        const newDriver = new Driver({ name, license, truckNumber });
        await newDriver.save();
        res.json({ message: "Driver registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering driver", error });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
