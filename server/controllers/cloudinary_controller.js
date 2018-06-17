const cloudinary = require('cloudinary');
module.exports = {
    upload: (req, res) => {
        //Define the timestamp
        const timestamp = Math.round(new Date().getTime() / 1000);
        ///use your cloudinary api secret.
        const api_secret = process.env.CLOUDINARY_API_SECRET;

        //Use cloudinary helper library to validate timestamp, and secret.
        const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);
        ///Here is the created signature.
        const payload = {
            signature: signature,
            timestamp: timestamp
        };
        console.log(payload)
        res.json({payload});
    }
}