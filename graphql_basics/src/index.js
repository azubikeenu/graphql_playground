import { GraphQLServer } from 'graphql-yoga';

const users = [
  { id: 1, name: 'Richard', email: 'enuazubike88@gmail.com', age: 33 },
  { id: 2, name: 'Carlos', email: 'carlos@gmail.com' },
  { id: 3, name: 'Mike', email: 'mike@gmail.com' },
];

const typeDefs = `
 type Query{
  users : [User!]!
   me : User!
   post : Post!
 }

 type User{
     id : ID!
     name : String!
     email : String!
     age : Int
 }

 type Post{
     id : ID!
     title : String
     text : String
     published : Boolean
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
      return {
        id: 'abc12345',
        title: 'This is a dummy title',
        text: 'hello world how are you',
        published: false,
      };
    },
    users: (parent, args, ctx, info) => users,
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('The server is up'));
