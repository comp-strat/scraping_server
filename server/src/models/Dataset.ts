import mongoose from 'mongoose';


const datasetSchema = new mongoose.Schema({
    job_id: Number,

    name: String,

    status: ["Scheduled", "In Progress", "Completed"],

    completed: Boolean
});


const Dataset = mongoose.model('Dataset', datasetSchema, 'datasets');

export default Dataset;