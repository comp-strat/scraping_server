import {Request, Response} from "express";

import Job from "../../models/Job";
import { JobInterface} from "../../interfaces/JobInterface";

export const getAllJobsByUserId = async (req: Request, res: Response) => {

    const userId = req.params.user_id;

    const job = await Job.findOne({
        'id':  userId
    });

    if (!job) {
        res.send('The requested job does not exist')
    } else {
        res.send(job);
    }
};