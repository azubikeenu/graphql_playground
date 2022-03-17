const  Comment = {
    // relationship between comment and the author field in the comment type def
    author(parent, args, { db }, info) {
      return db.users.find((user) => user.id === parent.author);
    },
    // relationship between comment and the post field in the comment type def
    post(parent, args, { db }, info) {
      return db.posts.find((post) => post.id === parent.post);
    },
  };


  export {Comment as default}