import * as mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}