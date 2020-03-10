const express = require("express");
const router = express.Router();
import * as pokemonDb from "../../db/pokemon.json";
import * as trainerDb from "../../db/trainer.json";

// get a list of tasks from the db
router.get("/pokemons", function(req, res, next) {
  console.log("get request");

  let result = [];
  pokemonDb.pokemons.map(p => {
    let t = { name: p.trainer, age: 0, from: "unknown" };
    trainerDb.trainers.map(person => {
      if (person.name === p.trainer) {
        t = person;
      }
    });
    p.trainer = t;
    result.push(p);
  });

  res.send(JSON.stringify(result));
});

module.exports = router;
