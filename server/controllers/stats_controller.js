const sports_feed = require('mysportsfeeds-node');
module.exports = {
    readStats(req, res) {
        const { sport_id } = req.params;
        //Authenticate sports feed api with username, and password 
        console.log('-----------Ussername', process.env.SPORTS_FEED_USERNAME);
        console.log('------------password', process.env.SPORTS_FEED_PASSWORD);
        sports_feed.authenticate(process.env.SPORTS_FEED_USERNAME, process.env.SPORTS_FEED_PASSWORD);
    }
}