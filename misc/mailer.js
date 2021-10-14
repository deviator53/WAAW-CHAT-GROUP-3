const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "odiri4real2002@gmail.com",
      pass: "Odiri1234"
    },
    tls: {
        rejectUnauthorized: false,
    }
  });

function sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
        transport.sendMail({from, subject, to, html}, (err, info) => {
            if (err) reject(err);
            resolve(info);
        });
    });
}

module.exports = sendEmail;
