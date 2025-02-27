require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const app = express();
const port = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files if needed

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error('MongoDB connection URI is missing! Set MONGO_URI in your .env file.');
    process.exit(1); // Exit the application if no DB URI is found
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// Truck Registration Schema
const truckSchema = new mongoose.Schema({
    truckId: { type: String, required: true },
    driverName: { type: String, required: true },
    licensePlate: { type: String, required: true },
    contactNumber: { type: String, required: true },
    vehicleType: { type: String, required: true },
    entryTime: { type: Date, required: true, default: Date.now }
});

const Truck = mongoose.model('Truck', truckSchema);

// POST Route for Truck Registration
app.post('/submit', [
    check('truckId').notEmpty().withMessage('Truck ID is required'),
    check('driverName').notEmpty().withMessage('Driver Name is required'),
    check('licensePlate').notEmpty().withMessage('License Plate is required'),
    check('contactNumber').notEmpty().withMessage('Contact Number is required'),
    check('vehicleType').notEmpty().withMessage('Vehicle Type is required'),
    check('entryTime').isISO8601().toDate().withMessage('Invalid entry time format')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
    }

    try {
        const { truckId, driverName, licensePlate, contactNumber, vehicleType, entryTime } = req.body;
        const truck = new Truck({ truckId, driverName, licensePlate, contactNumber, vehicleType, entryTime });
        await truck.save();
        res.status(201).json({ message: '✅ Registration successful', truck });
    } catch (err) {
        res.status(500).json({ message: '❌ Error saving data', error: err.message });
    }
});

// Start Server
app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
