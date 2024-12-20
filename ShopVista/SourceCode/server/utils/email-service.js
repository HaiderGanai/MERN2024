const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
    try {
        const emailUser = process.env.EMAIL_USER.trim();
        const emailPass = process.env.EMAIL_PASS.replace(/\s/g, '');

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });

        const mailOptions = {
            from: `"Password Reset" <${emailUser}>`,
            to: to.trim(),
            subject,
            html,
        };

        console.log("Attempting to send email to:", to);
        console.log("Using email account:", emailUser);
        
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email could not be sent: " + error.message);
    }
};

module.exports = sendEmail;
