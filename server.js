const environment = process.env.NODE_ENV || 'development'; //importing something
const configuration = require('./knexfile')[environment]; //importing knexfile.js
const database = require('knex')(configuration); //importing knex
const express = require('express'); //importing express
const app = express(); //initializing express
const port = 3000; // creating the port on which our server will run

app.set('port', process.env.PORT || 3000)
app.use(express.json()) //telling express to use json

app.listen(3000, () => {
    console.log(`App is running 🏃🏽‍ on port ${port}`) // telling app to listen to port 3000, which will run the server
});

app.get('/api/v1/philosophers', (request, response) => { //creating a function that will get all the philosophers
    database('philosophers').select() //going into the philosophers database and selecting all the philosophers
      .then((philosophers) => { //then if everything goes smooth, sending a success response of 200 with all the philosopehrs in json format
        response.status(200).json(philosophers);
      })
      .catch((error) => { // if there's an internal server error, then that critical server error is communicated
        response.status(500).json({ error });
      });
  });

  app.get('/api/v1/philosophers/:id', (request, response) => { // creating a function that will grab a philosopher by specified id
    database('philosophers').where('id', request.params.id).select() //going into the philospphers database and selecting the philosopher with a specified id
      .then(philosophers => { //if the philosopher is found, then a success response is sent with that philosopher in json format
        if (philosophers.length) {
          response.status(200).json(philosophers);
        } else { // if that philosopher is not found, then a not found error is sent with an explicit message.
          response.status(404).json({ 
            error: `Could not find philosopher with id ${request.params.id}`
          });
        }
      })
      .catch(error => { // if there's an internal server error, then that critical server error is communicated
        response.status(500).json({ error });
      });
  });

  app.get('/api/v1/works', (request, response) => { //creating a function that will get all the works written
    database('works').select() //going into the works database and selecting all the works
      .then((works) => { //then if everything goes smooth, sending a success response of 200 with all the works in json format
        response.status(200).json(works);
      })
      .catch((error) => { // if there's an internal server error, then that critical server error is communicated
        response.status(500).json({ error });
      });
  });

  app.get('/api/v1/works/:id', (request, response) => { // creating a function that will grab a work by specified id
    database('works').where('id', request.params.id).select() //going into the works database and selecting the work with a specified id
      .then(works => {  //if the work is found, then a success response is sent with that work in json format
        if (works.length) {
          response.status(200).json(works);
        } else {
          response.status(404).json({ // if that work is not found, then a not found error is sent with an explicit message.
            error: `Could not find work with id ${request.params.id}`
          });
        }
      })
      .catch(error => { // if there's an internal server error, then that critical server error is communicated
        response.status(500).json({ error });
      });
  });

  app.post('/api/v1/philosophers', (request, response) => { // this function allows us to add a philosopher
    const philosopher = request.body; // we are assigning the request body to the variable philosopher
  
    for (let requiredParameter of ['name', 'born', 'died']) { // We are making name, born, died required parameters of our json object
      if (!philosopher[requiredParameter]) { // if those required parameters are not met, then we 
        return response // send a response status of 422, unprocessable entity
          .status(422) // indicating to the user that they are missing one of the required parameters - name, born, died.
          .send({ error: `Expected format: { name: <String>, born: <Integer>, died: <Integer> }. You're missing a "${requiredParameter}" property.` });
      }
    }
  
    database('philosophers').insert(philosopher, 'id') //here we are accessing the philosopher database 
      .then(philosopher => {  // if adding the new philosopher is a success, then we send a success response
        response.status(201).json({ id: philosopher[0] })
      })
      .catch(error => { // if there's an internal server error, then that critical server error is communicated
        response.status(500).json({ error });
      });
  });

  app.post('/api/v1/works', (request, response) => { // this function allows us to add a work
    const work = request.body; // we are assigning the request body to the variable work
  
    for (let requiredParameter of ['work', 'philosopher_id']) { // We are making work and philosopher_id required parameters of our json object
      if (!work[requiredParameter]) { // if those required parameters are not met, then we 
        return response // send a response status of 422, unprocessable entity
          .status(422) // indicating to the user that they are missing one of the required parameters - work, philosopher_id
          .send({ error: `Expected format: { work: <String>, philosopher_id: <Integer> }. You're missing a "${requiredParameter}" property.` });
      }
    }
  
    database('works').insert(work, 'id') //here we are accessing the works database 
      .then(work => { // if adding the new work is a success, then we send a success response
        response.status(201).json({ id: work[0] })
      })
      .catch(error => { // if there's an internal server error, then that critical server error is communicated
        response.status(500).json({ error });
      });
  });

  app.delete('/api/v1/works/:id', (request, response) => { //this function deletes a work with a specified id
    const id = parseInt(request.params.id);  // we assign req.params.id to the variable id
    database('works').where('id', id).delete() // here we go into the works database and find the matching work id
    .then(work => {
      if(!work) { //if the work is not found, we send a message that the work was not found
        response.status(404).send('This work does not exist')
      } else { // if the work is found, we send a message that the work
        response.status(200).send('The work was deleted')
      }
    })
    .catch(error => { // if there's an internal server error, then that critical server error is communicated
      response.status(500).json({ error })
    })
  });