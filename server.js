
import express from 'express';

import database from './backend/config/db.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
database.mongoConnect()


app.get('/getData', function (req, res) {
    // getting all the data
    let db = database.getDb();
    db.collection('sample-data')
        .find()
        .toArray(function (err, items) {
            res.send(items)
        })
});

// Graceful db disconnection
process.on('SIGINT', function () {
    database.getClient().close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});