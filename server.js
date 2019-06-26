const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

app.listen(3000, () => {
    console.log(`App is running 🏃🏽‍ on port ${port}`)
});

app.get('/api/v1/philosophers', (request, response) => {
    database('philosophers').select()
      .then((philosophers) => {
        response.status(200).json(philosophers);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  });

  app.get('/api/v1/philosophers/:id', (request, response) => {
    database('philosophers').where('id', request.params.id).select()
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