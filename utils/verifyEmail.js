const sendEmail = require('../misc/mailer');

const verifyUserEmail = async (req, username, email, secretToken) => {
    const html = `
        Hello ${username},
        <br/>
        <br/>

        Thank you for registering an account with us at WAAWCHAT.com
        <br/><br/>
        Please click the link below or copy to any browser to verify your account:
        <br/>
        <a href="http://${req.headers.host}/auth/verify-token">
            http://${req.headers.host}/auth/verify-token/${secretToken}
        </a>
        <br>
        Secret Token: ${secretToken}
        
        <br/><br/>
        Kind regards,
        <br/><br/>
        <strong>Team WAAWCHAT.</strong>
    `;

    await sendEmail(
        '',
        email,
        "Please verify account",
        html
    );
}


module.exports = verifyUserEmail;