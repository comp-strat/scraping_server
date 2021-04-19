import mongoose, {Schema} from 'mongoose';


const userSchema = new mongoose.Schema({
    //TODO validation
    username: String,

    firstName: String,

    lastName: String,

    email: String,
    //TODO find ready-made solution or encrypt at least
    password: String
});


const User = mongoose.model('User', userSchema, 'users');

export default User;