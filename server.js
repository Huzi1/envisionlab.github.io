import connectDB from './backend/config/db.js'
import express from 'express';
import dotenv  from 'dotenv';
dotenv.config()

// DB connect
connectDB();

const app = express()


const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))