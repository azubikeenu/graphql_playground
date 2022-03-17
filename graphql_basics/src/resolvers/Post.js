const Post = {
  // relationship between author and the post field in the post type def
  author(parent, args, { db }, info) {
    return db.users.find((user) => user.id === parent.author);
  },
  // relationship between comments and the post field in the post type def
  comments(parent, args, { db }, info) {
    return comments.filter((comment) => {
      return comment.post === parent.id;
    });
  },
};

export { Post as default}
