import * as pokemonDb from "../../db/pokemon.json";
import * as trainerDb from "../../db/trainer.json";
var fs = require("fs");

const resolvers = {
  Query: {
    pokemons: async () => {
      try {
        console.log("starting pokemons query");

        const tempPokemons = {
          pokemons: JSON.parse(JSON.stringify(pokemonDb.pokemons))
        };
        const tempTrainers = {
          trainers: JSON.parse(JSON.stringify(trainerDb.trainers))
        };

        let result = [];
        tempPokemons.pokemons.map(p => {
          let t = { name: p.trainer, age: 0, from: "unknown" };
          tempTrainers.trainers.map(person => {
            if (person.name === p.trainer) {
              t = person;
            }
          });
          p.trainer = t;
          result.push(p);
        });

        return result;
      } catch (err) {
        console.log(err);
      }
    }
  },
  Mutation: {
    addPokemon: async (_, args) => {
      try {
        console.log("starting addNote mutation");

        const result = {
          pokemons: JSON.parse(JSON.stringify(pokemonDb.pokemons))
        };

        const newPokemon = {
          name: args.name,
          age: args.age,
          type: args.type,
          trainer: args.trainer
        };
        result.pokemons.push(newPokemon);

        fs.writeFileSync(
          process.cwd() + "/db/pokemon.json",
          JSON.stringify(result)
        );

        let t = { name: args.trainer, age: 0, from: "unknown" };
        trainerDb.trainers.map(person => {
          if (person.name === args.trainer) {
            t = person;
          }
        });
        newPokemon.trainer = t;

        return newPokemon;
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default resolvers;
