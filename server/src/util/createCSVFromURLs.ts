import ObjectsToCsv from "objects-to-csv";

import {URLInterface} from "../interfaces/URLInterface";

import * as fs from "fs";
import path from "path";

export const createCSVFromURLs = (parsedURLs: Array<string>, filePath: string) => {
    return new Promise( async (resolve,reject) => {
    // prepare URLs for launching a crawling job
    // TODO probably implement a better system than just one file for the entire server.
    let csvURLs = new Array<URLInterface>();

    parsedURLs.forEach(url => {
        csvURLs.push({"NCESSCH": (Math.random() * 10).toString(), "URL_2019": url});
    })


    if (csvURLs.length != 0) {
        const csv = new ObjectsToCsv(csvURLs);
        await fs.mkdir(path.dirname(filePath), { recursive: true }, async (err) => {
            if (err) throw err;
            await csv.toDisk(filePath);
            resolve(null);
        });
    } else {
        reject("No URL");
    }

    //TODO handle errors of any kind
    });
}