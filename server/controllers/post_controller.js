module.exports = {
 readPosts: (req, res) => {
    const dbInstance = req.app.get('db');
    // console.log('user posts data------------', req.session.user);
    dbInstance.read_all_posts().then(posts => {
        // console.log('posts--------------', posts);
        res.status(200).json({posts})
    }).catch(err => console.log('Read Post DB Error-----------', err));
 },
 readRecentPosts: (req, res) => {
     const dbInstance = req.app.get('db');
     dbInstance.read_recent_posts()
     .then(posts => {
         res.status(200).json({posts});
     }).catch(err => console.log('Read Recent Posts DB Error---------', err));
 },
readPost(req, res) {
    const { post_id } = req.params;
    const dbInstance = req.app.get('db');
    dbInstance.read_post(post_id).then(post => {
        console.log('post------------', post);
        res.status(200).json({post});
    }).catch(err => console.log('Database Get Post Error---------', err));
 },
 readPostBySport(req, res) {
    const dbInstance = req.app.get('db');
    const { sport } = req.params;
    console.log('Sport endpoint parameter--------', sport.toUpperCase());
    dbInstance.read_posts_by_sport(sport.toUpperCase())
    .then(posts => {
        res.status(200).json({posts});
    }).catch(err => console.log('Database Get Sport Post Error---------', err));
},
 readUserPosts(req, res) {
     console.log('readUserPosts hit-------');
    //  console.log('req.session.user-----------', req.session.user);
     const dbInstance = req.app.get('db');
    const { username } = req.session.user;
    console.log('getUserPosts username----------', username);
    dbInstance.read_user_posts(username)
    .then(posts => {
        console.log('getUserPosts posts-----------------', posts);
        res.status(200).json({posts});
    }).catch(err => console.log('Read User Posts--------', err));
    // } else {
    //     setTimeout(() => res.status(200).json({message: 'Must Login!'}), 1000);
    // }
 },
 readUserPostBySport: (req, res) => {

 },
 createPost(req, res) {
    const dbInstance = req.app.get('db');
    const { id } = req.session.user;
    const { title, description, date, imageurl, sport, selectedTags } = req.body;
    console.log('user_id---------------', id);
    if(id) {
        dbInstance.create_post({ user_id: id, title, description, date, imageurl, sport, tags: selectedTags })
        .then(post => {
            res.status(200).json({message: 'Post Created Successfully!'});
        }).catch(err => console.log('Database Post Error----------', err));
    }
 },
 updatePost(req, res) {
    const dbInstance = req.app.get('db');
    const { id, title, description, imageurl, date, sport, selectedTags } = req.body;
    console.log(id)
    dbInstance.update_post({ title, description, imageurl, date, sport, tags: selectedTags, id})
    .then(post => {
        res.status(200).json(post);
    }).catch(err => console.log('Database Post Update Error----------', err));
 }, 
 updatePoints(req, res) {
    const dbInstance = req.app.get('db');
    const { points, post_id, title } = req.body;
    console.log('poits------------', points);
    console.log('post_id---------', post_id);
    if(points === 1) {
        dbInstance.add_bronze({points, post_id, title, id: req.session.user ? req.session.user.id : 140})
        .then(points => {
            res.status(200).json({message: 'Bronze Added!'});
        }).catch(err => console.log("Database Patch Post error----------", err));
    } else if(points === 2) {
        dbInstance.add_silver({points, post_id, title, id: req.session.user ? req.session.user.id : 140})
        .then(points => {
            res.status(200).json({message: 'Silver Added!'});
        }).catch(err => console.log('Database patch post error-------', err));
    } else {
        dbInstance.add_gold({points, post_id, title, id: req.session.user ? req.session.user.id : 140})
        .then(points => {
            res.status(200).json({message: 'Gold Added!!'});
        }).catch(err => console.log('Database patch post error----------', err));
    }
 },
 deletePost(req, res) {
    const dbInstance = req.app.get('db');
    const { id, user_id } = req.body;
    console.log('id---------', id);
    console.log('user_id---------', user_id);
    dbInstance.delete_post({id, user_id})
    .then(posts => {
        console.log('delete posts------------', posts);
        res.status(200).json({message: 'Deleted Post!'});
    }).catch(err => console.log('Database delete error!!!', err));
 }
}