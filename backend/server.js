require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Driver Schema
const driverSchema = new mongoose.Schema({
    name: String,
    truckNumber: String,
    rfidTag: String,
    entryTime: { type: Date, default: Date.now }
});

const Driver = mongoose.model("Driver", driverSchema);

// Register a new truck driver
app.post("/register", async (req, res) => {
    try {
        const { name, truckNumber, rfidTag } = req.body;
        const newDriver = new Driver({ name, truckNumber, rfidTag });
        await newDriver.save();
        res.status(201).json({ message: "Driver registered successfully", driver: newDriver });
    } catch (error) {
        res.status(500).json({ message: "Error registering driver", error });
    }
});

// Fetch all registered drivers (for police station access)
app.get("/drivers", async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching drivers", error });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
