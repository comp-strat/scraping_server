import {Request, Response} from "express";

import Dataset from "../../models/Dataset";
import { DatasetInterface} from "../../interfaces/DatasetInterface";

export const getDataset = async (req: Request, res: Response) => {

    const datasetId = req.params.id;

    const dataset = await Dataset.findOne({
        'job_id':  datasetId
    });

    if (!dataset) {
        res.send('The requested dataset does not exist')
    } else {
        //TODO pagination
        res.send(dataset);
    }
};