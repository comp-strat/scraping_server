import {Application} from "express";
import cors from "cors";
import fs from "fs"

var config = JSON.parse(fs.readFileSync('settings.json', 'utf8'));

export const setCors = (app: Application) => {
    app.use(cors({origin: config["CORS_ORIGIN"]}))
}