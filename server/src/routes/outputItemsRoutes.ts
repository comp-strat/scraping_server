import * as express from 'express';

// import {firebaseAuth} from "../auth/firebaseAuth";
import { getAllOutputItems } from "../controllers/getAllItems";
import { getGeneralResponse } from "../controllers/getGeneralResponse";

const router = express.Router();

// unprotected routes
router.get('/', getGeneralResponse);
router.get('/get-all-output-items', getAllOutputItems);

// protected routes
// TODO define all routes here

export default router;