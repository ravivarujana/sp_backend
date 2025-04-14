import mongoose from "mongoose";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URI}/${process.env.DB_NAME}`
    );
    // This connection provide a lot of information
    // console.log(`Loggin mongoDB connection instance `, {
    //   ...connectionInstance.connection,
    // });
    // which host to we are getting connected
    console.log(
      `Loggin mongoDB connection instance ${connectionInstance.connection.host}`
    );

    /* This is not neccesary but we can utilize the mongoose.connection events to listen to events related to connection like loosing connectivity to mongodb server - this is basically used when an error occurs after the initial connection has been established - we can either use it here or in the index file on the top/globally*/

    // mongoose.connection.on("error", () => console.error(err));
  } catch (err) {
    console.log(`MongoDB connection catch block ${err}`);
    // If the connection fails we can exit process immediately
    process.exit(1);
  }
}

export default connectDB;
