const jwt = require("jsonwebtoken");
const { createTransport } = require("nodemailer");

// Create JWT Token

const createJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 24 * 60 * 60
    })
}

// Send otp using nodemailer

const sendOtpEmail = async (email, otp_code) => {

    try {
        // const transporter = await initTransporter();
        const transporter = createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: "destinyfelixkiisi@gmail.com",
                pass: "fyisctvtdbewnekx",
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        await transporter.sendMail({
            from: "destinyfelixkiisi@gmail.com",
            to: email,
            subject: "Highrise Email Verification",
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600; text-align:center">Highrise</a>
              </div>
              <p>Verify your email address</p>
              <p style="margin:0 auto; width: max-content; font-bold:700;">Verification code</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp_code}</h2>
              <p style="font-size:0.9em;">Regards,<br />Highrise</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              </div>
            </div>
          </div>
          `,
        });
    } catch (err) {
        console.log(err)
    }

};


const serviceIdCodeGenerator = (serviceId) =>{
    return `HIGHRISE-${serviceId}`;
}

module.exports = { createJWT, sendOtpEmail, serviceIdCodeGenerator }