import mongoose, {Schema} from 'mongoose';


const jobSchema = new mongoose.Schema({
    id: Number,

    created_by: String,

    name: String,

    status: ["Scheduled", "In Progress", "Completed"],

    createdDate: Date,

    completedDate: Date
});


const Job = mongoose.model('Job', jobSchema, 'jobs');

export default Job;