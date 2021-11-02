import mongoose from 'mongoose';

import { Application } from 'express';
import User from "../models/User";
import Job from "../models/Job";
import Dataset from "../models/Dataset";

var fs = require('fs');
var dbconfig = JSON.parse(fs.readFileSync('settings.json', 'utf8'));

const mongo = (app: Application, port: number) => {

    mongoose
        .connect(dbconfig.MONGO_URL!, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
            if (!err) {
                console.log(`Connected to mongo`);
                app.listen(port);
                console.log(`App listens on port ${port}`);
            } else {
                console.log(err);
            }
        })

        // .catch(err => console.log(err));
};

export default mongo;