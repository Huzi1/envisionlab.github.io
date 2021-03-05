
import mongodb from 'mongodb';
// import require from 'require';
import dotenv from "dotenv";
dotenv.config();

const { MongoClient } = mongodb;

const dbName = process.env.DB_NAME
const host = process.env.MONGO_HOST
const userName = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const CONNECTION_STRING = `mongodb+srv://${userName}:${password}@${host}/${dbName}?retryWrites=true&w=majority`

let _db, _client;

// const mongoConnect = () => {
//     mongodb.MongoClient.connect(
//         CONNECTION_STRING,
//         { useNewUrlParser: true, useUnifiedTopology: true },
//         function (err, client) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 _client = client;
//                 _db = client.db();

//                 console.log("DB connected")
//             }
//         }
//     )
// }
// const getClient = () => {
//     if (_client) return _client;
//     throw 'No client found';
// }

// const getDb = () => {
//     if (_db) return _db;
//     throw 'No database found';
// }


// export default { getDb, mongoConnect, getClient };



export async function getEntryData(count) {

    const client = new MongoClient(CONNECTION_STRING);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // execute query
        const response = await client.db(dbName).collection('sample-data').aggregate([
            { $match: { "direction": "entry" } },
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
        ]).skip(count).limit(200).toArray();

        return response;
        // Make the appropriate DB calls
        // await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }


}
export async function getExitData(count) {

    const client = new MongoClient(CONNECTION_STRING);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // execute query
        const response = await client.db(dbName).collection('sample-data').aggregate([
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
        ]).skip(count).limit(200).toArray();

        return response;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }


}

export async function getAllData(count, flag = false, dateTimeStart, dateTimeEnd) {

    const client = new MongoClient(CONNECTION_STRING);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // execute query
        // const response = await client.db(dbName).collection('sample-data').find().limit(500).toArray();
        if (flag === 'true') {
            console.log("in true flag getAllData DB")
            const response = await client.db(dbName).collection('sample-data').aggregate([
                {
                    $group: {
                        _id: "$timestamp",
                        count: {
                            $sum: 1
                        },
                    }
                }, {
                    $match: {
                        _id: {
                            $gte: dateTimeStart,
                            $lte: dateTimeEnd,

                        }
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
            ]).skip(count).limit(200).toArray();

            return response;
        }
        console.log("In getAllData false flag")
        const response = await client.db(dbName).collection('sample-data').aggregate([
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
        ]).skip(count).limit(200).toArray();

        return response;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }


}


// module.exports.mongoConnect = mongoConnect;