
import express from 'express';
import database from './backend/config/db.js';
import dotenv from 'dotenv';
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json());
//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
database.mongoConnect()


app.post('/getEntryData', function (req, res) {

    const count = req.body
    let db = database.getDb();
    db.collection('sample-data').aggregate([
        {
            $match: {
                "direction": "entry"
            }
        },
        {
            $group: {
                _id: "$timestamp",
                count: {
                    $sum: 1
                },
            }
        },
        {
            $addFields: {
                y: "$count",
                x: "$_id",
            }
        },
        {
            "$project": {
                "_id": 0,
                "count": 0,

            }
        }
    ]).skip(count.start).limit(count.end).toArray(function (err, items) {

        res.send(items)
    })
});



app.post('/getData', function (req, res) {
    // getting all the data
    const count = req.body

    let db = database.getDb();


    db.collection('sample-data').aggregate([
        {
            $group: {
                _id: "$timestamp",
                count: {
                    $sum: 1
                },
            }
        },
        {
            $addFields: {
                y: "$count",
                x: "$_id",
            }
        },
        {
            "$project": {
                "_id": 0,
                "count": 0,

            }
        }
    ]).skip(count.start).limit(500).toArray(function (err, items) {
        res.send(items)

    })
});

app.post('/getExitData', function (req, res) {

    const count = req.body
    let db = database.getDb();
    db.collection('sample-data').aggregate([
        { $match: { "direction": "exit" } },
        {
            $group: {
                _id: "$timestamp",
                count: {
                    $sum: 1
                },
            }
        },
        {
            $addFields: {
                y: "$count",
                x: "$_id",
            }
        },
        {
            "$project": {
                "_id": 0,
                "count": 0,

            }
        }
    ]).skip(count.start).limit(500).toArray(function (err, items) {
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