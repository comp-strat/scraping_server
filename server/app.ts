import * as dotenv from 'dotenv';
dotenv.config({ path: `.env`})


import app from './src/index';
import mongo from "./src/database/mongo";



// const loadEnvSuccess = dotenv.config({ path: `.env`}); //load environmental variables

// if (loadEnvSuccess.error) {
//     console.log(`Error while loading environmental variables!`);
// } else {
//     console.log(loadEnvSuccess);
const port = parseInt(process.env.PORT!) || 3000;


mongo(app, port);
// }