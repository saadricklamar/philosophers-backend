# Philosophers BackEnd

## About the API

**Philosophers Backend** is the first RESTful API I built within a week. It provides data about Philosophers and the works they have written. Users can receive data through GET requests, add data to the API through POST requests, and delete data with DELETE requests.

## Tech Stack

* [Node.js](https://nodejs.org/en/) 
* [Express](https://expressjs.com/) 
* [Knex](http://knexjs.org/) 
* [PostgreSQL](https://www.postgresql.org/)
* [Heroku](https://signup.heroku.com/t/platform?c=70130000001xDpdAAE&gclid=CjwKCAiAqqTuBRBAEiwA7B66hRf-FLqt6P23ay-rUjafxgOBbD_1eeJpbfve4upMMI3TfluAnE5Z8hoCZNwQAvD_BwE)

## Live App on Heroku

* Philosophers Data: https://philosophers-backend.herokuapp.com/api/v1/philosophers
* Works Data: https://philosophers-backend.herokuapp.com/api/v1/works

## /api/philosophers

### **`GET`**

Making an API call to this endpoint returns all philosophers

Data returned for each philosopher includes:

* philosopher id
* philosopher name
* year philosopher was born
* year philosopher died
* creation timestamp
* update timestamp

#### Example of returned JSON:

```
[
  {
    "name": "Nietzsche",
    "born": "1844",
    "died": "1900",
    "created_at": "2019-06-26 09:46:20.466948-06 ",
    "updated_at": "2019-06-26 09:46:20.466948-06"
  },
  {
    "name": "Plato",
    "born": "428",
    "died": "348",
    "created_at": "2019-06-26 09:46:20.467223-06",
    "updated_at": "2019-06-26 09:46:20.467223-06"
  },
  
  {
    "name": "Rousseau",
    "born": "1712",
    "died": "1778",
    "created_at": "2019-06-26 09:46:20.467495-06",
    "updated_at": "2019-06-26 09:46:20.467495-06"
  }
 ]
  ```
  
## /api/philosophers/:id

### **`GET`**

Making an API call to this endpoint returns a philosopher of the specific id. 

Data returned for each philosopher includes:

* philosopher id
* philosopher name
* year philosopher was born
* year philosopher died
* creation timestamp
* update timestamp

#### Required:
An id that corresponds to a philosopher present in the database must be provided in the URL to return the desired JSON.

URL with specified id:

`localhost:3000/api/v1/philosophers/23`

#### Example of returned JSON:

```
 {
     "id": 23,
     "name": "Ponty",
     "born": 1908,
     "died": 1961,
     "created_at": "2019-06-26T15:46:20.469Z",
     "updated_at": "2019-06-26T15:46:20.469Z"
 }
```

## /api/works

### **`GET`**

Making an API call to this endpoint returns all works written by philosophers.

Data returned for each work includes:

* work id
* name of work
* philosopher_id (connecting that work to the philosopher who wrote it)
* creation timestamp
* update timestamp

#### Example of returned JSON:

```
[
    {
      "id": 10,
      "work": "Tao Te Ching",
      "philosopher_id": 10,
      "created_at": "2019-06-26T15:46:20.485Z",
      "updated_at": "2019-06-26T15:46:20.485Z"
    },
    {
      id": 9,
      "work": "The History of England",
      "philosopher_id": 8,
      "created_at": "2019-06-26T15:46:20.485Z",
      "updated_at": "2019-06-26T15:46:20.485Z"
    },
    {
      "id": 11,
      "work": "The Communist Manifesto",
      "philosopher_id": 13,
      "created_at": "2019-06-26T15:46:20.498Z",
      "updated_at": "2019-06-26T15:46:20.498Z"
    }
 ]
  ```
## /api/works/:id

### **`GET`**

Making an API call to this endpoint returns a work of the specific id. 

Data returned for each work includes:

* work id
* name of work
* philosopher_id (connecting that work to the philosopher who wrote it)
* creation timestamp
* update timestamp

#### Required:
An id that corresponds to a work present in the database must be provided in the URL to return the desired JSON.

URL with specified id:

`localhost:3000/api/v1/works/45`

#### Example of returned JSON:

```
 {
     "id": 45,
     "work": "Truth and Method",
     "philosopher_id": 26,
     "created_at": "2019-06-26T15:46:20.518Z",
     "updated_at": "2019-06-26T15:46:20.518Z"
    }
```

## /api/philosophers

### **`POST`**

Making an API call to this endpoint adds a philosopher to the database. 

#### Required:
A correctly formatted philosopher object must be provided in the request body in order to post to the database.

#### Example of correctly formatted philosopher object:
```
{ name: <STRING>, born: <Integer>, died: <Integer>  }
```

```
{
   "name": "John",
   "born": 1982,
   "died": 2002
}
```

## /api/works/:id

### **`DELETE`**

Making an API call to this endpoint deletes a work with the specified id. 

#### Required:
An id that corresponds to a work present in the database must be provided in the URL.

URL with specified id:

`localhost:3000/api/v1/philosophers/23`

## Contributors

Saad Baradan (https://github.com/saadricklamar)
