const express = require('express');   
const app = express(); 

const mongoose = require("mongoose");   // importing mongoose library

const dotenv = require('dotenv');   // importing library

const googleTaggingRoute = require("./routes/googleTagging");
const imageCompressionAndUpload = require("./routes/imageCompressionAndUpload");
const cors = require('cors');


dotenv.config();   // we should write here configuration otherwise you can't use it

mongoose.connect(process.env.MONGO_URL)
.then(()=> {console.log("DB Connection is Successfull!")})
.catch((err) => {
    console.log(err);
});


app.use(cors());    // Using cors
// app.use(express.json());    //our application is not able to take any json object to prevent this we will go to index.js and before my routes we are gonna write app.use(express.json()); 
// Increase the payload size limit
app.use(express.json({limit: '50mb'}));

app.use("/api/image", googleTaggingRoute);
app.use("/api/image/compress/upload", imageCompressionAndUpload);


app.listen(process.env.PORT || 5000, ()=>{  
    console.log(`${process.env.PORT}` ? `backend server is running on ${process.env.PORT}` : "backend server is running on 5000")
});


