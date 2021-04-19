import * as express from 'express';

// import {firebaseAuth} from "../auth/firebaseAuth";
import {getUserByUsername} from "../controllers/user/getUserByUsername";
import {getGeneralResponse} from "../controllers/default/getGeneralResponse";

const router = express.Router();

router.get('/user/:username', getUserByUsername);

export default router;