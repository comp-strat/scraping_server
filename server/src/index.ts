import express from 'express';

import { useRoutes } from "./middleware/useRoutes";
import { useSwagger } from "./middleware/useSwagger";
import { setStaticDir } from "./middleware/setStaticDir";
import {userBodyParsing} from "./middleware/useBodyParsing";

// Create a new express application instance
const app = express();

setStaticDir(app);
userBodyParsing(app);
useRoutes(app);
useSwagger(app);

export default app;