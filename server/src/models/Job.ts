import mongoose from 'mongoose';
import {JobInterface} from "../interfaces/JobInterface";


const jobSchema = new mongoose.Schema({
    // id: Number,

    created_by: String,

    URLs: [{ type: String}],

    status: {
        type: String,
        enum: ["In Progress", "Completed", "Scheduled"],
    },

    createdDate: Date,

    completedDate: {
        type: Date,
        required: false
    },

    redisID: String
});


const Job = mongoose.model<JobInterface>('Job', jobSchema, 'jobs');

export default Job;