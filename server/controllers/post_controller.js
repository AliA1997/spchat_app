module.exports = {
 readPosts: (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.read_all_posts().then(posts => {
        console.log('posts--------------', posts);
        res.status(200).json({posts})
    }).catch(err => console.log('Read Post DB Error-----------', err));
 },
 readPost: (req, res) => {
    const dbInstance = req.app.get('db');
    const { post_id } = req.params;
    // console.log('----post id', post_id);
    dbInstance.read_post(post_id).then(post => {
        res.status(200).json({post});
    }).catch(err => console.log('Database Get Post Error---------', err));
 },
 readPostBySport: (req, res) => {
    const dbInstance = req.app.get('db');
    const { sport } = req.params;
    console.log('Sport endpoint parameter--------', sport.toUpperCase());
    dbInstance.read_posts_by_sport(sport.toUpperCase())
    .then(posts => {
        res.status(200).json({posts});
    }).catch(err => console.log('Database Get Sport Post Error---------', err));
},
 readUserPosts: (req, res) => {
     console.log('readUserPosts hit-------');
     console.log('req.session.user-----------', req.session.user);
     const dbInstance = req.app.get('db');
    if(req.session.user) {
        const { username } = req.session.user;
        console.log('getUserPosts username----------', username);
        dbInstance.read_user_posts(username)
        .then(posts => {
            console.log('getUserPosts posts-----------------', posts);
            res.status(200).json({posts});
        }).catch(err => console.log('Read User Posts--------', err));
    } else {
        setTimeout(() => res.status(200).json({message: 'Must Login!'}), 1000);
    }
 },
 readUserPostBySport: (req, res) => {

 },
 createPost: (req, res) => {
    const dbInstance = req.app.get('db');
    const { user_id, title, description, imageurl, sport, selectedTags } = req.body;
    const createDate = new Date().getDate();
    dbInstance.create_post({ user_id, title, description, imageurl, date: createDate, sport, tags: selectedTags })
    .then(post => {
        res.status(200).json({message: 'Post Created Successfully!'});
    }).catch(err => console.log('Database Post Error----------', err));
 },
 updatePost: (req, res) => {
    const dbInstance = req.app.get('db');
    const { id, title, description, imageurl, date, sport, selectedTags } = req.body;
    console.log(id)
    const updateDate = new Date().getDate();
    dbInstance.update_post({ title, description, imageurl, date: updateDate, sport, tags: selectedTags, id})
    .then(post => {
        res.status(200).json(post);
    }).catch(err => console.log('Database Post Update Error----------', err));
 }, 
 deletePost: (req, res) => {
    const { id, user_id } = req.body;
    dbInstance.delete_post({id, user_id})
    .then(posts => {
        res.status(200).json({message: 'Deleted Post!'});
    }).catch(err => console.log('Database delete error!!!', err));
 }
}