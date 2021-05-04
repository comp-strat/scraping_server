import {Request, Response} from "express";

//Models & Interfaces
import Job from "../../models/Job";
import { JobInterface} from "../../interfaces/JobInterface";

//helper methods
import {queryJobsCompletion} from "../../util/queryJobCompletion";
import {updateMongoDocs} from "../../util/updateMongoDocs";


export const getAllJobsByUserId = async (req: Request, res: Response) => {
    // const userId = req.params.user_id;

    let jobs = await Job.find()

    if (!jobs) {
        res.send(`The requested jobs do not exist!`)
    } else {
        try {
            //for type safety
            let converted_jobs = jobs.map(j => <JobInterface>(<unknown>j))

            //query each job for completion status
            const {updatedJobs, updated} = await queryJobsCompletion(converted_jobs);

            if (updated) {
                const updatedSuccessfully = await updateMongoDocs(updatedJobs);
                console.log(updatedSuccessfully ?
                    `Successfully updated jobs!` :
                    `Error while updating jobs' status in Mongo!`
                );
            }

            res.send(updatedJobs);
        } catch (e) {
            console.log(`Error while fetching data`);
            res.send({status: 404, message: `Error while fetching data!`})
        }
    }
};