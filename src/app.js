//* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB=require('../src/db/db')
 const authRoutes=require('./routes/auth.routes')
const musicRoutes=require('./routes/music.routes')
require('dotenv').config()
connectDB();
const app = express();
const cors=require('cors')
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.json());



// router
app.use('/api/auth',authRoutes)
app.use('/api/music',musicRoutes)




module.exports = app;
