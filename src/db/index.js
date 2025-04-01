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
  } catch (err) {
    console.log(`MongoDB connection catch block ${err}`);
    // If the connection fails we can exit process immediately
    process.exit(1);
  }
}

export default connectDB;
