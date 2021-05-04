import * as mongoose from "mongoose";

export interface OutputItemInterface extends mongoose.Document {
    depth: number,
    file_text: string,
    file_urls: Array<string>,
    files: any,
    image_urls: Array<string>,
    images: Array<Image>
    school_id: number,
    text: string,
    url: string
}

interface Image {
    url: string,
    path: string,
    checksum: string,
    status: string
}