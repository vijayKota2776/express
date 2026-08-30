const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
app.use(express.json());


const requestLogger = (req, res, next) => {
    console.log(`${req.method} - ${req.path} - ${new Date().toISOString()}`);
    next();
};
app.use(requestLogger);


const hotels = [
    { id: 1, name: "Cibo", location: "Dombivali", rating: 4.5, menu: ["Indian", "Italian"], cost: 6000 },
    { id: 2, name: "Theobroma", location: "Thane", rating: 4.7, menu: ["Bakery", "Desserts"], cost: 3000 },
    { id: 3, name: "Barbeque Nation", location: "Navi Mumbai", rating: 4.3, menu: ["BBQ", "Grill"], cost: 2500 },
    { id: 4, name: "Mainland China", location: "Mumbai", rating: 4.6, menu: ["Chinese", "Asian"], cost: 4000 },
    { id: 5, name: "Pizza Hut", location: "Kalyan", rating: 4.2, menu: ["Italian", "Fast Food"], cost: 1500 }
];

const admins = [];


passport.use(
    new LocalStrategy(async (username, password, done) => {
        const admin = admins.find(admin => admin.username === username);
        if (!admin) return done(null, false, { message: "Admin not found" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return done(null, false, { message: "Incorrect password" });

        return done(null, admin);
    })
);

app.use(passport.initialize());

const isAuthenticated = passport.authenticate('local', { session: false });




app.get('/', (req, res) => {
    res.send("Welcome to Hotel Management API 🌐");
});


app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const usernameExists = admins.find(a => a.username === username);
        if (usernameExists) {
            return res.status(400).json({ message: "Admin username already exists" });
        }

        const emailExists = admins.find(a => a.email === email);
        if (emailExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = {
            id: admins.length + 1,
            username,
            email,
            password: hashedPassword
        };

        admins.push(newAdmin);
        res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post('/login', isAuthenticated, (req, res) => {
    res.status(200).json({ message: "Login successful", user: req.user.username });
});


app.get('/hotels', (req, res) => {
    const { rating } = req.query;
    if (rating) {
        const filtered = hotels.filter(h => h.rating >= parseFloat(rating));
        return res.json(filtered);
    }
    res.json(hotels);
});


app.get('/sort', (req, res) => {
    const sorted = [...hotels].sort((a, b) => b.rating - a.rating);
    res.json(sorted);
});


app.get('/hotels/:id', (req, res) => {
    const hotel = hotels.find(h => h.id === parseInt(req.params.id));
    if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
});


app.get('/filter/:foodtype', (req, res) => {
    const filtered = hotels.filter(h => h.menu.includes(req.params.foodtype));
    if (filtered.length === 0) {
        return res.status(404).json({ message: "No hotels found with selected food type" });
    }
    res.json(filtered);
});


app.post('/hotels', isAuthenticated, (req, res) => {
    try {
        const { name, location, rating, menu, cost } = req.body;

        if (!name || !location || !rating || !menu || !cost) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const nameExists = hotels.find(h => h.name.toLowerCase() === name.toLowerCase());
        if (nameExists) {
            return res.status(400).json({ message: "Hotel name already exists" });
        }

        const newHotel = {
            id: hotels.length + 1,
            name,
            location,
            rating: parseFloat(rating),
            menu,
            cost: parseFloat(cost)
        };

        hotels.push(newHotel);
        res.status(201).json({ message: "Hotel added successfully", hotel: newHotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.put('/hotels/:id', isAuthenticated, (req, res) => {
    const hotel = hotels.find(h => h.id === parseInt(req.params.id));
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const { name, location, rating, menu, cost } = req.body;

    if (name) hotel.name = name;
    if (location) hotel.location = location;
    if (rating) hotel.rating = parseFloat(rating);
    if (menu) hotel.menu = menu;
    if (cost) hotel.cost = parseFloat(cost);

    res.json({ message: "Hotel updated successfully", hotel });
});


app.delete('/hotels/:id', isAuthenticated, (req, res) => {
    const index = hotels.findIndex(h => h.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "Hotel not found" });
    }

    hotels.splice(index, 1);
    res.json({ message: "Hotel deleted successfully" });
});


app.listen(4000, () => {
    console.log("✅ Server running on port 4000");
});