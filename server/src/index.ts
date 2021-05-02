import express from 'express';

//Middleware imports
import { useRoutes } from "./middleware/useRoutes";
import { useSwagger } from "./middleware/useSwagger";
import { setStaticDir } from "./middleware/setStaticDir";
import {userBodyParsing} from "./middleware/useBodyParsing";
import {setCors} from "./middleware/setCors";

// Create a new express application instance
const app = express();

// Middleware
setStaticDir(app);
userBodyParsing(app);
setCors(app);
useRoutes(app);
useSwagger(app);

export default app;