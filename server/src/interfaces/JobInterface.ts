import * as mongoose from "mongoose";

export interface JobInterface extends mongoose.Document{
    URLs: Array<string>,
    status: string,
    createdDate: Date,
    completedDate: Date | null,
    redisID: string
}