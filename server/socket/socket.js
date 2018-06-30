module.exports = (io, Posts) => {
    const posts = new Posts();
    const topicUsers = [];
    // let currentMessages = [];
    // let chatExist = false;
     io.sockets.on('connection', (socket) => {
        console.log('Socket connected!!!', socket.id);
        // console.log('db-----------', db)
        const filteredUser = socket.handshake.query.username !== 'Anonymous' && topicUsers.filter(user => user.username === socket.handshake.query.username);
        !filteredUser.length && topicUsers.push({username: socket.handshake.query.username, imageurl: socket.handshake.query.imageurl});         
        socket.on('room', () => {
            io.emit('CONNECT_ROOM');         
            if(socket.handshake.query.topic) {
                console.log('socket id---------', socket.id);
                console.log('post id-----------', socket.handshake.query.post_id);
                posts.AddPostData(socket.id, socket.handshake.query.topic, +socket.handshake.query.post_id, []);
                console.log('socket joined--------', socket.handshake.query.topic);
                console.log('user imageurl-------', socket.handshake.query.imageurl);
                // console.log('posts------------', posts);
                socket.join(socket.handshake.query.topic);
                let postsList = posts.GetPostList(socket.handshake.query.topic);
                console.log('postsList---------------', postsList);
                io.in(socket.handshake.query.topic).emit('SEND_USER', topicUsers);
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
        setInterval(() => {
            io.emit('SAVE_CHAT')
        }, (1000 * 10))

        socket.on('disconnect', () => {
            let room = posts.RemovePost(socket.id);
            console.log('room-------------', room);
            // let postsList = posts.GetPostList(room);
            // console.log('post_id----------', room.post_id);
            // console.log('currentMessages--------------', room.messages);
            // console.log('db-------------', db);
            console.log('Socket Disconnected-------------');
            io.in(room).emit('SEND_USER', room);
        });

    })
}