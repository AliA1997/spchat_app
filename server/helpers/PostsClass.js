class Posts {
    constructor() {
        this.posts = []
    }
    async AddPostData(id, room, post_id, messages) {
        let post = { id, room, post_id, messages };
        this.posts.push(post);
        // console.log('this.posts-------------', this.posts);
        return post;
    }
    RemovePost(id) {
        let indexOfPostToRemove = this.posts.findIndex(post => post.id == id);
        // console.log('indexOFPosToRemover----------', indexOfPostToRemove);
        if(indexOfPostToRemove !== -1) {
            let room = this.posts[indexOfPostToRemove];
            console.log('rmeoove---------post---------', room);
            this.posts.splice(indexOfPostToRemove, 1);
            return room;
        }
    }
    GetPost(id) {
        let indexOfPost = this.posts.findIndex(post => post.id == id);
        if(indexOfPost !== -1) return this.posts[indexOfPost];
    }
    GetPostList(room) {
        // console.log('getPostList room----------------', room);
        let posts = this.posts.filter(post => post.room === room);
        // console.log('getPostList--------------', posts);
        let postsArray = posts.map(post => {
            return post;
        });
        let list = {
            posts: postsArray,
            count: postsArray.length
        };
        return list;
    }
    GetPostCount(room) {
        let postCount = [];
        this.posts.filter(post => {
            if(post.room == room) {
                postCount.push(post);
            }
        })
        return postCount;
    }
    PushMessage(room, message) {
        let posts = this.posts.filter(post => post.room === room);
        let postsArray = posts.map(post => {
            return post;
        });
        postsArray[0].messages.push({username: message.username, imageurl: message.imageurl, message: message.message});
        console.log('pOst array------------', postsArray[0].messages);
        return postsArray[0].messages;
    }
    ReturnMessages() {
        let posts = this.posts.filter(post => post.room === room);
        let postsArray = posts.map(post => {
            return post;
        });
        console.log('pOst array------------', postsArray);
        // return postsArray[0].messages;
    }
}

module.exports = { Posts };