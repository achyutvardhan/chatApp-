const mailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const CLIENT_ID = process.env.clientid;
const CLIENT_SECRET = process.env.clientsecret;
const REDIRECT_URI = process.env.redirect_uri;
const REFRESH_TOKEN = process.env.refresh_token;

const oauth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

const mailer = async (
  name = "CHATAPP",
  to,
  cc = "",
  bcc = "",
  subject = "",
  text = "",
  html = "",
  attachment = ""
) => {
  try {
    const accesstoken = oauth2client.getAccessToken();
    const transport = mailer.createTransport({
      service: "gmail",
      auth: {
        type: "oauth2",
        user: "achyutvardhan234@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accesstoken,
      },
    });

    const mailoption = {
      from: `${name}<achyutvardhan234@gmail.com>`,
      to: to,
      cc: cc,
      bcc: bcc,
      subject: subject,
      text: text,
      html: html,
      attachment: attachment,
    };
    var result = await transport.sendMail(mailoption);
    return result;
  } catch (error) {
    return error;
  }
};
