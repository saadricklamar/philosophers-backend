# Philosophers BackEnd

## About the API

'Philosophers Backend' is an API that provides data about breweries in Denver and the beers that they carry. Users can add data to the API through POST requests, delete data with DELETE requests, and edit data with PUT requests

## /api/philosophers

### **`GET`**

Making an API call to this endpoint returns all philosophers

Data returned for each philosopher includes:

* philosopher id
* philosopher name
* year philosopher was born
* year philosopher died
* an array of the works they wrote
* creation timestamp
* update timestamp

#### Example of returned JSON:

```
[
  {
    "name": "Nietzsche",
    "born": "1844",
    "died": "1900",
    "works": ['The Birth of Tragedy', 'The Gay Science'],
    "created_at": "2019-06-26 09:46:20.466948-06 ",
    "updated_at": "2019-06-26 09:46:20.466948-06"
  },
  {
    "name": "Plato",
    "born": "428",
    "died": "348",
    "works": ['The Republic', 'The Laws'],
    "created_at": "2019-06-26 09:46:20.467223-06",
    "updated_at": "2019-06-26 09:46:20.467223-06"
  },
  
  {
    "name": "Rousseau",
    "born": "1712",
    "died": "1778",
    "works": ['The Social Contract', 'A Discourse on Inequality'],
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
* an array of the works they wrote
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

## /api/philosophers

### **`POST`**

Making an API call to this endpoint adds a philosopher to the database. 

#### Required:
A correctly formatted philosopher object must be provided in the request body in order to post to the database.

#### Example of correctly formatted brewery object:
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
