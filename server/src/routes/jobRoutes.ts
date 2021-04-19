import * as express from 'express';

// import {firebaseAuth} from "../auth/firebaseAuth";
import {getAllJobsByUserId} from "../controllers/job/getAllJobsByUserId";
import {getJobDetails} from "../controllers/job/getJobDetails";
import {postUpdateJob} from "../controllers/job/postUpdateJob";
import {postCreateJob} from "../controllers/job/postCreateJob";

const router = express.Router();

router.get('/job/:id', getJobDetails);
router.get('/job/:user_id', getAllJobsByUserId);
router.post('/job/:id', postUpdateJob);
router.post('/job', postCreateJob);

// protected routes
// TODO define all routes here

export default router;