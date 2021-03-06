
import express from 'express';
import { getEntryData, getAllData, getExitData } from './backend/config/db.js';
// const { client } = await require("yourmodule");
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
var dateTimeStart;
var dateTimeEnd;


app.get('/getEntryData', async function (req, res) {

    const count = parseInt(req.query.start);
    const flag = (req.query.flag);
    if (flag === 'true') {
        dateTimeStart = req.query.dateTimeStart;
        dateTimeEnd = req.query.dateTimeEnd;

        let queryResp = await getEntryData(count, flag, dateTimeStart, dateTimeEnd);

        res.send(queryResp).status(200)
    } else {
        let queryResp = await getEntryData(count, dateTimeStart, dateTimeEnd);

        res.send(queryResp).status(200)

    }


});

// console.log("in api", client)




app.get('/getAllData', async function (req, res) {
    // console.log("req", req.query)

    const count = parseInt(req.query.start);
    const flag = (req.query.flag);
    if (flag === 'true') {
        dateTimeStart = req.query.dateTimeStart;
        dateTimeEnd = req.query.dateTimeEnd;

        let queryResp = await getAllData(count, flag, dateTimeStart, dateTimeEnd);

        res.send(queryResp).status(200)
    }
    else {

        let queryResp = await getAllData(count, dateTimeStart, dateTimeEnd);

        res.send(queryResp).status(200)
    }


});


app.get('/getExitData', async function (req, res) {

    const count = parseInt(req.query.start);
    const flag = (req.query.flag);
    if (flag === 'true') {
        dateTimeStart = req.query.dateTimeStart;
        dateTimeEnd = req.query.dateTimeEnd;

        let queryResp = await getExitData(count, flag, dateTimeStart, dateTimeEnd);

        res.send(queryResp).status(200)
    }
    else {
        let queryResp = await getExitData(count, dateTimeStart, dateTimeEnd);

        res.send(queryResp).status(200)
    }

});;

// Graceful db disconnection
// process.on('SIGINT', function () {
//     database.getClient().close(function () {
//         console.log('Mongoose default connection disconnected through app termination');
//         process.exit(0);
//     });
// });