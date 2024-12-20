const sendEmail = require('./utils/email-service');

async function testEmail() {
    try {
        await sendEmail({
            to: "ganaiihaider07@gmail.com",
            subject: "Test Email",
            html: "<p>This is a test email</p>"
        });
        console.log("Test email sent successfully");
    } catch (error) {
        console.error("Test failed:", error);
    }
}

testEmail(); 