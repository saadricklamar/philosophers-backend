const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.set("port", process.env.PORT || 3000);
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}.`);
});

app.get("/api/v1/philosophers", (request, response) => {
  database("philosophers")
    .select()
    .then(philosophers => {
      response.status(200).json(philosophers);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/philosophers/:id", (request, response) => {
  database("philosophers")
    .where("id", request.params.id)
    .select()
    .then(philosophers => {
      if (philosophers.length) {
        response.status(200).json(philosophers);
      } else {
        response.status(404).json({
          error: `Could not find philosopher with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/works", (request, response) => {
  database("works")
    .select()
    .then(works => {
      response.status(200).json(works);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/works/:id", (request, response) => {
  database("works")
    .where("id", request.params.id)
    .select()
    .then(works => {
      if (works.length) {
        response.status(200).json(works);
      } else {
        response.status(404).json({
          error: `Could not find work with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/philosophers", (request, response) => {
  const philosopher = request.body;

  for (let requiredParameter of ["name", "born", "died"]) {
    if (!philosopher[requiredParameter]) {
      return response
        .status(422)
        .send({
          error: `Expected format: { name: <String>, born: <Integer>, died: <Integer> }. You're missing a "${requiredParameter}" property.`
        });
    }
  }

  database("philosophers")
    .insert(philosopher, "id")
    .then(philosopher => {
      response.status(201).json({ id: philosopher[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/works", (request, response) => {
  const work = request.body;

  for (let requiredParameter of ["work", "philosopher_id"]) {
    if (!work[requiredParameter]) {
      return response
        .status(422)
        .send({
          error: `Expected format: { work: <String>, philosopher_id: <Integer> }. You're missing a "${requiredParameter}" property.`
        });
    }
  }

  database("works")
    .insert(work, "id")
    .then(work => {
      response.status(201).json({ id: work[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete("/api/v1/works/:id", (request, response) => {
  const id = parseInt(request.params.id);
  database("works")
    .where("id", id)
    .delete()
    .then(work => {
      if (!work) {
        response.status(404).send("This work does not exist");
      } else {
        response.status(200).send("The work was deleted");
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});
