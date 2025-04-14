import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();

console.log("inside the app file");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// convert the received json to required JS object
app.use(express.json({ limit: "16kb" }));

//handle all static files here
app.use(express.static("public"));

//convert the form data received in URL to JS objects
app.use(express.urlencoded({ extended: true }));

//parse all cookies are received as the part API
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

export { app };
