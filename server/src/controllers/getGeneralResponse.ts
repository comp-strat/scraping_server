import {Request, Response} from "express";

export const getGeneralResponse = (req: Request, res: Response) => {
    res.status(200).send('Welcome to the web crawling server!');
};