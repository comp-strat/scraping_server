import * as mongoose from "mongoose";

export interface DatasetInterface extends mongoose.Document {
    job_id: number,
    name: string,
    status: string,
    completed: boolean
}