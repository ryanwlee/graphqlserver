import { gql } from "apollo-server";

export const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Pokemon {
    name: String!
    age: Int!
    type: String!
    trainer: Trainer
  }

  type Trainer {
    name: String
    age: Int
    from: String
  }

  type Query {
    pokemons: [Pokemon]
  }

  type Mutation {
    addPokemon(
      name: String!
      age: Int!
      type: String!
      trainer: String
    ): Pokemon!
  }
`;
