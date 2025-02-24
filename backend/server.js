const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Truck registration schema
const truckSchema = new mongoose.Schema({
    truckId: String,
    driverName: String,
    licensePlate: String,
    contactNumber: String,
    vehicleType: String,
    entryTime: Date
});

const Truck = mongoose.model('Truck', truckSchema);

// POST route to handle form submissions
app.post('/submit', async (req, res) => {
    const { truckId, driverName, licensePlate, contactNumber, vehicleType, entryTime } = req.body;
    
    // Validate data (this can be extended with more checks)
    if (!truckId || !driverName || !licensePlate || !contactNumber || !vehicleType || !entryTime) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Save the truck registration to MongoDB
        const truck = new Truck({
            truckId,
            driverName,
            licensePlate,
            contactNumber,
            vehicleType,
            entryTime
        });
        await truck.save();
        res.status(200).json({ message: 'Registration successful' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving data', error: err });
    }
});

// Serve static files (if your frontend is in the same project directory)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
