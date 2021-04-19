import {Request, Response} from "express";

import User from "../../models/User";
import { UserInterface} from "../../interfaces/UserInterface";

export const getUserByUsername = async (req: Request, res: Response) => {

    const username = req.params.username;

    const user = await User.findOne({
        'username': username
    });

    if (!user) {
        res.send('The requested user does not exist')
    } else {
        res.send(user);
    }
};