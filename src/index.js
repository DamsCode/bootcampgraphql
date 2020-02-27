import {GraphQLServer} from "graphql-yoga";

// Demo users data

const users = [{
    id: '1',
    name: 'dams',
    email: 'email@dams.com',
    age:25
},{
    id: '2',
    name: 'catch',
    email: 'email@catch.com',
    age:25
},{
    id: '3',
    name: 'jony',
    email: 'email@jony.com',
    age:25
},]


// Type definition (schema)
const typeDefs = `
type Query {
    users(query: String ): [User!]!
    me: User!
    post: Post!
    }
    
type User{
    id: ID!
    name: String!
    email: String!
    age: Int
    }
    
type Post{
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    }
`;

// resolvers
const resolvers = {
    Query: {
        users(parent,args,ctx){
            if (!args.query){
                return users;
            }

            return users.filter(e =>{
                return e.name.toLowerCase().includes(args.query.toLowerCase());
            });
        },
        me(){
            return{
                id: '122adazdaz',
                name: 'damien',
                email: 'd.me@gmail.com',
                age: 23
            };
        },
        post(){
            return{
              id: '224ddazdad',
              title: 'Mon titre',
              body: 'Mon contenu',
              published: false
            };
        },
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('the server is up');
});