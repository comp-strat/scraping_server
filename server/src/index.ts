import express from 'express';
import bodyParser from 'body-parser';

import { useRoutes } from "./middleware/useRoutes";

// Create a new express application instance
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

useRoutes(app);

export default app;