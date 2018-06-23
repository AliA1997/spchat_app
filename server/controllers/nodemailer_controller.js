const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ADMIN_EMAIL_ADDRESS,
        pass: process.env.ADMIN_EMAIL_PASSWORD
        }  
})
module.exports = {
     verify(username, email, verification_link) {

        // let transporter = nodeMailer.createTransport({
        // host: 'smtp.gmail.com',
        // port: 465,
        // secure: true,
        // auth: {
        //     user: process.env.ADMIN_EMAIL_ADDRESS,
        //     pass: process.env.ADMIN_EMAIL_PASSWORD
        //     }  
        // })
        let mailOptions = {
            from: `smtp.${process.env.ADMIN_EMAIL_ADDRESS}`,
            to: email,
            subject: 'Welcome to SP Chat.',
            text: 'Must verify account, or will be deleted in 72 hours',
            html: `<div style={background: transparent}>
                    <p>Welcome to SPChat. Please Verify Account or will be deleted in 72 hours.</p>
                    <a style={text_decoration: none, color: blue} href='http://localhost:3000/email_verification?verification_link=${verification_link}'>
                        Please Verify Account
                    </a>
                </div>`
        }
        transporter.sendMail(mailOptions, (err, data) => {
            if(err) console.log('Send Mail error---------', err);
            console.log('Data is successful-------', data);
        })
    },
    issueWarning(email, warning) {
        console.log('Email-------', email);
        let mailOptions = {
            from: `smtp.${process.env.ADMIN_EMAIL_ADDRESS}`,
            to: email,
            subject: 'Warning Account to be deleted!',
            html: `<div style={background: transparent}>
                        <p>Warning Account to be ${warning}</p>
                        <a style={text_decoration: none, color: blue} href='http://localhost:3000/login'>
                            Login to Stop Warning.
                        </a>
                </div>`
        }
        transporter.sendMail(mailOptions, (err, data) => {
            if(err) console.log('Warning Mail Error------', err);
            console.log('Warning is successful-----------', data);
        })
    },
    sendUpdate(email, updatedText, link) {
        console.log('Email----------', email);
        let mailOptions = {
            from: `smtp:${process.env.ADMIN_EMAIL_ADDRESS}`,
            to: email,
            subject: 'Update',
            html:  `<div style={background: transparent}>
                        <p>${updatedText}</p>
                        <a style={text_decoration: none, color: blue} href=${link}>
                            See Changes
                        </a>
                    </div>`
        };
        transporter.sendMail(mailOptions, (err, data) => {
            if(err) console.log('Update Mail Error---------', err);
            console.log('Update Mail is successful!');
        })
    }
}