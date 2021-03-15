import {Request, Response} from "express";

import OutputItem from "../models/OutputItem";
import { OutputItemInterface } from "../interfaces/outputItemInterface";

export const getAllOutputItems = async (req: Request, res: Response) => {
    console.log(`Here!`)
    const outputItems = await OutputItem.find();
    res.send(outputItems);
};