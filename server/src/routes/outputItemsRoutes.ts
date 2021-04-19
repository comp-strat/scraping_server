import * as express from 'express';

// import {firebaseAuth} from "../auth/firebaseAuth";
import { getAllOutputItems } from "../controllers/outputItems/getAllItems";
import { getGeneralResponse } from "../controllers/default/getGeneralResponse";
import {getUserByUsername} from "../controllers/user/getUserByUsername";

const router = express.Router();

// unprotected routes
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get a friendly text for the server default homepage
 *     description: Get a friendly text for the server default homepage
 *     responses:
 *          '200':
 *              description: A successful response
 */
router.get('/', getGeneralResponse);

/**
 * @swagger
 * /get-all-output-items:
 *   get:
 *     summary: All info in the MongoDB so far 
 *     description: Get all information that was scraped so far
 *     responses:
 *          '200':
 *              description: A successful response
 */
router.get('/get-all-output-items', getAllOutputItems);


// protected routes
// TODO define all routes here

export default router;