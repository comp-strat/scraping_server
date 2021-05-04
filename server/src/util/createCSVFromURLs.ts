import ObjectsToCsv from "objects-to-csv";

import {URLInterface} from "../interfaces/URLInterface";


export const createCSVFromURLs = async (parsedURLs: Array<string>, filePath: string) => {
    // prepare URLs for launching a crawling job
    // TODO probably implement a better system than just one file for the entire server.
    let csvURLs = new Array<URLInterface>();

    parsedURLs.forEach(url => {
        csvURLs.push({"NCESSCH": (Math.random() * 10).toString(), "URL_2019": url});
    })


    if (csvURLs.length != 0) {
        const csv = new ObjectsToCsv(csvURLs);
        await csv.toDisk(filePath)
    }

    //TODO handle errors of any kind
}