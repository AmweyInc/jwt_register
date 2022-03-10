// Imports
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const path = require("path");
const router = require('./routers/index.js');
const UserController = require("./controllers/User-controller.js");

// Const statements
const app = express();
const PORT = 7000
const DB_URL = 'mongodb+srv://Amwey1337:root@cluster0.n26e8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// Using statements
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api',router);


// Functional statements
const startServer = async () => {
    try {
        console.log(DB_URL);
        await mongoose.connect(DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        app.listen(PORT,() => console.log(`Server started on PORT = ${PORT}`));
    }catch (error){
        console.log(error);
    }
}

startServer();
