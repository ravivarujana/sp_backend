// require("dotenv").config();
import connectDB from "./db/index.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config({
  path: "./.env",
});
// dotenv.config();

// to handle the errors relateed to the mongodb connect

mongoose.connect.on((err) => {
  console.log(`Error while connecting to MongoDB ${err}`);
});

// since the connect DB function is returning a promise
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Seerver running at PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection failed !!! ${err}`);
  });

/*
const app = express();

(async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URI}/${process.env.DB_NAME}`
    );
    
    console.log("connection Instance", connectionInstance.connection.host);
    
    //incase there is an error connecting db we can listen to the error
    app.on("error", (error) => {
      throw new Error(error);
    });
    
    //we connection with the DB is successfull we can listen on to the PORT
    app.listen(process.env.PORT, () =>
      console.log(`Listening on the PORT ${process.env.PORT}`)
    );
  } catch (err) {
    console.log("Catch from index file", err);
  }
})();
*/
