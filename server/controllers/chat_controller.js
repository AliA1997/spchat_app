module.exports = {
    readChat: (req, res) => {
        const dbInstance = req.app.get('db');
        const { post_id } = req.params;
        dbInstance.find_chat(post_id)
        .then(chat => {
            if(chat.length) {
                console.log('chat users------------', chat[0].users);
                res.status(200).json({message: 'Chat Recieved!!', messages: chat[0].messages, users: chat[0].users});
            } else {
                res.status(200).json({message: 'New Chat Created!'});
            }
        }).catch(err => console.log('Database readChat Error------------', err0));
    },
    createChat: (req, res) => {
        const dbInstance = req.app.get('db');
        const { post_id } = req.params;
        const { messages, users } = req.body;
        console.log('Messages------------', messages);
        console.log('Users----------', users);
        // console.log('Post_id-----------', post_id);
        dbInstance.find_chat(post_id)
        .then(chat => {
            if(chat.length) {
                let newMessages = messages
                let filteredUsers = users.filter((user, i) => user.username !== chat[0].users[i].username)
                console.log('filteredUsers-----------------', filteredUsers);
                let newUsers = [...filteredUsers, ...chat[0].users];
                dbInstance.update_chat({post_id, messages: newMessages, users: newUsers})
                .then(chat => {
                    res.status(200).json({message: 'CHat Updated Successfully!!!'});
                }).catch(err => console.log('Database Update Chat Error-------------', err));
            } else {
                dbInstance.create_chat({post_id, messages, users})
                // dbInstance.create_chat({post_id, messages})
                .then(chat => {
                    res.status(200).json({message: 'Chat Created Successfully!'});
                }).catch(err => console.log('Database Create Chat error--------------', err));
            }
        }).catch(err => console.log('Find Chat error-----------', err));
        
    },
    // updateChat: (req, res) => {
    //     const dbInstance = req.app.get('db');
    //     const { post_id } = req.params;
    //     const { messages, users } = req.body;
    //     console.log('users---------', users);
    //     dbInstance.update_chat({post_id, messages, users})
    //     .then(chat => {
    //         res.status(200).json({message: 'Chat Updated Successfully'});
    //     }).catch(err => console.log('Update Chat Errror----------------', err));
    // }
}