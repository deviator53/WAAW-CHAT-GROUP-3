const sendEmail = require('../misc/mailer');


const forgotPasswordEmail = async (req, username, email, secretToken) => {
    const html = `
        Hi ${username},
        <br/>
        <br/>

        Thank you for using WAAWCHAT.
        <br/><br/>
        Please click the link below or copy to any browser to change your password:
        <br/>
        <a href="http://${req.headers.host}/auth/change-password">
            http://${req.headers.host}/auth/change-password/${secretToken}
        </a>
        <br>
        <br/>
        <br/>
        Kind regards,
        <br/><br/>
        <strong>Team WAAWCHAT.</strong>
    `;

    await sendEmail(
        '',
        email,
        "Please change your password",
        html
    );
}


module.exports = forgotPasswordEmail;