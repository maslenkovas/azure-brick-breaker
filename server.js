// server.js (your Node.js backend)
const express = require('express');
const app = express();
const port = 3000; // Choose an appropriate port

const { MongoClient } = require('mongodb');

const uri = 'mongodb://brickbreakerappdb:8zG0ZafjLVYoFHiUKzrj2UUUUhp2EL2Hhx3CgGNGT1KpiYm4IozeqhLKSrVXT1O7sR2T7WTML3qUACDbqjBt9Q==@brickbreakerappdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@brickbreakerappdb@'; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.post('/addUsername', async (req, res) => {
    const { username } = req.body;
    const collection = client.db('ScoreDB').collection('Collection1');

    try {
        const result = await collection.insertOne({ username });
        console.log(`Username saved with _id: ${result.insertedId}`);
        res.status(200).json({ message: 'Username saved successfully' });
    } catch (error) {
        console.error('Error saving username: ', error);
        res.status(500).json({ message: 'Error saving username' });
    }
});

client.connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to the database: ', error);
    });
