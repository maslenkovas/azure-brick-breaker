// server.js (your Node.js backend)
const express = require('express');
const app = express();
const port = 3000; // Choose an appropriate port

const { MongoClient } = require('mongodb');

const uri = 'mongodb://brickbreakerappdb:8zG0ZafjLVYoFHiUKzrj2UUUUhp2EL2Hhx3CgGNGT1KpiYm4IozeqhLKSrVXT1O7sR2T7WTML3qUACDbqjBt9Q==@brickbreakerappdb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@brickbreakerappdb@'; // Replace with your Cosmos DB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.post('/addScore', async (req, res) => {
    const { username, score } = req.body;
    const collection = client.db('ScoreDB').collection('Collection1');

    try {
        const result = await collection.insertOne({ username, score });
        console.log(`Inserted a document with _id: ${result.insertedId}`);
        res.status(200).send('Score saved successfully.');
    } catch (error) {
        console.error('Error inserting data: ', error);
        res.status(500).send('Error saving score.');
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
