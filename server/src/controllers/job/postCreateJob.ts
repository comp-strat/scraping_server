import {Request, Response} from "express";

import Job from "../../models/Job";
import { JobInterface} from "../../interfaces/JobInterface";

export const postCreateJob = async (req: Request, res: Response) => {

    const URLs = req.body.URLs;

    console.log(URLs);

    // TODO parse URLs & do validation
    //  just split by comma for now and assume they are correctly typed
    const parsedURLs = URLs.split(',')


    // Write a new job to jobs table
    //  TODO Update once authentication is added!
    const job = await new Job({
        created_by: "artemtkachuk",
        status: "In Progress",
        createdDate: Date(),
        URLs: parsedURLs
    });

    const saved_job = await job.save();

    if (!saved_job) {
        console.log(`'Error while creating a job!'`);
        res.json({success: false});
    } else {
        console.log(`Success while creating a job!`);

        const job_id = saved_job._id;
        //TODO prepare URLs for launching a crawling job
        // and write to CSV ???

        // TODO launch a crawling job

        //TODO if success

        // TODO else

        res.json({job: saved_job, success: true});
    }
};