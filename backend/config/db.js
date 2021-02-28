import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
// MongoDB Connection URI: mongodb+srv://envision-user:utDqZf9yWIFW87Ej@envision-cluster.pgpms.mongodb.net/envision-db?retryWrites=true&w=majority
// User Name: envision-user
// User Password: utDqZf9yWIFW87Ej
// DB Name: envision-db
// Collection Name: sample-data
// MongoDB NodeJS Docs: https://docs.mongodb.com/drivers/node/ & https://docs.mongodb.com/drivers/node/fundamentals/connection/


// DB_NAME = process.env.DB_NAME
// CONNECTION_STRING= process.env.CONNECTION_STRING


const connectDB = async () => {
    try {
        //database Name
        const databaseName = process.env.DB_NAME;
        const con = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB;

