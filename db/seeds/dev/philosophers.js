const philosophersData = require("../../../philosophersData");

const createPhilosopher = (knex, philosopher) => {
  return knex("philosophers")
    .insert(
      {
        name: philosopher.name,
        born: philosopher.born,
        died: philosopher.died
      },
      "id"
    )
    .then(philosopherId => {
      let workPromises = [];

      philosopher.works.forEach(work => {
        workPromises.push(
          createWork(knex, {
            work: work,
            philosopher_id: philosopherId[0]
          })
        );
      });

      return Promise.all(workPromises);
    });
};

const createWork = (knex, work) => {
  return knex("works").insert(work);
};

exports.seed = (knex, Promise) => {
  return knex("works")
    .del() // delete works first
    .then(() => knex("philosophers").del()) // delete all philosophers
    .then(() => {
      let philosopherPromises = [];

      philosophersData.forEach(philosopher => {
        philosopherPromises.push(createPhilosopher(knex, philosopher));
      });

      return Promise.all(philosopherPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
