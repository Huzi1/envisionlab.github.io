
import mongodb from 'mongodb';
import dotenv from "dotenv";
dotenv.config();



const dbName = process.env.DB_NAME
const host = process.env.MONGO_HOST
const userName = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const CONNECTION_STRING = `mongodb+srv://${userName}:${password}@${host}/${dbName}?retryWrites=true&w=majority`

let _db, _client;

const mongoConnect = () => {
    mongodb.MongoClient.connect(
        CONNECTION_STRING,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function (err, client) {
            if (err) {
                console.log(err);
            }
            else {
                _client = client;
                _db = client.db();

                console.log("DB connected")
            }
        }
    )
}
const getClient = () => {
    if (_client) return _client;
    throw 'No client found';
}

const getDb = () => {
    if (_db) return _db;
    throw 'No database found';
}


export default { getDb, mongoConnect, getClient };
