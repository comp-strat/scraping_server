import outputItemsRoutes from "../routes/outputItemsRoutes";
import {Application} from "express";
import get404 from "../controllers/404";

export const useRoutes = (app: Application) => {
    app.use(outputItemsRoutes);
    app.use(get404);
};
