module.exports = {
 createComment: (req, res) => {
    const { post_id } = req.params;
    const { text, username, date } = req.body;
    const dbInstance = req.app.get('db');

    dbInstance.create_comment({post_id, username, text, date})
    .then(comments => {
        res.status(200).json({comments});
    }).catch(err => console.log('Database create comment error---------', err));
 },
 readComments: (req, res) => {
     const { post_id } = req.params;
     // console.log('----post id', post_id);    
     setTimeout(() => {
        const dbInstance = req.app.get('db');
        dbInstance.read_comments(post_id).then(comments => {
            if(comments.length) {
                res.status(200).json({comments});
            } else {
                res.status(200).json({message: 'No Comments'});
            }
        }).catch(err => console.log('Axios Read Comments Error---------', err));
    }, 1000);
 },
 updateComment: (req, res) => {
    const { post_id, comment_id } = req.params;
    const { text, date } = req.body;
    console.log('---------post, comment ids', post_id, comment_id);
    const dbInstance = req.app.get('db');
    dbInstance.update_comment({post_id, comment_id, text, date})
    .then(comment => {
        console.log('Comment---------', comment);
        res.status(200).json({message: 'Comment Updated!'});
    }).catch(err => console.log('Update Comment error----------', err));
 },
 deleteComment: (req, res) => {
     const dbInstance = req.app.get('db');
     const { post_id, comment_id } = req.params;
     console.log('post id------------', post_id);
     dbInstance.delete_comment({post_id, comment_id})
     .then(comment => {
         res.status(200).json({message: 'Comment Deleted!!'});
     }).catch(err => console.log('Delete Comment Error-----------', err));
 }
}