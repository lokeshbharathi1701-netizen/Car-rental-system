const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define Schemas
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const bookingSchema = new mongoose.Schema({
    id: String,
    userName: String,
    email: String,
    phone: String,
    car: Object,
    pickupLocation: String,
    dropLocation: String,
    pickupDate: String,
    returnDate: String,
    totalCost: Number,
    status: { type: String, default: 'Confirmed' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Car Rental Backend API is running...');
});

// Authentication Simulation (Simple for now)
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            // Auto-register using the name prefix from email
            const derivedName = email.split('@')[0].split('.')[0]; // Handle common formats like name.surname
            const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
            user = new User({ name: formattedName, email, password });
            await user.save();
        }
        res.json({ success: true, user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Booking Routes
app.get('/api/bookings', async (req, res) => {
    const { email } = req.query;
    try {
        const bookings = await Booking.find(email ? { email } : {}).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

app.post('/api/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.json({ success: true, booking: newBooking });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error saving booking' });
    }
});

app.delete('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Booking.findOneAndDelete({ id: id });
        if (result) {
            res.json({ success: true, message: 'Booking deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Booking not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error deleting booking' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
