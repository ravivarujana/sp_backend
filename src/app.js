import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

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
app.use(express.urlencoded());

//parse all cookies are received as the part API
app.use(cookieParser());
export { app };
