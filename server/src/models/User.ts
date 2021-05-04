import mongoose, {Schema} from 'mongoose';
import {UserInterface} from "../interfaces/UserInterface";


const userSchema = new mongoose.Schema({
    //TODO validation
    username: String,

    firstName: String,

    lastName: String,

    email: String,
    //TODO find ready-made solution or encrypt at least
    password: String
});


const User = mongoose.model<UserInterface>('User', userSchema, 'users');

export default User;