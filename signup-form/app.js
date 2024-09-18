const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Store user data in a file
    const userData = `Username: ${username}, Email: ${email}, Password: ${password}\n`;
    fs.appendFile('users.txt', userData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Server error');
        }
        res.send('Sign up successful!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
