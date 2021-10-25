import {Request, Response} from "express";

import Job from "../../models/Job";
import { JobInterface} from "../../interfaces/JobInterface";
import request from 'request';

export const getJobDetails = async (req: Request, res: Response) => {

    request.get('http://localhost:5000/job/'+req.params.id,{}, (err, r, body) => {
        res.send(body);
    })
    /*
    const jobId = req.params.id;

    const job = await Job.findOne({
        'id':  jobId
    });

    if (!job) {
        res.send('The requested job does not exist')
    } else {
        res.send(job);
    }*/
};