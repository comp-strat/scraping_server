import {Request, Response} from "express";
import request from 'request';
import ObjectsToCsv from 'objects-to-csv';

import Job from "../../models/Job";
import {URLInterface} from "../../interfaces/URLInterface";
import * as fs from "fs";
import {createCSVFromURLs} from "../../util/createCSVFromURLs";

export const postCreateJob = async (req: Request, res: Response) => {
    const URLs = req.body.URLs;
    console.log(URLs);
    // TODO parse URLs & do validation
    //  just split by comma for now and assume they are correctly typed

    const parsedURLs: Array<string> = URLs.split(',')

    const filePath = `./src/data/urls_${new Date().getTime()}.csv`;

    await createCSVFromURLs(parsedURLs, filePath);
    // TODO launch a crawling job: aka CURL
    request.post('http://localhost:5000/crawl-csv', {
        formData: {'file': fs.createReadStream(filePath)}},
        async (err, response,body) => {
            if (err) {
                console.log(err);
            }  else {
                body = JSON.parse(body);

                //TODO if success aka received a response
                // Write a new job to jobs table
                //  TODO Update once authentication is added!
                const jobDocument = {
                    created_by: "artemtkachuk",
                    status: body.status === 200 ? "In Progress" : "Completed",
                    createdDate: Date(),
                    URLs: parsedURLs,
                    redisID: body.job_id
                }

                console.log(jobDocument);

                const job = await new Job(jobDocument);

                const saved_job = await job.save();

                if (!saved_job) {
                    console.log(`'Error while creating a job!'`);
                    res.json({success: false});
                } else {
                    console.log(`Success while creating a job!`);
                    res.json({job: saved_job, success: true});
                }
            }
        })
};