import {Application} from "express";

import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Web-crawling API",
            description: "Server code for handling React frontend requests for the universal Web-crawling tool",
            contact: {
                name: "Artem Tkachuk"
            },
            version: "1.0.0",
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["src/routes/outputItemsRoutes.ts", "src/routes/userRoutes.ts"]
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);


export const useSwagger = (app: Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
