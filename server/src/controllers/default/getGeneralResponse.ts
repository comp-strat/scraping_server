import {Request, Response} from "express";

export const getGeneralResponse = (req: Request, res: Response) => {
    console.log('General response');
    res.status(200).send('Welcome to the web crawling server!');
};