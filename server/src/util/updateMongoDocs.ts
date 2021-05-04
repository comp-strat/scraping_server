import Job from "../models/Job";
import {JobInterface} from "../interfaces/JobInterface";

export const updateMongoDocs = async (docs: Array<JobInterface>) => {
    const docs_promises = docs.map(d => Job.findOneAndUpdate({_id: d._id}, {"status": "Completed"}))

    // TODO Implementing a sequential update for now. Bulk version may be better
    try {
        const update = await Promise.all(docs_promises);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}