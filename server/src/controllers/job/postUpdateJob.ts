import {Request, Response} from "express";

import Job from "../../models/Job";
import { JobInterface} from "../../interfaces/JobInterface";

export const postUpdateJob = async (req: Request, res: Response) => {

    const jobId = req.params.id;

    const job = await Job.findOne({
        'id':  jobId
    });

    if (!job) {
        res.send('The requested job does not exist')
    } else {
        res.send(job);
    }
};