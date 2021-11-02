import axios from "axios";

import {JobInterface} from "../interfaces/JobInterface";

export const queryJobsCompletion = async (jobs: Array<JobInterface>) => {
    let updated = false;

    try {
        // select only jobs in progress & create array of promises to query at once
        const in_progress_jobs_promises = jobs.map((j, index) => {
            if (j.status === "In Progress") {
                const URL = `http://localhost:5000/job/${j.redisID}`;
                return axios.get(URL)
            }
        });

        if (in_progress_jobs_promises.length != 0) {
            const responses = await Promise.all(in_progress_jobs_promises);

            //update each job's completion
            responses.forEach(res => {
                const { completion, task_id } = res!.data;

                if (completion === 1) {
                    const index = jobs.findIndex(({ redisID }) => redisID === task_id);
                    jobs[index].status = "Completed"

                    console.log(`Completion updated!`)

                    updated = true;
                } else {
                    console.log(`Completion NOT updated!`)
                }
            })
        }
    } catch (e) {
        console.error(e);
    }

    return { updatedJobs: jobs, updated };
}