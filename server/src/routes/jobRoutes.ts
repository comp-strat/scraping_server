import * as express from 'express';

// import {firebaseAuth} from "../auth/firebaseAuth";
import {getAllJobsByUserId} from "../controllers/job/getAllJobsByUserId";
import {getJobDetails} from "../controllers/job/getJobDetails";
import {postUpdateJob} from "../controllers/job/postUpdateJob";
import {postCreateJob} from "../controllers/job/postCreateJob";

const proxy = require('express-http-proxy');
const router = express.Router();

router.get('/job/:id', getJobDetails);
router.get('/jobs', getAllJobsByUserId); // TODO Mongo update for specific user
router.post('/job/:id', postUpdateJob);
router.post('/job', postCreateJob);
router.use("/download",proxy("localhost:5000"))

// protected routes
// TODO define all routes here

export default router;