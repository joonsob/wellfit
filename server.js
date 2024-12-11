const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const cors = require('cors')
const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

// Serve static files (for frontend HTML, CSS, JS)
app.use(express.static('public'));

// Dummy data (replace with a database in production)
const usersFilePath = 'data/users.json';

// Ensure users.json exists initially
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify([]));
}

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received signup request:', { username, password }); // Log request data

    // Check if username already exists
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed:', hashedPassword); // Log the hashed password for verification

    // Save the new user
    const newUser = { username, password: hashedPassword };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users));

    res.status(200).json({ message: 'User created successfully' });
});


// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
