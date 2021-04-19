import {Application} from 'express';
import bodyParser from "body-parser";

export const userBodyParsing = (app: Application) => {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
}