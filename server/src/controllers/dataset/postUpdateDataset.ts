import {Request, Response} from "express";

import Dataset from "../../models/Dataset";
import { DatasetInterface} from "../../interfaces/DatasetInterface";

export const postUpdateDataset = async (req: Request, res: Response) => {

    const datasetId = req.params.id;
    const newStatus = req.body.status;

    const dataset = await Dataset.findByIdAndUpdate(
        {datasetId},
        {"status": newStatus}
    );

    if (!dataset) {
        res.send('The requested dataset does not exist')
    } else {
        res.send(dataset);
    }
};