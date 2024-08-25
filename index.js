const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Helper function to process data
const processData = (data) => {
    let numbers = [];
    let alphabets = [];
    let highestLowercase = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                if (!highestLowercase || item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        }
    });

    return { numbers, alphabets, highestLowercase };
};

// POST endpoint
app.post('/bfhl', (req, res) => {
    const userId = "john_doe_17091999"; // Replace with actual user details
    const email = "john@xyz.com";       // Replace with actual email
    const rollNumber = "ABCD123";       // Replace with actual roll number

    const data = req.body.data || [];

    const { numbers, alphabets, highestLowercase } = processData(data);

    res.status(200).json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
