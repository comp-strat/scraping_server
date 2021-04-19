import {Application} from "express";


import get404 from "../controllers/default/404";
import outputItemsRoutes from "../routes/outputItemsRoutes";
import userRoutes from "../routes/userRoutes";
import jobRoutes from "../routes/jobRoutes";
import datasetRoutes from "../routes/datasetRoutes";


export const useRoutes = (app: Application) => {
    app.use(userRoutes);
    app.use(outputItemsRoutes);
    app.use(jobRoutes);
    app.use(datasetRoutes);

    app.use(get404);
};
