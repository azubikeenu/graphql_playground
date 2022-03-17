const Query = {
  me: () => {
    return {
      id: '1234abcd',
      name: 'Richard',
      email: 'enuazubike8@gmail.com',
    };
  },
  post: () => {
    return posts[posts.length - 1];
  },
  users: (parent, args, { db }, info) => {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter((user) =>
      user.name.toLowerCase().includes(args.query.toLowerCase())
    );
  },

  posts: (parent, args, { db }, info) => {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(args.query) ||
        post.text.toLowerCase().includes(args.query)
    );
  },
  comments: (parent, args, { db }, info) => {
    return db.comments;
  },
};

export { Query as default}
