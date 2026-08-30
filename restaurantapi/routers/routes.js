const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Restaurant = require('../models/restaurant');
const Menu = require('../models/menu');
const User = require('../models/user');

router.get('/', async (req, res) => {
    res.send('Welcome to the Restaurant where you can timepass and get good food!');
});


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

router.post('/restaurants', async (req, res) => {
    try {

        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'No token provided' });
        }


        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        const userId = decoded.userId;


        const { restaurantid, name, city, address, cuisine, rating } = req.body;

        const newRestaurant = new Restaurant({
            restaurantid,
            name,
            city,
            address,
            cuisine,
            rating
        });


        await newRestaurant.save();
        res.status(201).json(newRestaurant);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
});

router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
});

router.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
});

router.put('/restaurants/:id', async (req, res) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(updatedRestaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update restaurant' });
    }
});

router.delete('/restaurants/:id', async (req, res) => {
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!deletedRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
});

router.get('/restaurants/:id/menu', async (req, res) => {
    try {
        const menuItems = await Menu.find({ restaurantId: req.params.id });
        res.json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});

router.post('/restaurants/:id/menu', async (req, res) => {
    try {
        const { name, price, isavailable } = req.body;

        const newMenuItem = new Menu({
            restaurantId: req.params.id,
            name,
            price,
            isavailable
        });

        await newMenuItem.save();
        res.status(201).json(newMenuItem);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create menu item' });
    }
});

router.put('/menu/:id', async (req, res) => {
    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMenuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json(updatedMenuItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update menu item' });
    }
});

router.delete('/menu/:id', async (req, res) => {
    try {
        const deletedMenuItem = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete menu item' });
    }
});
module.exports = router;