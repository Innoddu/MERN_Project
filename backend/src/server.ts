import app from "./app";
import "dotenv/config";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import express from "express";

const port = env.PORT;
const mongoConnectionString = env.MONGO_CONNECTION_STRING;


if (!mongoConnectionString) {
    throw new Error("MONGO_CONNECTION_STRING environment variable is not defined.");
  }
mongoose.connect(mongoConnectionString)
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("server port:" + port);
        });
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

