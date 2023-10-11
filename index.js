const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

// Define the JSON file path
const jsonFilePath = 'usernames.json';

// API endpoint to store the username
app.post('/store-username', (req, res) => {
    const { username } = req.body;
    // Read the existing JSON data
    const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    // Add the new username to the data
    data.users.push({ username });
    // Write the updated data back to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
    res.json({ message: 'Username stored successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
