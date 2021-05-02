import {Request, Response} from "express";

import Job from "../../models/Job";
import { JobInterface} from "../../interfaces/JobInterface";

import transporter from "../../email/nodemailer";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

export const postUpdateJob = async (req: Request, res: Response) => {

    const client = await transporter();

    const job_id = req.params.id;

    const updated_job = await Job.findOneAndUpdate({"_id": job_id}, {
        status: "Completed"
    });

    if (!updated_job) {
        console.log('Hi!');
        //TODO ...
    } else {
        let mailOptions = {
            from: 'tkachukjr@gmail.com',
            to: 'atkachuk@berkeley.edu',
            subject: '[Universal Web Crawling Tool] Your job is completed',

        };

        let message = {
            from: 'Sender Name <sender@example.com>',
            to: 'Recipient <recipient@example.com>',
            subject: '[Universal Web Crawling Tool] Your job is completed',
            text: 'Your job was completed! Check out the <a href=\"http://localhost:3000/datasets\" target=\"_blank\">datasets</a> page!',
            html: '<p>Your job was completed! Check out the <a href="http://localhost:3000/datasets" target="_blank">datasets</a> page!</p>'
        };



        client.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                res.json({success: false});
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);

            res.json({success: true});
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
};