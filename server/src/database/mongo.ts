import mongoose from 'mongoose';

import { Application } from 'express';
import User from "../models/User";
import Job from "../models/Job";
import Dataset from "../models/Dataset";

const url = process.env.MONGO_URL;

const mongo = (app: Application, port: number) => {
    mongoose
        .connect(url!, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (!err) {
                console.log(`Connected to mongo`);
                app.listen(port);
                console.log(`App listens on port ${port}`);
            }
        })
        // .catch(err => console.log(err));
};

export default mongo;