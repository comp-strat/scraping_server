import mongoose, {Schema} from 'mongoose';


const jobSchema = new mongoose.Schema({
    // id: Number,

    created_by: String,

    URLs: [{ type: String}],

    status: ["Scheduled", "In Progress", "Completed"],

    createdDate: Date,

    completedDate: {
        type: Date,
        required: false
    }
});


const Job = mongoose.model('Job', jobSchema, 'jobs');

export default Job;