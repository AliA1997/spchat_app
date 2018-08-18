module.exports = {
    readUsersSearch: (req, res) => {
        const dbInstance = req.app.get('db');
        const { user }  = req.query;
        const userSearch = `%${user}%`;
        dbInstance.search_users(userSearch)
        .then(users => {
            let adminIndex= users.findIndex(user => user.id === 139);
            users.splice(adminIndex, 1);
            console.log('Users', users)
            res.status(200).json({users});
        }).catch(err => console.log('Search Users Error---------------', err));
    },
    readSportPostsSearch: (req, res) => {
        const dbInstance = req.app.get('db');
        const { sport, post }  = req.query;
        const sportsSearchPost = `%${post}%`;
        console.log('post-------', sportsSearchPost);
        console.log('sport--------', sport);
        // const sportsSearchPost2 = `%${sport}`;
        // const sportSearchPost3 = `${sport}%`;
        dbInstance.search_sports_posts(sportsSearchPost)
        .then(posts => {
            const filteredPosts = posts.filter(post => post.sport.toLowerCase() === sport);
            // console.log(posts.map(post => post.sport));
            console.log('-filteredPosts-------------', filteredPosts);
            res.status(200).json({posts: filteredPosts});
        }).catch(err => console.log('Search Sports Posts Error---------------', err));
    },
    readPostsSearch: (req, res) => {
        console.log('Post search hit----------');
        const dbInstance = req.app.get('db');
        const { post }  = req.query;
        const searchPost = `%${post}%`;
        // const searchPost2 = `%${post}`;
        // const searchPost3 = `${post}%`;
        console.log(searchPost);
        dbInstance.search_posts(searchPost)
        .then(posts => {
            console.log('posts----------', posts);
            res.status(200).json({posts});
        }).catch(err => console.log('Search Posts Error---------------', err));
    }
}