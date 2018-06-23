module.exports = async (io, Posts, db) => {
    const posts = new Posts();
    const topicUsers = [];
    // let currentMessages = [];
    // let chatExist = false;
    await io.sockets.on('connection', (socket) => {
        console.log('Socket connected!!!', socket.id);
        // console.log('db-----------', db)
        const filteredUser = socket.handshake.query.username !== 'Anonymous' && topicUsers.filter(user => user === socket.handshake.query.username);
        !filteredUser.length && topicUsers.push(`${socket.handshake.query.username}`)         
        socket.on('room', () => {
            if(socket.handshake.query.topic) {
                console.log('socket id---------', socket.id);
                console.log('post id-----------', socket.handshake.query.post_id);
                db.find_chat(socket.handshake.query.post_id).then(chatResponse => {
                    console.log('chatResponse--------------', chatResponse);
                    if(!chatResponse.length) {
                        posts.AddPostData(socket.id, socket.handshake.query.topic, +socket.handshake.query.post_id, []);
                        console.log('socket joined--------', socket.handshake.query.topic);
                        console.log('user imageurl-------', socket.handshake.query.imageurl);
                    } else {
                        posts.messages = chatResponse.messages;
                    }
                    console.log('chatResponse------------', chatResponse.messages);
                    // console.log('posts------------', posts);
                    socket.join(socket.handshake.query.topic);
                    let postsList = posts.GetPostList(socket.handshake.query.topic);
                    console.log('postsList---------------', postsList);
                    io.in(socket.handshake.query.topic).emit('SEND_USER', topicUsers);
                }).catch(err => console.log('Chat Database error--------', err));
            }

        });
        
        socket.broadcast.emit('SEND_USER', topicUsers);
        socket.on('TYPING', (data) => {
            console.log('typing----------', socket.handshake.query.username);
            console.log('typing-----------------', data);
            socket.broadcast.emit('USER_ON_TYPING', data);
        });
        socket.on('SEND_MESSAGE', (data) => {
            // console.log('toppic----------', socket.handshake.query.topic);
            let room = posts.GetPost(socket.id);
            console.log('room------------', room);
            // let roomList = posts.GetPostList(room);
            data.username = socket.handshake.query.username;
            data.imageurl = socket.handshake.query.imageurl;
            posts.PushMessage(room.room, data);
            // console.log('posts------------', roomList);
            // console.log('currentMessage------------', posts.ReturnMessages(socket.handshake.query.topic));
            console.log('posts sendmessage---------', room.messages);
            console.log('Message sent!');
            console.log('data----------', data)
            io.emit('RECIEVE_MESSAGE', data); 
        });        
        socket.on('left', (left) => {
            let room = posts.RemovePost(socket.id);
            let postsList = posts.GetPostList(room);
            io.in(room).emit('SEND_USER', postsList);
        });
        socket.on('disconnect', () => {
            let room = posts.RemovePost(socket.id);
            let postsList = posts.GetPostList(room);
            console.log('postsList----------', postsList);
            console.log('currentMessages--------------', postsList.messages);
            // console.log('db-------------', db);
            db.create_chat({post_id: socket.handshake.query.post_id, messages: posts.messages}).then(posts => {
                console.log('Chat Created Successfully!');
            }).catch(err => console.log('Database create chat error--------', err));
            io.in(room).emit('SEND_USER', postsList);
        });

    })
}