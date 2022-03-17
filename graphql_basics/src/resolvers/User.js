const  User = {
  // relationship between posts and the user field in the user type def
  posts(parent, args, { db }, info) {
    return db.posts.filter((post) => post.author === parent.id);
  },
  // relationship between comments and the user field in the user type def
  comments(parent, args, { db }, info) {
    return db.comments.filter((comment) => comment.author === parent.id);
  },
};

export { User as default}
