import mongoose from 'mongoose';
import {DatasetInterface} from "../interfaces/DatasetInterface";


const datasetSchema = new mongoose.Schema({
    job_id: Number,

    name: String,

    status: ["Scheduled", "In Progress", "Completed"],

    completed: Boolean
});


const Dataset = mongoose.model<DatasetInterface>('Dataset', datasetSchema, 'datasets');

export default Dataset;