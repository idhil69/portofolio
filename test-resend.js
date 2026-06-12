const { Resend } = require('resend');

const resend = new Resend('re_BQFz9swB_5D6C2vY32ThCVPYKvopqvy95');

async function testEmail() {
  try {
    console.log("Sending email...");
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'muhrahmadhanaidilfadly@gmail.com',
      subject: 'Test Email',
      html: '<p>This is a test email</p>'
    });
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

testEmail();
