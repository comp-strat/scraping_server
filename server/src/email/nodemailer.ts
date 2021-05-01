import nodemailer from 'nodemailer';

const initializeNodemailer = async () => {
    try {
        const account = await nodemailer.createTestAccount();

        // Create a SMTP transporter object
        return nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
    } catch (e) {
        console.error('Failed to create a testing account. ' + e.message);
        return process.exit(1);
    }
}

export default initializeNodemailer;



