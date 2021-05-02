import {Application} from "express";
import cors from "cors";

export const setCors = (app: Application) => {
    app.use(cors({origin: 'http://localhost:3000'}))
}