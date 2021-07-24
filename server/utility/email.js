import nodemailer from "nodemailer";

let nodeEnv = process.env.NODE_ENV.trim();

export const sendEmail = async ({ email, subject, message, htmlMessage }) => {
    //? 1. transporter
    let transporter;

    if (nodeEnv === "development") {
        transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    } else {
        transporter = nodemailer.createTransport({
            host: process.env.EMAIL_PROD_HOST,
            port: process.env.EMAIL_PROD_PORT,
            auth: {
                user: process.env.EMAIL_PROD_USERNAME,
                pass: process.env.EMAIL_PROD_PASSWORD,
            },
        });
    }

    //? 2. email options
    const mailOptions = {
        from: "Blessing Olaleye <blessingOlaleye0@gmail.com>",
        to: email,
        subject: subject,
        text: message,
    };

    if (htmlMessage) {
        mailOptions.html = htmlMessage;
    }

    //? 3. send email
    await transporter.sendMail(mailOptions);
};
