import { v4 as uuid } from 'uuid';

const Mutation = {
  createUser: (parent, { userInput }, { db }, info) => {
    const { email } = userInput;
    const isTaken = db.users.some((user) => user.email === email);
    if (isTaken) throw new Error('Email Taken');
    const user = { id: uuid(), ...userInput };
    db.users.push(user);
    return user;
  },

  createPost(parent, { postInput }, { db }, info) {
    const { author } = postInput;
    const userExists = db.users.some((user) => user.id === author);
    if (!userExists) throw new Error('User not found');
    const post = { id: uuid(), ...postInput };
    db.posts.push(post);
    return post;
  },
  createComment(parent, { commentInput }, { db }, info) {
    const { post, author } = commentInput;
    const userExists = db.users.some((user) => user.id === author);
    const postExists = db.posts.find((p) => p.id === post && p.published);
    if (!postExists || !userExists) throw new Error('Post or user not found');
    const comment = { id: uuid(), ...commentInput };
    db.comments.push(comment);
    return comment;
  },

  deleteUser(parent, { id }, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new Error('User not found');
    const [user] = db.users.splice(userIndex, 1);
    // delete user posts
    db.posts = db.posts.filter((post) => {
      const match = post.author === id;
      if (match) {
        // delete comments
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });
    // delete comments
    db.comments = db.comments.filter((comment) => comment.author !== id);
    // return the user
    return user;
  },

  updateUser(parent, { updateData, id }, { db }, info) {
    const { email, name, age } = updateData;

    let user = db.users.find((user) => user.id === id);

    if (!user) throw new Error('User not found');

    if (typeof email === 'string') {
      const isTaken = db.users.some((user) => user.email === email);
      if (isTaken) throw new Error('Email Taken');
      user.email = email;
    }
    if (typeof name === 'string') {
      user.name = name;
    }
    if (typeof age !== 'undefined') {
      user.age = name;
    }
    return user;
  },

  updatePost(parent, { updateData, id }, { db }, info) {
    const { title, text, published } = updateData;

    let post = db.posts.find((post) => post.id === id);

    if (!post) throw new Error('Post not found');

    if (typeof title === 'string') {
      post.title = title;
    }
    if (typeof text === 'string') {
      post.text = text;
    }
    if (typeof published === 'boolean') {
      post.published = published;
    }

    return post;
  },

  updateComment(parent, { updateData, id }, { db }, info) {
    const { text } = updateData;

    let comment = db.comments.find((comment) => comment.id === id);

    if (!comment) throw new Error('Comment not found');

    if (typeof text === 'string') {
      comment.text = text;
    }

    return comment;
  },

  deletePost(parent, { id }, { db }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) throw new Error('Post not found');

    const [post] = db.posts.splice(postIndex, 1);
    //delete all comments
    db.comments = db.comments.filter((comment) => comment.post !== id);

    return post;
  },
  deleteComment(parent, { id }, { db }, info) {
    const commentIndex = db.comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) throw new Error('Comment not found');

    const [comment] = db.comments.splice(commentIndex, 1);

    return comment;
  },
};

export { Mutation as default };
