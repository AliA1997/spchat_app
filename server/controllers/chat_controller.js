module.exports = {
    readChat: (req, res) => {
        const dbInstance = req.app.get('db');
        const { post_id } = req.params;
        dbInstance.read_chat(post_id)
        .then(chat => {
            if(chat.length) {
                res.status(200).json({message: 'Chat Recieved!!', messages: chat.messages, users: chat.users});
            } else {
                res.status(200).json({message: 'New Chat Created!'});
            }
        }).catch(err => console.log('Database readChat Error------------', err0));
    },
    createChat: (req, res) => {
        const dbInstance = req.app.get('db');
        const { post_id } = req.params;
        const { messages, users } = req.body;
        // console.log('Messages------------', messages);
        // console.log('Users----------', users);
        // console.log('Post_id-----------', post_id);
        dbInstance.create_chat({post_id, messages, users})
        .then(chat => {
            res.status(200).json({message: 'Chat Created Successfully!'});
        }).catch(err => console.log('Database Crate Chat error--------------', err));
    },
    updateChat: (req, res) => {
        const dbInstance = req.app.get('db');
        const { post_id } = req.params;
        const { messages, users } = req.body;
        console.log('users---------', users);
        dbInstance.update_chat({post_id, messages, users})
        .then(chat => {
            res.status(200).json({message: 'Chat Updated Successfully'});
        }).catch(err => console.log('Update Chat Errror----------------', err));
    }
}