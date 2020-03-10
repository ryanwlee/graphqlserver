require("dotenv").config();

import { typeDefs } from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import { ApolloServer } from "apollo-server";

const formatError = err => {
  return err;
};
const server = new ApolloServer({ typeDefs, resolvers, formatError });

// The `listen` method launches a web server.
server.listen(process.env.SERVER_PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
