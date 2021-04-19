import {Request, Response} from "express";

import OutputItem from "../../models/OutputItem";
import { OutputItemInterface } from "../../interfaces/OutputItemInterface";

export const getAllOutputItems = async (req: Request, res: Response) => {
    const outputItems = await OutputItem.find();
    res.send(outputItems);
};