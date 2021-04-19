import * as express from 'express';

// import {firebaseAuth} from "../auth/firebaseAuth";
import { getAllOutputItems } from "../controllers/outputItems/getAllItems";
import { getGeneralResponse } from "../controllers/default/getGeneralResponse";
import {postUpdateDataset} from "../controllers/dataset/postUpdateDataset";
import {getDataset} from "../controllers/dataset/getDataset";

const router = express.Router();


// unprotected routes
router.get('/dataset/:id', getDataset);

router.post('/dataset/:id', postUpdateDataset)


// protected routes
// TODO define all routes here

export default router;