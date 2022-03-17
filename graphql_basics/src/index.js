import { GraphQLServer } from 'graphql-yoga';

const users = [
  { id: '1', name: 'Richard', email: 'enuazubike88@gmail.com', age: 33 },
  { id: '2', name: 'Carlos', email: 'carlos@gmail.com' },
  { id: '3', name: 'Mike', email: 'mike@gmail.com' },
];

const posts = [
  {
    id: '1',
    title: 'Post one',
    text: 'This is the text of post one',
    published: true,
    author: '1',
  },
  {
    id: '2',
    title: 'Post two',
    text: 'This is the text of post two',
    published: false,
    author: '1',
  },
  {
    id: '3',
    title: 'Post three',
    text: 'This is the text of post three',
    published: true,
    author: '2',
  },
];

const comments = [
  { id: '1', text: `you couldn't have said it better`, post: '1', author: '1' },
  { id: '2', text: `hahaha thats really funny bro`, post: '1', author: '3' },
  { id: '3', text: `here we go again`, post: '2', author: '2' },
  { id: '4', text: `Thats all folks`, post: '2', author: '1' },
];

const typeDefs = `
 type Query{
  users(query : String) : [User!]!
   me : User!
   post : Post!
   posts(query : String) : [Post!]!
   comments : [Comment!]!
 }

 type User{
     id : ID!
     name : String!
     email : String!
     age : Int
     posts : [Post!]!
     comments:[Comment!]!
 }

 type Post{
     id : ID!
     title : String
     text : String
     published : Boolean
     author : User!
     comments:[Comment!]!

 }
 type Comment{
     id : ID!
     text : String!
     post : Post!
     author : User!
 }


`;
const resolvers = {
  Query: {
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
    users: (parent, args, ctx, info) => {
      if (!args.query) {
        return users;
      }
      return users.filter((user) =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },

    posts: (parent, args, ctx, info) => {
      if (!args.query) {
        return posts;
      }
      return posts.filter(
        (post) =>
          post.title.toLowerCase().includes(args.query) ||
          post.text.toLowerCase().includes(args.query)
      );
    },
    comments:(parent ,args , ctx , info) =>{
       return comments;
    }
  },
  /*Establish relationships between fields */
  Post: {
    // relationship between author and the post field in the post type def
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    // relationship between comments and the post field in the post type def
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    // relationship between posts and the user field in the user type def
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    // relationship between comments and the user field in the user type def
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },

  Comment: {
    // relationship between comment and the author field in the comment type def
     author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    // relationship between comment and the post field in the comment type def
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('The server is up'));
